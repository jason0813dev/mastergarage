import { NextRequest, NextResponse } from "next/server";
import { BRANCHES, SERVICES } from "@/lib/data";
import { db } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const branchId = searchParams.get("branch");
  const date = searchParams.get("date");
  const serviceId = searchParams.get("service");

  const branch = BRANCHES.find((b) => b.id === branchId);
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!branch || !date || !service) {
    return NextResponse.json({ error: "branch, date, and service are required" }, { status: 400 });
  }

  // Only bays matching the service's required bay type
  const eligibleBays = branch.bays.filter((b) => b.type === service.bayType);

  const taken = db.bookings.filter(
    (bk) => bk.branchId === branch.id && bk.date === date && bk.status === "CONFIRMED"
  );

  const slots: { startHour: number; bays: { bayId: string; label: string }[] }[] = [];
  for (let h = branch.hours.open; h + service.durationHrs <= branch.hours.close; h++) {
    const freeBays = eligibleBays.filter((bay) =>
      !taken.some(
        (bk) => bk.bayId === bay.id && h < bk.endHour && h + service.durationHrs > bk.startHour
      )
    );
    if (freeBays.length > 0) {
      slots.push({ startHour: h, bays: freeBays.map((b) => ({ bayId: b.id, label: b.label })) });
    }
  }

  return NextResponse.json({ branch: branch.id, date, service: service.id, durationHrs: service.durationHrs, slots });
}
