import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateNewsItem } from "../../actions";

const fields: AdminFormField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "summary", label: "Summary (one line)", type: "textarea", required: true },
  { name: "content", label: "Full content", type: "textarea", required: true },
  { name: "image", label: "Image path", type: "text" },
  { name: "date", label: "Publish date", type: "date", required: true },
  { name: "category", label: "Category", type: "text", required: true },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "news", label: "News" },
      { value: "event", label: "Event" },
    ],
  },
  { name: "eventDate", label: "Event date (if type = Event)", type: "date" },
  { name: "location", label: "Location (if type = Event)", type: "text" },
];

export default async function EditNewsItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.newsItem.findUnique({ where: { id } });

  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit News/Event Item</h1>
      <AdminForm
        fields={fields}
        initialValues={{
          title: item.title,
          summary: item.summary,
          content: item.content,
          image: item.image,
          date: item.date.toISOString().slice(0, 10),
          category: item.category,
          type: item.type,
          eventDate: item.eventDate ? item.eventDate.toISOString().slice(0, 10) : "",
          location: item.location ?? "",
        }}
        action={updateNewsItem.bind(null, id)}
        cancelHref="/admin/news"
        submitLabel="Save changes"
      />
    </div>
  );
}
