"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  const span = String(formData.get("span") ?? "").trim();
  return {
    src: String(formData.get("src") ?? "").trim(),
    alt: String(formData.get("alt") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    span: span || null,
  };
}

export async function createGalleryImage(formData: FormData) {
  const data = readData(formData);
  if (!data.src || !data.category) return { error: "Image path and category are required." };

  await db.galleryImage.create({ data });
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateGalleryImage(id: string, formData: FormData) {
  const data = readData(formData);
  if (!data.src || !data.category) return { error: "Image path and category are required." };

  await db.galleryImage.update({ where: { id }, data });
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryImage(id: string) {
  await db.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}
