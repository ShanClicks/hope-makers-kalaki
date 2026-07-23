"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim(),
  };
}

export async function createCoreValue(formData: FormData) {
  const data = readData(formData);
  if (!data.title) return { error: "Title is required." };

  await db.coreValue.create({ data });
  revalidatePath("/admin/core-values");
  redirect("/admin/core-values");
}

export async function updateCoreValue(id: string, formData: FormData) {
  const data = readData(formData);
  if (!data.title) return { error: "Title is required." };

  await db.coreValue.update({ where: { id }, data });
  revalidatePath("/admin/core-values");
  redirect("/admin/core-values");
}

export async function deleteCoreValue(id: string) {
  await db.coreValue.delete({ where: { id } });
  revalidatePath("/admin/core-values");
}
