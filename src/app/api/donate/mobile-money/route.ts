import { NextResponse } from "next/server";
import { mobileMoneyDonationSchema } from "@/lib/validations";
import { collectMoney, toUgandaE164 } from "@/lib/marzpay";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = mobileMoneyDonationSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: result.error.issues },
      { status: 400 }
    );
  }

  const { name, email, phone, amount, message } = result.data;
  const phoneNumber = toUgandaE164(phone);

  if (!phoneNumber) {
    return NextResponse.json(
      { error: "Please enter a valid Ugandan mobile money number (e.g. 0778 837 518)." },
      { status: 400 }
    );
  }

  if (!process.env.MARZPAY_API_KEY || !process.env.MARZPAY_API_SECRET) {
    console.error("MARZPAY_API_KEY / MARZPAY_API_SECRET is not set — mobile money collection not attempted.");
    return NextResponse.json({ error: "Mobile money payments are not configured yet." }, { status: 500 });
  }

  const reference = crypto.randomUUID();
  const callbackUrl = `${new URL(request.url).origin}/api/webhooks/marzpay`;

  try {
    const collection = await collectMoney({
      amount,
      phoneNumber,
      reference,
      description: `Donation from ${name} <${email}>${message ? ` — ${message}` : ""}`.slice(0, 255),
      callbackUrl,
    });

    try {
      await db.donation.create({
        data: {
          marzpayUuid: collection.data.transaction.uuid,
          reference,
          method: "mobile-money",
          status: collection.data.transaction.status,
          name,
          email,
          phone: phoneNumber,
          amount: Math.round(amount),
          message: message || null,
        },
      });
    } catch (error) {
      console.error("Failed to persist mobile money donation:", error);
    }

    return NextResponse.json({
      uuid: collection.data.transaction.uuid,
      status: collection.data.transaction.status,
    });
  } catch (error) {
    console.error("MarzPay collection error:", error);
    return NextResponse.json({ error: "Failed to start the mobile money payment." }, { status: 502 });
  }
}
