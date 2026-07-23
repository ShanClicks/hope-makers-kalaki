import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteNewsItem } from "./actions";

export default async function AdminNewsPage() {
  const items = await db.newsItem.findMany({ orderBy: { date: "desc" } });

  return (
    <AdminTable
      title="News & Events"
      newHref="/admin/news/new"
      editBasePath="/admin/news"
      onDelete={deleteNewsItem}
      columnLabels={["Title", "Type", "Category", "Date"]}
      rows={items.map((item) => ({
        id: item.id,
        cells: [item.title, item.type, item.category, item.date.toISOString().slice(0, 10)],
      }))}
    />
  );
}
