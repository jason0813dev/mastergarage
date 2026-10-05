"use client";
import { useState } from "react";
import { BRANCHES } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  "Engine / Drivetrain",
  "Electrical / Diagnostics",
  "Brakes / Suspension",
  "Aircon",
  "Noise / Vibration",
  "Quotation Request",
  "General",
];

const fieldCls =
  "rounded-lg border border-zinc-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900";

export default function InquiryPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    category: CATEGORIES[0],
    preferredBranch: "any",
    message: "",
  });
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setDone(data.inquiry.id);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 dark:text-emerald-400" />
        <h1 className="mt-4 text-3xl font-bold">Inquiry Received</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Ticket <b className="text-amber-600 dark:text-amber-400">{done}</b> — a master technician
          will respond within 24 hours via email or SMS.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">Technical Inquiry</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Describe symptoms in detail (sounds, when it occurs, warning lights) — the more info, the
        faster the diagnosis.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          required
          placeholder="Full Name *"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className={fieldCls}
        />
        <input
          required
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className={fieldCls}
        />
        <input
          placeholder="Mobile Number"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={fieldCls}
        />
        <input
          placeholder="Vehicle (year / make / model)"
          value={form.vehicle}
          onChange={(e) => set("vehicle", e.target.value)}
          className={fieldCls}
        />
        <select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          className={fieldCls}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={form.preferredBranch}
          onChange={(e) => set("preferredBranch", e.target.value)}
          className={fieldCls}
        >
          <option value="any">Any Branch</option>
          {BRANCHES.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <textarea
          required
          rows={6}
          placeholder="Describe the issue in detail *"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${fieldCls} md:col-span-2`}
        />

        {error && (
          <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 md:col-span-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-amber-400 py-3 font-semibold text-zinc-900 hover:bg-amber-300 disabled:opacity-50 md:col-span-2"
        >
          {submitting ? "Submitting…" : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
