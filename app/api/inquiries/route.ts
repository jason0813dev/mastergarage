import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function POST(req: NextRequest) {
  const b = await req.json();
  if (!b.name || !b.email || !b.message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  const inquiry = {
    id: `TQ-${Date.now().toString(36).toUpperCase()}`,
    name: b.name, email: b.email, phone: b.phone ?? "",
    vehicle: b.vehicle ?? "", category: b.category ?? "General",
    message: b.message, preferredBranch: b.preferredBranch ?? "any",
    createdAt: new Date().toISOString(),
  };
  db.inquiries.push(inquiry);
  // Production: send email via Resend/SES + Slack webhook to service advisors.
  return NextResponse.json({ inquiry }, { status: 201 });
}
