import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteImpactStat } from "./actions";

export default async function AdminImpactStatsPage() {
  const stats = await db.impactStat.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="Impact Stats"
      newHref="/admin/impact-stats/new"
      editBasePath="/admin/impact-stats"
      onDelete={deleteImpactStat}
      columnLabels={["Label", "Value"]}
      rows={stats.map((stat) => ({
        id: stat.id,
        cells: [stat.label, `${stat.value.toLocaleString()}${stat.suffix ?? ""}`],
      }))}
    />
  );
}
