import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteTeamMember } from "./actions";

export default async function AdminTeamPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="Team"
      newHref="/admin/team/new"
      editBasePath="/admin/team"
      onDelete={deleteTeamMember}
      columnLabels={["Name", "Role"]}
      rows={members.map((member) => ({
        id: member.id,
        cells: [member.name, member.role],
      }))}
    />
  );
}
