"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  return {
    category: String(formData.get("category") ?? "").trim(),
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
  };
}

export async function createFaqItem(formData: FormData) {
  const data = readData(formData);
  if (!data.category || !data.question || !data.answer) {
    return { error: "Category, question, and answer are all required." };
  }

  await db.faqItem.create({ data });
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaqItem(id: string, formData: FormData) {
  const data = readData(formData);
  if (!data.category || !data.question || !data.answer) {
    return { error: "Category, question, and answer are all required." };
  }

  await db.faqItem.update({ where: { id }, data });
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaqItem(id: string) {
  await db.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
}
