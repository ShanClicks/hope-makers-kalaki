import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  const focusAreas = await db.focusArea.findMany({ orderBy: { order: "asc" } });

  const fields: AdminFormField[] = [
    { name: "title", label: "Title", type: "text", required: true },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      required: true,
      options: focusAreas.map((area) => ({ value: area.id, label: area.title })),
    },
    { name: "summary", label: "Summary (one line)", type: "textarea", required: true },
    { name: "description", label: "Full description", type: "textarea", required: true },
    { name: "location", label: "Location", type: "text", required: true },
    { name: "coverImage", label: "Cover image path", type: "text", placeholder: "/images/projects/example.jpg" },
    { name: "progress", label: "Funding progress (%)", type: "number" },
    { name: "goalLabel", label: "Goal label", type: "text", placeholder: "e.g. $10,000 target" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "ongoing", label: "Ongoing" },
        { value: "completed", label: "Completed" },
        { value: "planned", label: "Planned" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Project</h1>
      <AdminForm fields={fields} action={createProject} cancelHref="/admin/projects" submitLabel="Create" />
    </div>
  );
}
