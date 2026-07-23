"use client";

import Link from "next/link";
import { useTransition, type ReactNode } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

export interface AdminTableRow {
  id: string;
  cells: ReactNode[];
}

export function AdminTable({
  title,
  columnLabels,
  rows,
  newHref,
  editBasePath,
  onDelete,
}: {
  title: string;
  columnLabels: string[];
  rows: AdminTableRow[];
  newHref: string;
  editBasePath: string;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    startTransition(() => {
      onDelete(id);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <Link
          href={newHref}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-royal-dark"
        >
          <Plus className="size-4" />
          New
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              {columnLabels.map((label) => (
                <th key={label} className="px-4 py-3 font-semibold text-foreground">
                  {label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columnLabels.length + 1} className="px-4 py-8 text-center text-muted-foreground">
                  Nothing here yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  {row.cells.map((cell, i) => (
                    <td key={i} className="max-w-xs truncate px-4 py-3 text-foreground/90">
                      {cell}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`${editBasePath}/${row.id}/edit`}
                        aria-label="Edit"
                        className="flex size-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-secondary"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label="Delete"
                        disabled={isPending}
                        onClick={() => handleDelete(row.id)}
                        className="flex size-8 items-center justify-center rounded-md text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
