import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createNewsItem } from "../actions";

const fields: AdminFormField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "summary", label: "Summary (one line)", type: "textarea", required: true },
  { name: "content", label: "Full content", type: "textarea", required: true },
  { name: "image", label: "Image path", type: "text", placeholder: "/images/news/example.jpg" },
  { name: "date", label: "Publish date", type: "date", required: true },
  { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Education" },
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

export default function NewNewsItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New News/Event Item</h1>
      <AdminForm fields={fields} action={createNewsItem} cancelHref="/admin/news" submitLabel="Create" />
    </div>
  );
}
