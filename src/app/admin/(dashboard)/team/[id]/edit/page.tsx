import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateTeamMember } from "../../actions";

const fields: AdminFormField[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "photo", label: "Photo path", type: "text" },
  { name: "bio", label: "Bio", type: "textarea", required: true },
];

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await db.teamMember.findUnique({ where: { id } });

  if (!member) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Team Member</h1>
      <AdminForm
        fields={fields}
        initialValues={{ name: member.name, role: member.role, photo: member.photo, bio: member.bio }}
        action={updateTeamMember.bind(null, id)}
        cancelHref="/admin/team"
        submitLabel="Save changes"
      />
    </div>
  );
}
