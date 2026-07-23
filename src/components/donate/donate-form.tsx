"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { donateFormSchema, mobileMoneyDonationSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

const AMOUNT_TIERS = [50000, 100000, 250000, 500000];
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 30; // ~90 seconds

type PaymentMethod = "mobile-money" | "bank-transfer";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  amount: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  amount: "",
  message: "",
};

interface StatusResponse {
  status: string;
  error?: string;
}

export function DonateForm() {
  const [method, setMethod] = useState<PaymentMethod>("mobile-money");
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionUuid, setTransactionUuid] = useState<string | null>(null);
  const [pollAttempts, setPollAttempts] = useState(0);

  const { data: statusData } = useQuery<StatusResponse>({
    queryKey: ["mobile-money-status", transactionUuid],
    queryFn: () =>
      fetch(`/api/donate/mobile-money/status/${transactionUuid}`).then((res) => res.json()),
    enabled: !!transactionUuid,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "completed" || status === "failed") return false;
      return POLL_INTERVAL_MS;
    },
  });

  useEffect(() => {
    if (!transactionUuid) return;

    if (statusData?.status === "completed") {
      toast.success("Payment received — thank you for your support!");
      setTransactionUuid(null);
      setPollAttempts(0);
      setValues(INITIAL_VALUES);
      setSelectedTier(null);
      return;
    }

    if (statusData?.status === "failed") {
      toast.error("The mobile money payment was not completed. Please try again.");
      setTransactionUuid(null);
      setPollAttempts(0);
      return;
    }

    if (statusData) {
      setPollAttempts((prev) => prev + 1);
    }
  }, [statusData, transactionUuid]);

  useEffect(() => {
    if (transactionUuid && pollAttempts >= MAX_POLL_ATTEMPTS) {
      toast.message("Still waiting on the payment confirmation.", {
        description: "If you approved the prompt, we'll follow up by email once it clears.",
      });
      setTransactionUuid(null);
      setPollAttempts(0);
    }
  }, [pollAttempts, transactionUuid]);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function selectTier(amount: number) {
    setSelectedTier(amount);
    handleChange("amount", String(amount));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const schema = method === "mobile-money" ? mobileMoneyDonationSchema : donateFormSchema;
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const endpoint = method === "mobile-money" ? "/api/donate/mobile-money" : "/api/donate";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Request failed");
      }

      if (method === "mobile-money") {
        toast.message("Check your phone", {
          description: "Approve the mobile money prompt to complete your donation.",
        });
        setPollAttempts(0);
        setTransactionUuid(data.uuid);
      } else {
        toast.success("Thank you! We've received your pledge and will follow up with payment details.");
        setValues(INITIAL_VALUES);
        setSelectedTier(null);
      }
    } catch (error) {
      toast.error(
        error instanceof Error && method === "mobile-money"
          ? error.message
          : "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isWaitingForPayment = !!transactionUuid;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex gap-2 rounded-lg border border-border bg-secondary/40 p-1.5">
        <button
          type="button"
          onClick={() => setMethod("mobile-money")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors",
            method === "mobile-money"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-background/60"
          )}
        >
          Mobile Money
        </button>
        <button
          type="button"
          onClick={() => setMethod("bank-transfer")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors",
            method === "bank-transfer"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-background/60"
          )}
        >
          Bank Transfer
        </button>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
        {method === "mobile-money"
          ? "Enter your MTN or Airtel mobile money number below. Submitting this form sends a payment prompt directly to your phone — approve it there to complete your donation."
          : "We don't yet have online card payment set up. Submitting this form sends your pledge directly to our team, and we'll follow up by email with secure bank transfer instructions."}
      </div>

      {isWaitingForPayment ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-8 text-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="font-semibold text-foreground">Waiting for your approval…</p>
          <p className="text-sm text-muted-foreground">
            Check your phone for the mobile money prompt and enter your PIN to approve it.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <Field label="Choose an amount (UGX)" error={errors.amount}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AMOUNT_TIERS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => selectTier(tier)}
                  className={cn(
                    "rounded-md border px-3 py-2.5 text-sm font-semibold transition-colors",
                    selectedTier === tier
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {tier.toLocaleString()}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              placeholder="Or enter a custom amount"
              value={values.amount}
              onChange={(e) => {
                setSelectedTier(null);
                handleChange("amount", e.target.value);
              }}
              className={inputClass(!!errors.amount)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" error={errors.name}>
              <input
                type="text"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={inputClass(!!errors.name)}
              />
            </Field>
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClass(!!errors.email)}
              />
            </Field>
          </div>

          <Field
            label={method === "mobile-money" ? "Mobile Money Number" : "Phone Number (optional)"}
            error={errors.phone}
          >
            <input
              type="tel"
              placeholder={method === "mobile-money" ? "e.g. 0778 837 518" : undefined}
              value={values.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass(!!errors.phone)}
            />
          </Field>

          <Field label="Message (optional)" error={errors.message}>
            <textarea
              rows={4}
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={inputClass(!!errors.message)}
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Sending..."
              : method === "mobile-money"
                ? "Pay with Mobile Money"
                : "Submit Pledge"}
          </button>
        </form>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
    hasError ? "border-destructive" : "border-input"
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
