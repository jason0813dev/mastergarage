import { NextRequest, NextResponse } from "next/server";
import { BRANCHES, SERVICES } from "@/lib/data";
import { db } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { branchId, bayId, serviceId, date, startHour, customer } = body;

  const branch = BRANCHES.find((b) => b.id === branchId);
  const service = SERVICES.find((s) => s.id === serviceId);
  const bay = branch?.bays.find((b) => b.id === bayId);

  if (!branch || !service || !bay || !date || startHour == null || !customer?.name || !customer?.phone) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const endHour = startHour + service.durationHrs;

  // Double-booking guard — verify again at write time
  const conflict = db.bookings.some(
    (bk) =>
      bk.bayId === bayId && bk.date === date && bk.status === "CONFIRMED" &&
      startHour < bk.endHour && endHour > bk.startHour
  );
  if (conflict) {
    return NextResponse.json(
      { error: "This slot was just taken. Please pick another time." },
      { status: 409 }
    );
  }

  const booking = {
    id: `BK-${Date.now().toString(36).toUpperCase()}`,
    branchId, bayId, serviceId, date, startHour, endHour,
    customer,
    status: "CONFIRMED" as const,
    createdAt: new Date().toISOString(),
  };
  db.bookings.push(booking);

  return NextResponse.json({ booking }, { status: 201 });
}
