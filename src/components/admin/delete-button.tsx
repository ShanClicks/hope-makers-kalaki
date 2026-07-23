"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  id,
  onDelete,
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  id: string;
  onDelete: (id: string) => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label="Delete"
      disabled={isPending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        startTransition(() => {
          onDelete(id);
        });
      }}
      className="flex size-8 items-center justify-center rounded-md text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
    >
      <Trash2 className="size-4" />
    </button>
  );
}
