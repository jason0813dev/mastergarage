"use client";
import { useState } from "react";
import { peso, BRANCHES } from "@/lib/data";
import { Search, ShieldCheck } from "lucide-react";

export default function InvoicePortal() {
  const [query, setQuery] = useState("");
  const [invoice, setInvoice] = useState<any>(null);
  const [error, setError] = useState("");
  const [method, setMethod] = useState("gcash");
  const [paying, setPaying] = useState(false);

  const lookup = async () => {
    setError("");
    setInvoice(null);
    const res = await fetch(`/api/invoices?id=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setInvoice(data.invoice);
  };

  const pay = async () => {
    setPaying(true);
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: invoice.id, method }),
    });
    const data = await res.json();
    setPaying(false);
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setInvoice(data.invoice);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl py-4 font-extrabold uppercase tracking-wide sm:text-4xl">
        Payment <span className="text-amber-500 dark:text-amber-400">Portal</span>
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Enter your invoice number (e.g.{" "}
        <code className="text-amber-600 dark:text-amber-400">INV-2026-0042</code>) from your service receipt.
      </p>

      <div className="mt-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="INV-2026-XXXX"
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          className="flex-1 rounded-lg border border-zinc-300 bg-white p-3 uppercase dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          onClick={lookup}
          className="flex items-center gap-2 rounded-lg bg-amber-400 px-5 font-semibold text-zinc-900 hover:bg-amber-300"
        >
          <Search className="h-4 w-4" /> Find
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {invoice && (
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">{invoice.id}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {invoice.customerName} · {BRANCHES.find((b) => b.id === invoice.branchId)?.name}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                invoice.status === "PAID"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
              }`}
            >
              {invoice.status}
            </span>
          </div>

          <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 text-sm dark:divide-zinc-800 dark:border-zinc-800">
            {invoice.items.map((it: any, i: number) => (
              <div key={i} className="flex justify-between py-2">
                <span>{it.label}</span>
                <span>{peso(it.amount)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between font-bold">
            <span>Total Due</span>
            <span>{peso(invoice.total)}</span>
          </div>

          {invoice.status === "UNPAID" ? (
            <div className="mt-6">
              <label className="text-sm font-semibold">Payment Method</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["gcash", "maya", "card"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`rounded-lg border p-3 text-sm font-semibold uppercase ${
                      method === m
                        ? "border-amber-500 bg-amber-400/10 dark:border-amber-400"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <button
                onClick={pay}
                disabled={paying}
                className="mt-4 w-full rounded-lg bg-amber-400 py-3 font-semibold text-zinc-900 hover:bg-amber-300 disabled:opacity-50"
              >
                {paying ? "Processing…" : `Pay ${peso(invoice.total)}`}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4" /> Payments processed securely. Official receipt issued at branch.
              </p>
            </div>
          ) : (
            <p className="mt-6 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
              ✅ Paid on {invoice.paidAt?.slice(0, 10)} · Ref: {invoice.paymentRef}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
