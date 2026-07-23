"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readProjectData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? ""),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    coverImage: String(formData.get("coverImage") ?? "").trim(),
    progress: Number(formData.get("progress") ?? 0),
    goalLabel: String(formData.get("goalLabel") ?? "").trim(),
    status: String(formData.get("status") ?? "ongoing"),
  };
}

export async function createProject(formData: FormData) {
  const data = readProjectData(formData);

  if (!data.title || !data.categoryId) {
    return { error: "Title and category are required." };
  }

  await db.project.create({
    data: { ...data, slug: slugify(data.title) },
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const data = readProjectData(formData);

  if (!data.title || !data.categoryId) {
    return { error: "Title and category are required." };
  }

  await db.project.update({ where: { id }, data });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await db.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}
