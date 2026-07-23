import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteCoreValue } from "./actions";

export default async function AdminCoreValuesPage() {
  const values = await db.coreValue.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="Core Values"
      newHref="/admin/core-values/new"
      editBasePath="/admin/core-values"
      onDelete={deleteCoreValue}
      columnLabels={["Title", "Description"]}
      rows={values.map((value) => ({
        id: value.id,
        cells: [value.title, value.description],
      }))}
    />
  );
}
