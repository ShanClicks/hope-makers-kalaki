"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function deleteDonation(id: string) {
  await db.donation.delete({ where: { id } });
  revalidatePath("/admin/donations");
}
