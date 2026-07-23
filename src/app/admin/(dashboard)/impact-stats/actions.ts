"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function readData(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "").trim(),
    value: Number(formData.get("value") ?? 0),
    suffix: String(formData.get("suffix") ?? "").trim() || null,
    icon: String(formData.get("icon") ?? "").trim(),
  };
}

export async function createImpactStat(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const data = readData(formData);

  if (!id || !data.label) return { error: "ID and label are required." };

  await db.impactStat.create({ data: { id, ...data } });
  revalidatePath("/admin/impact-stats");
  redirect("/admin/impact-stats");
}

export async function updateImpactStat(id: string, formData: FormData) {
  const data = readData(formData);
  if (!data.label) return { error: "Label is required." };

  await db.impactStat.update({ where: { id }, data });
  revalidatePath("/admin/impact-stats");
  redirect("/admin/impact-stats");
}

export async function deleteImpactStat(id: string) {
  await db.impactStat.delete({ where: { id } });
  revalidatePath("/admin/impact-stats");
}
