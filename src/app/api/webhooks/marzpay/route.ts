import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getCollectionStatus } from "@/lib/marzpay";
import { SITE_CONFIG } from "@/constants/site";
import { db } from "@/lib/db";

// MarzPay's callback payload isn't signed (no documented signature/verification scheme), so it
// can't be trusted on its own — anyone who guesses this URL could POST a fake "completed" event.
// We treat the payload only as a hint to look up, then re-verify the real status directly from
// MarzPay using our own credentials before acting on it.
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const uuid = payload?.transaction?.uuid;

  if (!uuid) {
    return NextResponse.json({ error: "Missing transaction uuid." }, { status: 400 });
  }

  let verifiedStatus: string;
  let amount: { formatted: string; currency: string } | undefined;
  let phoneNumber: string | undefined;
  let description: string | undefined;

  try {
    const collection = await getCollectionStatus(uuid);
    verifiedStatus = collection.data.transaction.status;
    amount = collection.data.collection.amount;
    phoneNumber = collection.data.collection.phone_number;
    description = payload?.transaction?.description;
  } catch (error) {
    console.error("MarzPay webhook verification error:", error);
    return NextResponse.json({ error: "Failed to verify transaction." }, { status: 502 });
  }

  try {
    await db.donation.updateMany({ where: { marzpayUuid: uuid }, data: { status: verifiedStatus } });
  } catch (error) {
    console.error("Failed to sync donation status from webhook:", error);
  }

  if (verifiedStatus !== "completed") {
    console.log(`MarzPay webhook: transaction ${uuid} verified status is "${verifiedStatus}", not notifying.`);
    return NextResponse.json({ received: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — mobile money confirmation email was not sent.");
    return NextResponse.json({ received: true });
  }

  const donorMatch = description?.match(/^Donation from ([^<]+)<([^>]+)>/);
  const donorName = donorMatch?.[1]?.trim() ?? "a donor";
  const donorEmail = donorMatch?.[2]?.trim();

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Hope Makers Kalaki <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? SITE_CONFIG.email,
    replyTo: donorEmail,
    subject: `Mobile Money payment completed: ${amount?.formatted ?? ""} ${amount?.currency ?? ""} from ${donorName}`,
    text: [
      `Donor: ${donorName}`,
      donorEmail ? `Email: ${donorEmail}` : null,
      `Phone: ${phoneNumber}`,
      `Amount: ${amount?.formatted} ${amount?.currency}`,
      `Transaction: ${uuid}`,
      "",
      description ?? "",
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n"),
  });

  if (error) {
    console.error("Resend error sending mobile money confirmation:", error);
  }

  return NextResponse.json({ received: true });
}
