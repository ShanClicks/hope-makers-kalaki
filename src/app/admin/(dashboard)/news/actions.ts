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

function readData(formData: FormData) {
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    date: new Date(String(formData.get("date") ?? "")),
    category: String(formData.get("category") ?? "").trim(),
    type: String(formData.get("type") ?? "news"),
    eventDate: eventDate ? new Date(eventDate) : null,
    location: location || null,
  };
}

export async function createNewsItem(formData: FormData) {
  const data = readData(formData);

  if (!data.title || Number.isNaN(data.date.getTime())) {
    return { error: "Title and a valid date are required." };
  }

  await db.newsItem.create({ data: { ...data, slug: slugify(data.title) } });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNewsItem(id: string, formData: FormData) {
  const data = readData(formData);

  if (!data.title || Number.isNaN(data.date.getTime())) {
    return { error: "Title and a valid date are required." };
  }

  await db.newsItem.update({ where: { id }, data });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNewsItem(id: string) {
  await db.newsItem.delete({ where: { id } });
  revalidatePath("/admin/news");
}
