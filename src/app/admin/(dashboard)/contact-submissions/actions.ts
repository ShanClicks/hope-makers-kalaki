"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function deleteContactSubmission(id: string) {
  await db.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contact-submissions");
}
