import { db } from "@/lib/db";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteDonation } from "./actions";

export default async function AdminDonationsPage() {
  const donations = await db.donation.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mobile money and bank transfer donations, most recent first.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-semibold text-foreground">Date</th>
              <th className="px-4 py-3 font-semibold text-foreground">Donor</th>
              <th className="px-4 py-3 font-semibold text-foreground">Method</th>
              <th className="px-4 py-3 font-semibold text-foreground">Amount</th>
              <th className="px-4 py-3 font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No donations yet.
                </td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-foreground/90">
                    {donation.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{donation.name}</p>
                    <p className="text-xs text-muted-foreground">{donation.email}</p>
                    {donation.phone ? <p className="text-xs text-muted-foreground">{donation.phone}</p> : null}
                  </td>
                  <td className="px-4 py-3 text-foreground/90">{donation.method}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {donation.currency} {donation.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={donation.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <DeleteButton id={donation.id} onDelete={deleteDonation} />
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
