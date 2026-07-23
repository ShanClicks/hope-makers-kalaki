import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateCoreValue } from "../../actions";

const fields: AdminFormField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon name (lucide-react)", type: "text" },
];

export default async function EditCoreValuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const value = await db.coreValue.findUnique({ where: { id } });

  if (!value) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Core Value</h1>
      <AdminForm
        fields={fields}
        initialValues={{ title: value.title, description: value.description, icon: value.icon }}
        action={updateCoreValue.bind(null, id)}
        cancelHref="/admin/core-values"
        submitLabel="Save changes"
      />
    </div>
  );
}
