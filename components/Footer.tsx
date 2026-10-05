import Image from "next/image";
import { BRANCHES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 text-center text-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4">
        {/* Shield-style logo placeholder */}
        <Image
          src="/mg_logo.png"
          alt="Master Garage PH"
          width={80}
          height={50}
          unoptimized
          className="mx-auto h-15 w-auto object-contain"
        />
        <hr className="mx-auto my-8 w-24 border-zinc-300 dark:border-zinc-700" />

        <div className="grid gap-8 md:grid-cols-3">
          {BRANCHES.map((b) => (
            <div key={b.id}>
              <p className="font-bold uppercase tracking-wide">{b.name}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{b.address}</p>
              <p className="font-semibold">
                <a href={`tel:${b.phone.replace(/[^0-9]/g, "")}`} className="hover:text-amber-600 dark:hover:text-amber-400">
                  {b.phone}
                </a>
              </p>
              <p className="text-zinc-500">
                Mon–Sat, {b.hours.open}AM – {b.hours.close - 12}PM
              </p>
            </div>
          ))}
        </div>

        <hr className="mx-auto my-8 w-24 border-zinc-300 dark:border-zinc-700" />
        <a
          href="https://www.facebook.com/MasterGaragePh"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-amber-600 hover:underline dark:text-amber-400"
        >
          facebook.com/MasterGaragePh
        </a>
        <p className="mt-4 text-xs text-zinc-500">© 2026 Master Garage PH. All rights reserved.</p>
      </div>
    </footer>
  );
}
