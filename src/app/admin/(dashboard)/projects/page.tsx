import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteProject } from "./actions";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    include: { category: true },
    orderBy: { order: "asc" },
  });

  return (
    <AdminTable
      title="Projects"
      newHref="/admin/projects/new"
      editBasePath="/admin/projects"
      onDelete={deleteProject}
      columnLabels={["Title", "Category", "Status", "Progress"]}
      rows={projects.map((project) => ({
        id: project.id,
        cells: [project.title, project.category.title, project.status, `${project.progress}%`],
      }))}
    />
  );
}
