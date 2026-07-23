import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createFocusArea } from "../actions";

const fields: AdminFormField[] = [
  {
    name: "id",
    label: "ID",
    type: "text",
    required: true,
    helpText: "Fixed identifier used elsewhere in the site (e.g. \"education\"). Can't be changed later.",
  },
  { name: "slug", label: "URL slug", type: "text", required: true, placeholder: "e.g. education" },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "teaser", label: "Teaser (short card text)", type: "textarea", required: true },
  { name: "description", label: "Full description", type: "textarea", required: true },
  { name: "icon", label: "Icon name (lucide-react)", type: "text", placeholder: "e.g. BookOpen" },
  { name: "gradient", label: "Gradient classes", type: "text", placeholder: "from-[#0057B8] to-[#3B82F6]" },
];

export default function NewProgramPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Program</h1>
      <AdminForm fields={fields} action={createFocusArea} cancelHref="/admin/programs" submitLabel="Create" />
    </div>
  );
}
