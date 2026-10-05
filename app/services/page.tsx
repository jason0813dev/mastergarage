import { SERVICES, SERVICE_CATEGORIES, peso } from "@/lib/data";
import Link from "next/link";

export const metadata = { title: "Service Menu — Master Garage PH" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Engineering Service Menu</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Transparent, itemized pricing. &quot;From&quot; prices vary by vehicle class — final quote
        confirmed at inspection.
      </p>

      {SERVICE_CATEGORIES.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="border-b border-zinc-200 pb-2 text-xl font-bold text-amber-600 dark:border-zinc-800 dark:text-amber-400">
            {cat}
          </h2>
          <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            {SERVICES.filter((s) => s.category === cat).map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="max-w-xl">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.description}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Est. {s.durationHrs} hr(s) · {s.bayType.toLowerCase()} bay
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold">
                    {s.priceNote && (
                      <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">from </span>
                    )}
                    {peso(s.price)}
                  </p>
                  <Link
                    href={`/booking?service=${s.id}`}
                    className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
                  >
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
