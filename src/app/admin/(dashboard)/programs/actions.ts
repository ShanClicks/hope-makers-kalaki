"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    teaser: String(formData.get("teaser") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim(),
    gradient: String(formData.get("gradient") ?? "").trim(),
  };
}

export async function createFocusArea(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const data = readData(formData);

  if (!id || !data.title) {
    return { error: "ID and title are required." };
  }

  await db.focusArea.create({ data: { id, ...data } });

  revalidatePath("/admin/programs");
  redirect("/admin/programs");
}

export async function updateFocusArea(id: string, formData: FormData) {
  const data = readData(formData);

  if (!data.title) {
    return { error: "Title is required." };
  }

  await db.focusArea.update({ where: { id }, data });

  revalidatePath("/admin/programs");
  redirect("/admin/programs");
}

export async function deleteFocusArea(id: string) {
  await db.focusArea.delete({ where: { id } });
  revalidatePath("/admin/programs");
}
