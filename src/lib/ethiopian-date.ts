// @/lib/ethiopian-date.ts

const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856;

const EC_MONTHS = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit",
  "Megabit", "Miyazia", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume",
];

function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export type EthiopianDate = {
  year: number;
  month: number;
  day: number;
  monthName: string;
};

export function toEthiopian(date: Date): EthiopianDate {
  const jdn = gregorianToJdn(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  const offset = jdn - JD_EPOCH_OFFSET_AMETE_MIHRET;
  const r = offset % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);

  const year =
    4 * Math.floor(offset / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;

  return { year, month, day, monthName: EC_MONTHS[month - 1] };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** Formats as DD.MM.YYYY to match the Jirehgrp invoice style. */
export function formatGregorian(date: Date): string {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export function formatEthiopian(date: Date): string {
  const ec = toEthiopian(date);
  return `${pad(ec.day)}.${pad(ec.month)}.${ec.year}`;
}