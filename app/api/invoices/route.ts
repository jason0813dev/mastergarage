import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id")?.trim().toUpperCase();
  const invoice = db.invoices.find((i) => i.id === id);
  if (!invoice) return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  return NextResponse.json({ invoice });
}

export async function POST(req: NextRequest) {
  // In production: create a PayMongo / GCash / Maya checkout session here.
  const { id, method } = await req.json();
  const invoice = db.invoices.find((i) => i.id === id?.toUpperCase());
  if (!invoice) return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  if (invoice.status === "PAID") return NextResponse.json({ error: "Already paid." }, { status: 409 });

  invoice.status = "PAID";
  invoice.paidAt = new Date().toISOString();
  invoice.paymentRef = `${(method || "PAY").toUpperCase()}-${Math.floor(Math.random() * 90000 + 10000)}`;

  return NextResponse.json({ invoice });
}
