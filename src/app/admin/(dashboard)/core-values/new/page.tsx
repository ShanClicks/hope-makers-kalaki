import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createCoreValue } from "../actions";

const fields: AdminFormField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon name (lucide-react)", type: "text", placeholder: "e.g. Users" },
];

export default function NewCoreValuePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Core Value</h1>
      <AdminForm fields={fields} action={createCoreValue} cancelHref="/admin/core-values" submitLabel="Create" />
    </div>
  );
}
