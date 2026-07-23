import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateFocusArea } from "../../actions";

const fields: AdminFormField[] = [
  { name: "slug", label: "URL slug", type: "text", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "teaser", label: "Teaser (short card text)", type: "textarea", required: true },
  { name: "description", label: "Full description", type: "textarea", required: true },
  { name: "icon", label: "Icon name (lucide-react)", type: "text" },
  { name: "gradient", label: "Gradient classes", type: "text" },
];

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const area = await db.focusArea.findUnique({ where: { id } });

  if (!area) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Program</h1>
      <p className="text-sm text-muted-foreground">ID: {area.id} (fixed)</p>
      <AdminForm
        fields={fields}
        initialValues={{
          slug: area.slug,
          title: area.title,
          teaser: area.teaser,
          description: area.description,
          icon: area.icon,
          gradient: area.gradient,
        }}
        action={updateFocusArea.bind(null, id)}
        cancelHref="/admin/programs"
        submitLabel="Save changes"
      />
    </div>
  );
}
