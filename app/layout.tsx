import type { Metadata } from "next";
import { Palanquin_Dark, Saira } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import BackToTop from '@/components/BackToTop';

const serif = Palanquin_Dark({ subsets: ["latin"], weight: "700", variable: "--font-serif" });
const sans = Saira({ subsets: ["latin"], weight: "500", variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Master Garage PH — Precision Auto Engineering",
  description:
    "Multi-branch automotive service: diagnostics, PMS, engine work, detailing. Book a service bay online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-zinc-200 font-sans text-zinc-800 antialiased transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-200">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
         <BackToTop />
      </body>
    </html>
  );
}
