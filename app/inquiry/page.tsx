"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

const fieldCls =
  "w-full rounded-md border border-zinc-300 bg-white p-3 text-sm placeholder-zinc-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:placeholder-zinc-600";

export default function InquiryPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", vehicle: "", message: "" });
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

  return (
    <section className="bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
        {/* ===== Left: Info Column ===== */}
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide sm:text-4xl">
            Technical <span className="text-amber-500 dark:text-amber-400">Inquiry</span>
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
            Experiencing unusual noises, warning lights, or performance drops? Describe your
            vehicle&apos;s symptoms, and our master mechanics will get back to you with a
            preliminary assessment.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" />
              <div>
                <p className="font-bold uppercase tracking-wide">Headquarters</p>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                  123 Commonwealth Ave, Quezon City, Metro Manila, Philippines
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" />
              <a href="tel:+639171234567" className="text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400">
                +63 917 123 4567 / (02) 8123 4567
              </a>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-amber-500 dark:text-amber-400" />
              <a href="mailto:support@mastergarage.ph" className="text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400">
                support@mastergarage.ph
              </a>
            </div>
          </div>
        </div>

        {/* ===== Right: Form Card ===== */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-lg sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          {done ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-500 dark:text-emerald-400" />
              <h2 className="mt-4 text-2xl font-extrabold uppercase">Inquiry Received</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Ticket <b className="text-amber-600 dark:text-amber-400">{done}</b> — a master
                technician will respond within 24 hours via email or SMS.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Name</label>
                  <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={fieldCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Phone</label>
                  <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={fieldCls} />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">Email</label>
                <input
                  required
                  type="email"
                  placeholder="For our technician's reply"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={fieldCls}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">Vehicle Make/Model/Year</label>
                <input
                  placeholder="e.g. Honda Civic 2018"
                  value={form.vehicle}
                  onChange={(e) => set("vehicle", e.target.value)}
                  className={fieldCls}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">Describe the Issue</label>
                <textarea
                  required
                  rows={5}
                  placeholder="e.g. Squeaking noise when braking..."
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={fieldCls}
                />
              </div>

              {error && (
                <p className="rounded-md bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-amber-400 py-3.5 text-sm font-extrabold uppercase tracking-widest text-zinc-900 transition hover:bg-amber-300 disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
