import { NextResponse } from "next/server";
import { Resend } from "resend";
import { donateFormSchema } from "@/lib/validations";
import { SITE_CONFIG } from "@/constants/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = donateFormSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: result.error.issues },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — donation pledge email was not sent.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const { name, email, phone, amount, message } = result.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Hope Makers Kalaki <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? SITE_CONFIG.email,
    replyTo: email,
    subject: `New donation pledge: UGX ${amount.toLocaleString()} from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Pledged amount: UGX ${amount.toLocaleString()}`,
      "",
      message || "(no message provided)",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send pledge." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
