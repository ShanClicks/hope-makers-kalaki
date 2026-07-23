import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteFaqItem } from "./actions";

export default async function AdminFaqPage() {
  const items = await db.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="FAQ"
      newHref="/admin/faq/new"
      editBasePath="/admin/faq"
      onDelete={deleteFaqItem}
      columnLabels={["Question", "Category"]}
      rows={items.map((item) => ({
        id: item.id,
        cells: [item.question, item.category],
      }))}
    />
  );
}
