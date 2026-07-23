import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteFocusArea } from "./actions";

export default async function AdminProgramsPage() {
  const focusAreas = await db.focusArea.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="Programs"
      newHref="/admin/programs/new"
      editBasePath="/admin/programs"
      onDelete={deleteFocusArea}
      columnLabels={["Title", "Slug", "Teaser"]}
      rows={focusAreas.map((area) => ({
        id: area.id,
        cells: [area.title, area.slug, area.teaser],
      }))}
    />
  );
}
