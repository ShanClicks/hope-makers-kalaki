import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateImpactStat } from "../../actions";

const fields: AdminFormField[] = [
  { name: "label", label: "Label", type: "text", required: true },
  { name: "value", label: "Value", type: "number", required: true },
  { name: "suffix", label: "Suffix", type: "text" },
  { name: "icon", label: "Icon name (lucide-react)", type: "text" },
];

export default async function EditImpactStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stat = await db.impactStat.findUnique({ where: { id } });

  if (!stat) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Impact Stat</h1>
      <p className="text-sm text-muted-foreground">ID: {stat.id} (fixed)</p>
      <AdminForm
        fields={fields}
        initialValues={{
          label: stat.label,
          value: String(stat.value),
          suffix: stat.suffix ?? "",
          icon: stat.icon,
        }}
        action={updateImpactStat.bind(null, id)}
        cancelHref="/admin/impact-stats"
        submitLabel="Save changes"
      />
    </div>
  );
}
