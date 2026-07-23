"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    program: String(formData.get("program") ?? "").trim(),
    portrait: String(formData.get("portrait") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    story: String(formData.get("story") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
  };
}

export async function createTestimonial(formData: FormData) {
  const data = readData(formData);
  if (!data.name || !data.program) return { error: "Name and program are required." };

  await db.testimonial.create({ data });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const data = readData(formData);
  if (!data.name || !data.program) return { error: "Name and program are required." };

  await db.testimonial.update({ where: { id }, data });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await db.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}
