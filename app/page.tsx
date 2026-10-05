import Link from "next/link";
import Image from "next/image";
import { Car, Paintbrush, ShieldCheck, Wrench, Quote } from "lucide-react";
import { BRANCHES, TESTIMONIALS } from "@/lib/data";
import NewsletterForm from "@/components/NewsletterForm";

const SERVICE_CARDS = [
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    desc: "Full PMS packages per manufacturer schedule — oil, filters, fluids, and multi-point inspection.",
  },
  {
    icon: Car,
    title: "Engine & Drivetrain",
    desc: "Top overhauls, clutch and transmission service by certified master technicians.",
  },
  {
    icon: ShieldCheck,
    title: "Diagnostics & Electrical",
    desc: "Computerized OBD-II scanning, electrical troubleshooting, and aircon service with printed reports.",
  },
  {
    icon: Paintbrush,
    title: "Detailing & Care",
    desc: "Interior detailing and 9H ceramic coating that restores your vehicle to showroom condition.",
  },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="relative h-130 w-full">
          {/* Placeholder hero image — replace with a real shop/workshop photo */}
          <Image
            src="/ws.jpg"
            alt="Master Garage PH workshop"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-zinc-950/60" />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                The Craftsmanship of Yesterday, With the Technology of Today.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-200">
                Master Garage PH is a multi-branch auto service and engineering shop that caters to
                each customer&apos;s unique needs — serving Metro Manila and surrounding communities
                since 2015.
              </p>
              <p className="mt-6 font-serif text-xl italic text-amber-400">
                Locally Owned and Operated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NEED SERVICE NOW ============ */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-bold">Need Service Now?</h2>
            <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We restore and maintain your vehicle using the very best equipment, parts, and
              technicians. We conduct our business honestly and with integrity. We take pride in
              what we do and back our work with service warranties. Don&apos;t trust your automobile
              with anyone else.
            </p>
            <Link
              href="/booking"
              className="mt-8 inline-block rounded-md bg-amber-500 px-8 py-4 font-semibold uppercase tracking-wide text-zinc-900 transition hover:bg-amber-400"
            >
              Schedule an Appointment
            </Link>
          </div>
          <Image
            src="/sbay.jpg"
            alt="Technician servicing a vehicle"
            width={800}
            height={600}
            unoptimized
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>

      {/* ============ OUR SERVICES ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="font-serif text-4xl font-bold">Our Services</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CARDS.map((s) => (
              <div key={s.title} className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                  <s.icon className="h-9 w-9 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-12 inline-block border-b-2 border-amber-500 pb-1 font-semibold uppercase tracking-wide transition hover:text-amber-600 dark:hover:text-amber-400"
          >
            See All Services
          </Link>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Quote className="mx-auto h-10 w-10 text-amber-500" />
          <h2 className="mt-3 font-serif text-3xl font-bold">Testimonials</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.initials}
                className="rounded-lg bg-white p-8 text-left shadow-sm dark:bg-zinc-950"
              >
                <blockquote className="font-serif italic leading-relaxed text-zinc-700 dark:text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 font-semibold text-amber-600 dark:text-amber-400">
                  — {t.initials}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STORY STRIP ============ */}
      <section className="relative py-24">
        <Image
          src="/gint.jpg"
          alt=""
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-zinc-950/70" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="font-serif text-3xl font-bold uppercase tracking-wide">
            Local, Family Owned and Operated — Serving Metro Manila for Over a Decade
          </h2>
          <p className="mt-5 leading-relaxed text-zinc-300">
            Our shops specialize in everything from routine maintenance to major engine work,
            insurance claims and customer pay. Car trouble can be frustrating and time consuming —
            we understand, and we&apos;re here to help any way we can.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-block border-b-2 border-amber-400 pb-1 font-semibold text-amber-400 hover:text-amber-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ============ LOOKING FOR MORE HELP ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">Looking For More Help?</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            We&apos;re here to assist you throughout every step of the service process. Here are
            some additional resources and ways to reach us.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/inquiry"
              className="rounded-md border-2 border-zinc-800 px-6 py-3 font-semibold uppercase tracking-wide transition hover:bg-zinc-800 hover:text-white dark:border-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-zinc-900"
            >
              Ask a Technician
            </Link>
            <Link
              href="/invoices"
              className="rounded-md border-2 border-zinc-800 px-6 py-3 font-semibold uppercase tracking-wide transition hover:bg-zinc-800 hover:text-white dark:border-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-zinc-900"
            >
              Pay an Invoice
            </Link>
            <a
              href={`tel:${BRANCHES[0].phone.replace(/[^0-9]/g, "")}`}
              className="rounded-md bg-amber-500 px-6 py-3 font-semibold uppercase tracking-wide text-zinc-900 transition hover:bg-amber-400"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="bg-zinc-900 py-20 text-white dark:bg-zinc-900">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold uppercase tracking-wide">
            Join Our Newsletter
          </h2>
          <p className="mt-3 text-zinc-400">Get the latest news, updates, and special offers!</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
