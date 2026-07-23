import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createImpactStat } from "../actions";

const fields: AdminFormField[] = [
  {
    name: "id",
    label: "ID",
    type: "text",
    required: true,
    helpText: "Fixed identifier (e.g. \"children\"). Can't be changed later.",
  },
  { name: "label", label: "Label", type: "text", required: true, placeholder: "e.g. Children Supported" },
  { name: "value", label: "Value", type: "number", required: true },
  { name: "suffix", label: "Suffix", type: "text", placeholder: "e.g. +" },
  { name: "icon", label: "Icon name (lucide-react)", type: "text", placeholder: "e.g. BookOpen" },
];

export default function NewImpactStatPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Impact Stat</h1>
      <AdminForm fields={fields} action={createImpactStat} cancelHref="/admin/impact-stats" submitLabel="Create" />
    </div>
  );
}
