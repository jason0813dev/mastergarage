import Link from "next/link";
import { Settings, Zap, Car, Shield, Droplets, Sparkles, ChevronRight } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES, peso } from "@/lib/data";

export const metadata = { title: "Services — Master Garage PH" };

const CATEGORY_CARDS = [
  {
    icon: Settings,
    title: "Preventive Maintenance (PMS)",
    desc: "Comprehensive fluid checks, oil change, filter replacements, and overall vehicle health assessment.",
    price: "Starts at ₱2,800",
    category: "Preventive Maintenance",
  },
  {
    icon: Zap,
    title: "Engine Repair & Diagnostics",
    desc: "Advanced computer diagnostics, timing belt replacement, head gasket repair, and full engine overhaul.",
    price: "Varies based on diagnosis",
    category: "Engine & Drivetrain",
  },
  {
    icon: Car,
    title: "Underchassis & Suspension",
    desc: "Shock absorbers, tie rods, bushings, ball joints replacement, and wheel alignment.",
    price: "Starts at ₱1,800",
    category: "Brakes & Suspension",
  },
  {
    icon: Shield,
    title: "Auto Electrical Systems",
    desc: "Battery testing, alternator repair, starter motor issues, and complex wiring diagnostics.",
    price: "Starts at ₱1,500",
    category: "Diagnostics & Electrical",
  },
  {
    icon: Droplets,
    title: "Aircon Service",
    desc: "Leak testing, compressor checks, refrigerant recharge, and full climate system restoration.",
    price: "Starts at ₱3,200",
    category: "Diagnostics & Electrical",
  },
  {
    icon: Sparkles,
    title: "Detailing & Ceramic Coating",
    desc: "Full interior detailing, paint correction, and 2-layer 9H ceramic coating with 2-year warranty.",
    price: "Starts at ₱4,500",
    category: "Detailing & Care",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide sm:text-4xl">
          Our <span className="text-amber-500 dark:text-amber-400">Services</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Precision engineering, honest diagnostics, and complete repair and maintenance services.
        </p>
      </div>

      {/* ===== Category Cards (matches mockup) ===== */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_CARDS.map((c) => (
          <div
            key={c.title}
            className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-amber-500/40 dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Icon badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/30">
              <c.icon className="h-6 w-6 text-amber-500 dark:text-amber-400" />
            </div>

            <h2 className="mt-5 text-base font-extrabold uppercase tracking-wide">{c.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {c.desc}
            </p>

            {/* Divider + price/BOOK row */}
            <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {c.price}
                </span>
                <Link
                  href="/booking"
                  className="flex items-center gap-0.5 text-sm font-extrabold uppercase tracking-wide transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Book <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Itemized Menu ===== */}
      <div className="mt-20">
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide">
          Itemized <span className="text-amber-500 dark:text-amber-400">Price Menu</span>
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-500">
          &ldquo;From&rdquo; prices vary by vehicle class — final quote confirmed at inspection.
        </p>

        {SERVICE_CATEGORIES.map((cat) => (
          <section key={cat} className="mt-10">
            <h3 className="border-b border-zinc-200 pb-2 text-lg font-bold uppercase tracking-wide text-amber-600 dark:border-zinc-800 dark:text-amber-400">
              {cat}
            </h3>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {SERVICES.filter((s) => s.category === cat).map((s) => (
                <div
                  key={s.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="max-w-xl">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.description}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Est. {s.durationHrs} hr(s) · {s.bayType.toLowerCase()} bay
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="font-bold">
                      {s.priceNote && (
                        <span className="text-sm font-normal text-zinc-500">from </span>
                      )}
                      {peso(s.price)}
                    </p>
                    <Link
                      href={`/booking?service=${s.id}`}
                      className="flex items-center gap-0.5 rounded-md bg-amber-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-zinc-900 hover:bg-amber-300"
                    >
                      Book <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
