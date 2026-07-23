"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

export interface AdminFormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "date";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  helpText?: string;
}

export function AdminForm({
  fields,
  initialValues,
  action,
  cancelHref,
  submitLabel = "Save",
}: {
  fields: AdminFormField[];
  initialValues?: Record<string, string>;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  cancelHref: string;
  submitLabel?: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      {fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            {field.label}
            {field.required ? <span className="text-destructive"> *</span> : null}
          </span>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              rows={4}
              required={field.required}
              placeholder={field.placeholder}
              defaultValue={initialValues?.[field.name] ?? ""}
              className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              defaultValue={initialValues?.[field.name] ?? ""}
              className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="" disabled>
                Select…
              </option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              defaultValue={initialValues?.[field.name] ?? ""}
              className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          )}
          {field.helpText ? <span className="text-xs text-muted-foreground">{field.helpText}</span> : null}
        </label>
      ))}

      <div className="mt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-royal-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
        <Link
          href={cancelHref}
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
