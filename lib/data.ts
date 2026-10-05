export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  bays: Bay[];
  hours: { open: number; close: number }; // 24h format
};

export type Bay = {
  id: string;
  label: string;
  type: "GENERAL" | "DIAGNOSTIC" | "HEAVY" | "DETAILING";
};

export const BRANCHES: Branch[] = [
  {
    id: "molino",
    name: "MG Molino (Main)",
    address: "9185 Molino Rd, Bacoor, Cavite",
    phone: "+63 917-149-8046",
    hours: { open: 8, close: 18 },
    bays: [
      { id: "qc-1", label: "Bay 1", type: "GENERAL" },
      { id: "qc-2", label: "Bay 2", type: "GENERAL" },
      { id: "qc-3", label: "Bay 3", type: "DIAGNOSTIC" },
      { id: "qc-4", label: "Bay 4", type: "HEAVY" },
      { id: "qc-5", label: "Bay 5", type: "DETAILING" },
    ],
  },
  {
    id: "qc",
    name: "MG QC",
    address: "Master Garage, Novaliches, Quezon City",
    phone: "+63 927-524-4545",
    hours: { open: 8, close: 19 },
    bays: [
      { id: "mk-1", label: "Bay 1", type: "GENERAL" },
      { id: "mk-2", label: "Bay 2", type: "DIAGNOSTIC" },
      { id: "mk-3", label: "Bay 3", type: "DETAILING" },
    ],
  },
  {
    id: "pampanga",
    name: "MG Pampanga",
    address: "499 Gen Hizon Ave Ext, Brgy. Del Pilar, San Fernando, Pampanga",
    phone: "+63 931-817-3328",
    hours: { open: 8, close: 17 },
    bays: [
      { id: "cv-1", label: "Bay 1", type: "GENERAL" },
      { id: "cv-2", label: "Bay 2", type: "GENERAL" },
      { id: "cv-3", label: "Bay 3", type: "HEAVY" },
    ],
  },
  {
    id: "palawan",
    name: "MG Palawan",
    address: "Purok Silangan, Zone 2, Baranggay Tagburos, Puerto Princesa City, Palawan",
    phone: "+63 969-241-2152",
    hours: { open: 8, close: 17 },
    bays: [
      { id: "cv-1", label: "Bay 1", type: "GENERAL" },
      { id: "cv-2", label: "Bay 2", type: "GENERAL" },
      { id: "cv-3", label: "Bay 3", type: "HEAVY" },
    ],
  },
  {
    id: "davao",
    name: "MG Davao",
    address: "Apple St., Cuidad de Esperenza Access Road, Brgy Cabantian, Pag-ibig, Buhangin, Davao City",
    phone: "+63 905-455-0595",
    hours: { open: 8, close: 17 },
    bays: [
      { id: "cv-1", label: "Bay 1", type: "GENERAL" },
      { id: "cv-2", label: "Bay 2", type: "GENERAL" },
      { id: "cv-3", label: "Bay 3", type: "HEAVY" },
    ],
  },
];

export type Service = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;        // PHP
  priceNote?: string;
  durationHrs: number;
  bayType: Bay["type"];
};

export const SERVICES: Service[] = [
  // Preventive Maintenance
  { id: "pms-basic", category: "Preventive Maintenance", name: "PMS Basic (Oil Change Package)", description: "Fully synthetic oil, oil filter, 21-point inspection, fluid top-up.", price: 2800, durationHrs: 1, bayType: "GENERAL" },
  { id: "pms-full", category: "Preventive Maintenance", name: "PMS Comprehensive", description: "Full PMS per manufacturer schedule: filters, plugs, fluids, brake service.", price: 7500, priceNote: "from", durationHrs: 3, bayType: "GENERAL" },
  // Diagnostics & Electrical
  { id: "diag-obd", category: "Diagnostics & Electrical", name: "Computerized OBD-II Diagnostics", description: "Full-system scan with printed fault report and technician consultation.", price: 1500, durationHrs: 1, bayType: "DIAGNOSTIC" },
  { id: "diag-elec", category: "Diagnostics & Electrical", name: "Electrical System Troubleshooting", description: "Wiring, alternator, starter, and battery drain diagnosis.", price: 2500, priceNote: "from", durationHrs: 2, bayType: "DIAGNOSTIC" },
  { id: "diag-aircon", category: "Diagnostics & Electrical", name: "Aircon Diagnosis & Recharge", description: "Leak test, compressor check, refrigerant recharge (R134a).", price: 3200, durationHrs: 2, bayType: "DIAGNOSTIC" },
  // Engine & Drivetrain
  { id: "eng-overhaul", category: "Engine & Drivetrain", name: "Engine Top Overhaul", description: "Cylinder head service, valve seals, gasket replacement, resurfacing.", price: 25000, priceNote: "from", durationHrs: 8, bayType: "HEAVY" },
  { id: "eng-clutch", category: "Engine & Drivetrain", name: "Clutch Replacement", description: "Clutch disc, pressure plate, release bearing, flywheel inspection.", price: 12000, priceNote: "from", durationHrs: 6, bayType: "HEAVY" },
  { id: "eng-trans", category: "Engine & Drivetrain", name: "Transmission Service (AT/CVT)", description: "ATF flush and replacement, filter and pan gasket service.", price: 6500, durationHrs: 3, bayType: "HEAVY" },
  // Brakes & Suspension
  { id: "brk-pads", category: "Brakes & Suspension", name: "Brake Pad Replacement (Front)", description: "OEM-grade pads, rotor inspection, caliper service.", price: 3500, priceNote: "from", durationHrs: 2, bayType: "GENERAL" },
  { id: "sus-align", category: "Brakes & Suspension", name: "Wheel Alignment (3D)", description: "Computerized 3D alignment with before/after printout.", price: 1800, durationHrs: 1, bayType: "GENERAL" },
  { id: "sus-shock", category: "Brakes & Suspension", name: "Shock Absorber Replacement (per pair)", description: "Supply and install, with suspension bushing inspection.", price: 8000, priceNote: "from", durationHrs: 3, bayType: "GENERAL" },
  // Detailing
  { id: "det-interior", category: "Detailing & Care", name: "Full Interior Detailing", description: "Steam clean, upholstery shampoo, leather conditioning.", price: 4500, durationHrs: 4, bayType: "DETAILING" },
  { id: "det-ceramic", category: "Detailing & Care", name: "Ceramic Coating (9H)", description: "Paint correction + 2-layer 9H ceramic coat, 2-year warranty.", price: 18000, priceNote: "from", durationHrs: 8, bayType: "DETAILING" },
];

export const SERVICE_CATEGORIES = [...new Set(SERVICES.map((s) => s.category))];

export const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);

export const TESTIMONIALS = [
  {
    initials: "J. Reyes",
    quote:
      "Terrific job and extremely professional. I feel like I have a new car. Loved the SMS updates on progress — the car was finished right on schedule. Would recommend them to anyone.",
  },
  {
    initials: "M. Santos",
    quote:
      "Probably the best experience I've had with car repairs. They went above and beyond coordinating with my insurance and got the job done exactly how I wanted. Honest, open, quality work.",
  },
  {
    initials: "R. Dizon",
    quote:
      "Their diagnostic team found an electrical fault two other shops missed. Fair pricing, clear explanations, and the online bay booking made everything painless.",
  },
];
