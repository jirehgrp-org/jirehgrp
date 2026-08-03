// @/lib/proforma-storage.ts

import type { ProformaData } from "./proforma";

const DRAFT_KEY = "jirehgrp:proforma-draft";
const HISTORY_KEY = "jirehgrp:proforma-history";
const MAX_HISTORY = 25;

export type HistoryEntry = {
  invoiceNumber: string;
  clientName: string;
  total: number;
  currency: string;
  savedAt: string;
  data: ProformaData;
};

export function loadDraft(): ProformaData | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ProformaData;
  } catch {
    window.localStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

export function saveDraft(data: ProformaData): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch (error) {
    // Quota exceeded — old history is the safest thing to drop.
    console.warn("Could not save draft, trimming history:", error);
    window.localStorage.removeItem(HISTORY_KEY);
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    window.localStorage.removeItem(HISTORY_KEY);
    return [];
  }
}

/** Called after a PDF is generated so past invoices can be reopened. */
export function pushHistory(entry: HistoryEntry): HistoryEntry[] {
  const existing = loadHistory().filter(
    (item) => item.invoiceNumber !== entry.invoiceNumber,
  );

  const next = [entry, ...existing].slice(0, MAX_HISTORY);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));

  return next;
}

export function removeHistory(invoiceNumber: string): HistoryEntry[] {
  const next = loadHistory().filter(
    (item) => item.invoiceNumber !== invoiceNumber,
  );

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}