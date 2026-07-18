"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

type FormErrors = Partial<Record<keyof ContactFormSchema, string>>;

const INITIAL_VALUES: ContactFormSchema = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormSchema>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof ContactFormSchema, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormSchema;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Request failed");

      toast.success("Message sent — we'll get back to you soon.");
      setValues(INITIAL_VALUES);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

      <Field label="Subject" error={errors.subject}>
        <input
          type="text"
          value={values.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          className={inputClass(!!errors.subject)}
        />
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={inputClass(!!errors.message)}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-royal-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
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
