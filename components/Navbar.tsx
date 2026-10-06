"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book a Bay" },
  { href: "/invoices", label: "Pay Invoice" },
  { href: "/inquiry", label: "Tech Inquiry" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image src="/mg_logo.png" alt="Master Garage PH" width={450} height={220} priority className="h-12 w-auto sm:h-20" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 text-sm md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 transition ${
                path === l.href
                  ? "bg-amber-400 font-semibold text-zinc-900"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2"><ThemeToggle /></div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-md px-4 py-3 text-base font-medium ${
                path === l.href
                  ? "bg-amber-400 font-semibold text-zinc-900"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="mt-3 block rounded-md bg-amber-400 px-4 py-3 text-center font-extrabold uppercase tracking-wide text-zinc-900"
          >
            Book an Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
