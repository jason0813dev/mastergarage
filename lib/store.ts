// In-memory store. Replace with Prisma/Postgres in production —
// the API route signatures won't need to change.

export type Booking = {
  id: string;
  branchId: string;
  bayId: string;
  serviceId: string;
  date: string;        // YYYY-MM-DD
  startHour: number;
  endHour: number;
  customer: { name: string; phone: string; email: string; vehicle: string; plate: string };
  status: "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

export type Invoice = {
  id: string;          // e.g. INV-2026-0042
  customerName: string;
  branchId: string;
  items: { label: string; amount: number }[];
  total: number;
  status: "UNPAID" | "PAID";
  dueDate: string;
  paidAt?: string;
  paymentRef?: string;
};

export type Inquiry = {
  id: string;
  name: string; email: string; phone: string;
  vehicle: string; category: string; message: string;
  preferredBranch: string;
  createdAt: string;
};

const g = globalThis as unknown as {
  __bookings?: Booking[];
  __invoices?: Invoice[];
  __inquiries?: Inquiry[];
};

g.__bookings ??= [
  // Seed data so availability feels "live"
  { id: "seed-1", branchId: "qc", bayId: "qc-1", serviceId: "pms-basic", date: new Date().toISOString().slice(0, 10), startHour: 9, endHour: 10, customer: { name: "Seed", phone: "", email: "", vehicle: "", plate: "" }, status: "CONFIRMED", createdAt: new Date().toISOString() },
];

g.__invoices ??= [
  { id: "INV-2026-0042", customerName: "Juan Dela Cruz", branchId: "qc", items: [{ label: "PMS Comprehensive", amount: 7500 }, { label: "Brake Pad Replacement (Front)", amount: 3500 }], total: 11000, status: "UNPAID", dueDate: "2026-10-15" },
  { id: "INV-2026-0038", customerName: "Maria Santos", branchId: "makati", items: [{ label: "Ceramic Coating (9H)", amount: 18000 }], total: 18000, status: "PAID", dueDate: "2026-09-30", paidAt: "2026-09-28", paymentRef: "GCASH-88412" },
];

g.__inquiries ??= [];

export const db = {
  bookings: g.__bookings!,
  invoices: g.__invoices!,
  inquiries: g.__inquiries!,
};
