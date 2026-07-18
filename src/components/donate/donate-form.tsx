"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { donateFormSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

const AMOUNT_TIERS = [50000, 100000, 250000, 500000];

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

export function DonateForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function selectTier(amount: number) {
    setSelectedTier(amount);
    handleChange("amount", String(amount));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = donateFormSchema.safeParse(values);
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
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Request failed");

      toast.success("Thank you! We've received your pledge and will follow up with payment details.");
      setValues(INITIAL_VALUES);
      setSelectedTier(null);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
        We don&apos;t yet have online card payment set up. Submitting this form sends your pledge
        directly to our team, and we&apos;ll follow up by email with secure payment instructions
        (bank transfer or mobile money).
      </div>

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

        <Field label="Phone Number (optional)" error={errors.phone}>
          <input
            type="tel"
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
          {isSubmitting ? "Sending..." : "Submit Pledge"}
        </button>
      </form>
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
