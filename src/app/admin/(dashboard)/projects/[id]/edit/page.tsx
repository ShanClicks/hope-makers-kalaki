import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateProject } from "../../actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, focusAreas] = await Promise.all([
    db.project.findUnique({ where: { id } }),
    db.focusArea.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!project) notFound();

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
    { name: "coverImage", label: "Cover image path", type: "text" },
    { name: "progress", label: "Funding progress (%)", type: "number" },
    { name: "goalLabel", label: "Goal label", type: "text" },
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
      <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
      <AdminForm
        fields={fields}
        initialValues={{
          title: project.title,
          categoryId: project.categoryId,
          summary: project.summary,
          description: project.description,
          location: project.location,
          coverImage: project.coverImage,
          progress: String(project.progress),
          goalLabel: project.goalLabel,
          status: project.status,
        }}
        action={updateProject.bind(null, id)}
        cancelHref="/admin/projects"
        submitLabel="Save changes"
      />
    </div>
  );
}
