"use client";
import { useEffect, useMemo, useState } from "react";
import { BRANCHES, SERVICES, SERVICE_CATEGORIES, peso } from "@/lib/data";
import { CheckCircle2, Loader2 } from "lucide-react";

type Slot = { startHour: number; bays: { bayId: string; label: string }[] };

const fmtHour = (h: number) => `${((h + 11) % 12) + 1}:00 ${h < 12 ? "AM" : "PM"}`;

const inputCls =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900";

export default function BookingPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [date, setDate] = useState(today);

  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<{ startHour: number; bayId: string } | null>(null);

  const [customer, setCustomer] = useState({ name: "", phone: "", email: "", vehicle: "", plate: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [error, setError] = useState("");

  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId)!, [serviceId]);

  // Live availability — refetches on every change + polls every 15s
  useEffect(() => {
    let active = true;
    const fetchSlots = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/availability?branch=${branchId}&date=${date}&service=${serviceId}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (active) {
        setSlots(data.slots ?? []);
        setLoading(false);
      }
    };
    fetchSlots();
    const t = setInterval(fetchSlots, 15000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, [branchId, date, serviceId]);

  useEffect(() => setSelected(null), [branchId, date, serviceId]);

  const submit = async () => {
    if (!selected) return;
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        branchId,
        bayId: selected.bayId,
        serviceId,
        date,
        startHour: selected.startHour,
        customer,
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error);
      setSelected(null);
      return;
    }
    setConfirmation(data.booking);
  };

  if (confirmation) {
    const branch = BRANCHES.find((b) => b.id === confirmation.branchId)!;
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 dark:text-emerald-400" />
        <h1 className="mt-4 text-3xl font-bold">Booking Confirmed!</h1>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-left text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p><span className="text-zinc-500 dark:text-zinc-400">Reference:</span> <b>{confirmation.id}</b></p>
          <p><span className="text-zinc-500 dark:text-zinc-400">Branch:</span> {branch.name}</p>
          <p><span className="text-zinc-500 dark:text-zinc-400">Service:</span> {service.name}</p>
          <p>
            <span className="text-zinc-500 dark:text-zinc-400">Schedule:</span> {confirmation.date},{" "}
            {fmtHour(confirmation.startHour)} – {fmtHour(confirmation.endHour)}
          </p>
          <p>
            <span className="text-zinc-500 dark:text-zinc-400">Bay:</span>{" "}
            {branch.bays.find((b) => b.id === confirmation.bayId)?.label}
          </p>
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          A confirmation SMS will be sent to {customer.phone}. Please arrive 10 minutes early.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Book a Service Bay</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Availability updates live — slots shown are verified against all branch schedules.
      </p>

      {/* Step 1: Service, Branch & Date */}
      <div className="mt-8 grid gap-4 md:grid-cols-1">
        <div>
          <label className="text-sm font-semibold">Service</label>
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={inputCls}>
            {SERVICE_CATEGORIES.map((cat) => (
              <optgroup key={cat} label={cat}>
                {SERVICES.filter((s) => s.category === cat).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.priceNote ? "from " : ""}{peso(s.price)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="mt-1 text-xs text-zinc-500">
            Est. duration: {service.durationHrs} hr(s) · Requires {service.bayType.toLowerCase()} bay
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">Branch</label>
          <select value={branchId} onChange={(e) => setBranchId(e.target.value)} className={inputCls}>
            {BRANCHES.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Date</label>
          <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
      </div>

      {/* Step 2: Slot grid */}
      <div className="mt-8">
        <h2 className="font-semibold">Available Time Slots</h2>
        {loading && !slots ? (
          <div className="mt-4 flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Checking schedules…
          </div>
        ) : slots && slots.length === 0 ? (
          <p className="mt-4 rounded-lg border border-zinc-200 bg-white p-4 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No compatible bays available on this date. Try another date or branch.
          </p>
        ) : (
          <div className="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-4">
            {slots?.map((slot) => {
              const isSel = selected?.startHour === slot.startHour;
              return (
                <button
                  key={slot.startHour}
                  onClick={() => setSelected({ startHour: slot.startHour, bayId: slot.bays[0].bayId })}
                  className={`rounded-lg border p-3 text-left transition ${
                    isSel
                      ? "border-amber-500 bg-amber-400/10 dark:border-amber-400"
                      : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
                  }`}
                >
                  <span className="font-semibold">{fmtHour(slot.startHour)}</span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                    {slot.bays.length} bay(s) free
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Step 3: Customer details */}
      {selected && (
        <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold">Your Details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {([
              ["name", "Full Name *"],
              ["phone", "Mobile Number *"],
              ["email", "Email"],
              ["vehicle", "Vehicle (e.g. 2021 Toyota Fortuner)"],
              ["plate", "Plate Number"],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="text-sm">{label}</label>
                <input
                  value={customer[key]}
                  onChange={(e) => setCustomer({ ...customer, [key]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
            ))}
          </div>
          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            onClick={submit}
            disabled={submitting || !customer.name || !customer.phone}
            className="mt-6 rounded-lg bg-amber-400 px-8 py-3 font-semibold text-zinc-900 hover:bg-amber-300 disabled:opacity-50"
          >
            {submitting ? "Confirming…" : `Confirm Booking — ${fmtHour(selected.startHour)}`}
          </button>
        </div>
      )}
    </div>
  );
}
