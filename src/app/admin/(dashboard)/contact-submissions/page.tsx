import { db } from "@/lib/db";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteContactSubmission } from "./actions";

export default async function AdminContactSubmissionsPage() {
  const submissions = await db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact Submissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Messages submitted through the Contact page.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          No submissions yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-foreground">{submission.subject}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {submission.name} · {submission.email}
                    {submission.phone ? ` · ${submission.phone}` : ""}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {submission.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </p>
                </div>
                <DeleteButton id={submission.id} onDelete={deleteContactSubmission} />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{submission.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
