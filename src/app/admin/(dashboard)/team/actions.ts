"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    photo: String(formData.get("photo") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
  };
}

export async function createTeamMember(formData: FormData) {
  const data = readData(formData);
  if (!data.name || !data.role) return { error: "Name and role are required." };

  await db.teamMember.create({ data });
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const data = readData(formData);
  if (!data.name || !data.role) return { error: "Name and role are required." };

  await db.teamMember.update({ where: { id }, data });
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  await db.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
}
