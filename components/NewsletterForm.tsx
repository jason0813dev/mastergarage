"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [form, setForm] = useState({ first: "", last: "", email: "" });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Production: POST to /api/newsletter → Mailchimp/Resend audience
    setDone(true);
  };

  if (done) return <p className="mt-8 text-lg text-amber-400">Thank you for subscribing! 🎉</p>;

  return (
    <form onSubmit={submit} className="mt-8 grid gap-3 sm:grid-cols-2">
      <input
        required
        placeholder="First Name"
        value={form.first}
        onChange={(e) => setForm({ ...form, first: e.target.value })}
        className="rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-zinc-500"
      />
      <input
        required
        placeholder="Last Name"
        value={form.last}
        onChange={(e) => setForm({ ...form, last: e.target.value })}
        className="rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-zinc-500"
      />
      <input
        required
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-zinc-500 sm:col-span-2"
      />
      <button
        type="submit"
        className="rounded-md bg-amber-500 py-3 font-semibold uppercase tracking-widest text-zinc-900 hover:bg-amber-400 sm:col-span-2"
      >
        Submit
      </button>
    </form>
  );
}
