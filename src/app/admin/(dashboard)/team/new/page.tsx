import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createTeamMember } from "../actions";

const fields: AdminFormField[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "photo", label: "Photo path", type: "text", placeholder: "/images/team/example.jpg" },
  { name: "bio", label: "Bio", type: "textarea", required: true },
];

export default function NewTeamMemberPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Team Member</h1>
      <AdminForm fields={fields} action={createTeamMember} cancelHref="/admin/team" submitLabel="Create" />
    </div>
  );
}
