import { AlertTriangle } from "lucide-react";

export function DraftNotice() {
  return (
    <div className="mb-10 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-foreground">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
      <p>
        <strong>This page is a draft template</strong>, not a finalized legal document. It has not
        been reviewed by legal counsel and should not be relied upon as-is. Replace this content
        with your organization&apos;s actual, reviewed policy before publishing the site.
      </p>
    </div>
  );
}
