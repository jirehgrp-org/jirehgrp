// @/lib/proforma.ts

export type VatMode = "inclusive" | "exclusive" | "none";

export type LineItem = {
  id: string;
  title: string;
  /** Each bullet renders as a separate line under the title. */
  bullets: string[];
  unitPrice: number;
  quantity: number;
};

export type BankAccount = {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export type PaymentOption = {
  id: string;
  preset: string;
  label: string;
  amount: number;
  dueNote: string;
};

export const PAYMENT_PRESETS = [
  { value: "full", label: "Full payment", share: 100 },
  { value: "deposit-50", label: "50% deposit", share: 50 },
  { value: "balance-50", label: "50% balance on delivery", share: 50 },
  { value: "deposit-60", label: "60% deposit", share: 60 },
  { value: "balance-40", label: "40% balance on delivery", share: 40 },
  { value: "deposit-30", label: "30% deposit", share: 30 },
  { value: "milestone-1", label: "Milestone 1", share: 0 },
  { value: "milestone-2", label: "Milestone 2", share: 0 },
  { value: "on-signing", label: "On signing", share: 0 },
  { value: "on-completion", label: "On completion", share: 0 },
  { value: "custom", label: "Custom", share: 0 },
] as const;

export const DUE_NOTE_PRESETS = [
  "",
  "On signing",
  "On delivery",
  "On completion",
  "Within 7 days",
  "Within 15 days",
  "Within 30 days",
];

/** Payment options should add up to the invoice total. */
export function paymentsBalance(
  options: PaymentOption[],
  total: number,
): { allocated: number; remaining: number; balanced: boolean } {
  const allocated = options.reduce((sum, option) => sum + option.amount, 0);
  const remaining = total - allocated;

  return {
    allocated,
    remaining,
    balanced: Math.abs(remaining) < 0.01,
  };
}

export type ProformaData = {
  invoiceNumber: string;
  issueDate: string; // yyyy-mm-dd
  dueDate: string;
  validUntil: string;

  clientName: string;
  clientCompany: string;
  clientTin: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;

  companyName: string;
  companyAddress: string;
  companyTin: string;
  preparedBy: string;
  preparedByRole: string;
  companyPhone: string;
  companyEmail: string;

  currency: string;
  vatMode: VatMode;
  vatRate: number;

  items: LineItem[];
  banks: BankAccount[];
  paymentOptions: PaymentOption[];

  notes: string;
  terms: string;
};

export type Totals = {
  subtotal: number;
  vat: number;
  total: number;
};

export function computeTotals(data: ProformaData): Totals {
  const gross = data.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  if (data.vatMode === "none") {
    return { subtotal: gross, vat: 0, total: gross };
  }

  if (data.vatMode === "inclusive") {
    // Prices already contain VAT — work backwards so the total stays round.
    const subtotal = gross / (1 + data.vatRate / 100);
    return { subtotal, vat: gross - subtotal, total: gross };
  }

  const vat = gross * (data.vatRate / 100);
  return { subtotal: gross, vat, total: gross + vat };
}

export function formatMoney(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const INVOICE_COUNTER_KEY = "jirehgrp:last-invoice-number";

/** Remembers the last number used so Abel doesn't have to. */
export function nextInvoiceNumber(): string {
  if (typeof window === "undefined") return "00142";

  const stored = window.localStorage.getItem(INVOICE_COUNTER_KEY);
  const last = stored ? parseInt(stored, 10) : 141;

  return String(last + 1).padStart(5, "0");
}

export function commitInvoiceNumber(invoiceNumber: string): void {
  if (typeof window === "undefined") return;

  const parsed = parseInt(invoiceNumber, 10);
  if (!Number.isNaN(parsed)) {
    window.localStorage.setItem(INVOICE_COUNTER_KEY, String(parsed));
  }
}

export function createEmptyProforma(): ProformaData {
  const today = new Date().toISOString().slice(0, 10);

  const inThirtyDays = new Date();
  inThirtyDays.setDate(inThirtyDays.getDate() + 30);

  return {
    invoiceNumber: nextInvoiceNumber(),
    issueDate: today,
    dueDate: inThirtyDays.toISOString().slice(0, 10),
    validUntil: inThirtyDays.toISOString().slice(0, 10),

    clientName: "",
    clientCompany: "",
    clientTin: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",

    companyName: "Jirehgrp",
    companyAddress: "Addis Ababa | Ohio Columbus",
    companyTin: "",
    preparedBy: "Abel Yohannes",
    preparedByRole: "CFO",
    companyPhone: "+251 98 515 4559",
    companyEmail: "abelakeza@jirehgrp.com",

    currency: "ETB",
    vatMode: "inclusive",
    vatRate: 15,

    items: [
      {
        id: crypto.randomUUID(),
        title: "",
        bullets: [""],
        unitPrice: 0,
        quantity: 1,
      },
    ],
    banks: [
      {
        id: crypto.randomUUID(),
        bankName: "",
        accountName: "Jirehgrp",
        accountNumber: "",
      },
    ],
    paymentOptions: [],

    notes: "",
    terms:
      "This proforma invoice is not a tax receipt. Prices are valid until the date stated above.",
  };
}