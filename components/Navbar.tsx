"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/mg_logo.png"
            alt="Master Garage PH"
            width={140}
            height={50}
            priority              // logo is above the fold — skip lazy loading
            className="h-35 w-auto"
          />
        </Link>
        <div className="flex items-center gap-1 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 transition ${
                path === l.href
                  ? "bg-amber-400 font-semibold text-zinc-200"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
