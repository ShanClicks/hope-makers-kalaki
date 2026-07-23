import { NextResponse } from "next/server";
import { getCollectionStatus } from "@/lib/marzpay";
import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;

  if (!process.env.MARZPAY_API_KEY || !process.env.MARZPAY_API_SECRET) {
    return NextResponse.json({ error: "Mobile money payments are not configured yet." }, { status: 500 });
  }

  try {
    const collection = await getCollectionStatus(uuid);
    const status = collection.data.transaction.status;

    try {
      await db.donation.updateMany({ where: { marzpayUuid: uuid }, data: { status } });
    } catch (error) {
      console.error("Failed to sync donation status:", error);
    }

    return NextResponse.json({ uuid: collection.data.transaction.uuid, status });
  } catch (error) {
    console.error("MarzPay status check error:", error);
    return NextResponse.json({ error: "Failed to check payment status." }, { status: 502 });
  }
}
