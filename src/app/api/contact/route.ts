// @/app/api/contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---- simple in-memory rate limit (per IP) ----
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_HITS;
}

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

const SERVICE_LABELS: Record<string, string> = {
  website: "Website / Web App",
  mobile: "Mobile App",
  erp: "ERP / Business System",
  lms: "Learning Platform (LMS)",
  custom: "Custom Software",
  support: "Technical Support",
  other: "Other",
};

const PROJECT_TYPES: Record<string, string> = {
  new: "New build",
  rebuild: "Redesign / Rebuild",
  ongoing: "Ongoing support",
  unsure: "Not sure yet",
};

const BUDGETS: Record<string, string> = {
  b1: "Under 50,000 ETB",
  b2: "50,000 – 150,000 ETB",
  b3: "150,000 – 500,000 ETB",
  b4: "500,000+ ETB",
  discuss: "Prefer to discuss",
};

const TIMELINES: Record<string, string> = {
  asap: "As soon as possible",
  "1-3": "1 – 3 months",
  "3-6": "3 – 6 months",
  flexible: "Flexible",
};

function row(label: string, value: string): string {
  return `
    <tr><td style="padding:0 32px 16px 32px;">
      <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:18px;">
        <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:8px;">${label}</div>
        <div style="font-size:16px;color:#f5f1e9;font-weight:600;">${value}</div>
      </div>
    </td></tr>`;
}

type Payload = {
  name: string;
  email: string;
  company: string;
  services: string[];
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  ip: string;
  agent: string;
};

function adminEmail(d: Payload): string {
  const services =
    d.services.map((s) => SERVICE_LABELS[s] ?? s).join(", ") || "—";
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0a09;font-family:Arial,Helvetica,sans-serif;color:#f5f1e9;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0a09;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:760px;background:#100e0c;border:1px solid #26221c;border-radius:20px;overflow:hidden;">
  <tr><td style="padding:36px 32px 24px 32px;border-bottom:1px solid #221e18;">
    <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#e6b257;margin-bottom:16px;">NEW INQUIRY // JIREHGRP.COM</div>
    <div style="font-family:Georgia,serif;font-size:44px;line-height:1.02;font-weight:700;letter-spacing:-1px;color:#f5f1e9;margin:0;">Start the<br>conversation.</div>
  </td></tr>
  ${row("Name", esc(d.name))}
  ${row("Email", esc(d.email))}
  ${d.company ? row("Company", esc(d.company)) : ""}
  ${row("Services needed", esc(services))}
  ${row("Project type", esc(PROJECT_TYPES[d.projectType] ?? "—"))}
  ${row("Budget", esc(BUDGETS[d.budget] ?? "—"))}
  ${row("Timeline", esc(TIMELINES[d.timeline] ?? "—"))}
  <tr><td style="padding:0 32px 28px 32px;">
    <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:20px;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:12px;">Message</div>
      <div style="font-size:15px;line-height:1.8;color:#d8d2c6;">${esc(d.message).replace(/\n/g, "<br>")}</div>
    </div>
  </td></tr>
  <tr><td style="padding:0 32px 32px 32px;">
    <div style="border-top:1px solid #221e18;padding-top:20px;font-size:13px;line-height:1.8;color:#a8a096;">
      <strong style="color:#f5f1e9;">IP:</strong> ${esc(d.ip)}<br>
      <strong style="color:#f5f1e9;">User agent:</strong> ${esc(d.agent)}
    </div>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #221e18;background:#0d0b09;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#8c857a;">
    Jirehgrp <span style="color:#e6b257;">//</span> Addis Ababa &nbsp;·&nbsp; © 2026
  </td></tr>
</table></td></tr></table></body></html>`;
}

function replyEmail(d: Payload): string {
  const services =
    d.services.map((s) => SERVICE_LABELS[s] ?? s).join(", ") || "—";
  return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0a09;font-family:Arial,Helvetica,sans-serif;color:#f5f1e9;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0a09;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:760px;background:#100e0c;border:1px solid #26221c;border-radius:20px;overflow:hidden;">
  <tr><td style="padding:36px 32px;border-bottom:1px solid #221e18;">
    <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#e6b257;margin-bottom:16px;">MESSAGE RECEIVED</div>
    <div style="font-family:Georgia,serif;font-size:44px;line-height:1.02;font-weight:700;letter-spacing:-1px;color:#f5f1e9;margin:0 0 18px 0;">Thanks, ${esc(d.name)}.</div>
    <div style="font-size:15px;line-height:1.8;color:#d8d2c6;">We&rsquo;ve received your inquiry and a member of the Jirehgrp team will get back to you shortly. Here&rsquo;s a copy for your records.</div>
  </td></tr>
  ${row("Services needed", esc(services))}
  ${row("Project type", esc(PROJECT_TYPES[d.projectType] ?? "—"))}
  <tr><td style="padding:0 32px 32px 32px;">
    <div style="background:#15120e;border:1px solid #2a251e;border-radius:14px;padding:20px;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8c857a;margin-bottom:12px;">Your message</div>
      <div style="font-size:15px;line-height:1.8;color:#d8d2c6;">${esc(d.message).replace(/\n/g, "<br>")}</div>
    </div>
  </td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #221e18;background:#0d0b09;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#8c857a;">
    hello@jirehgrp.com &nbsp;·&nbsp; © 2026 JIREHGRP
  </td></tr>
</table></td></tr></table></body></html>`;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { status: "error", message: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request" },
      { status: 400 }
    );
  }

  // Honeypot — bots fill this hidden field
  if (clean(body.company_website, 100) !== "") {
    return NextResponse.json({ status: "success", message: "Message sent" });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const company = clean(body.company, 120);
  const projectType = clean(body.projectType, 30);
  const budget = clean(body.budget, 30);
  const timeline = clean(body.timeline, 30);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  const services = Array.isArray(body.services)
    ? body.services.filter((s): s is string => typeof s === "string").slice(0, 10)
    : [];

  if (!name || !email || !message || services.length === 0) {
    return NextResponse.json(
      { status: "error", message: "Missing required fields" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { status: "error", message: "Invalid email address" },
      { status: 400 }
    );
  }

  // Route to the right inbox
  let to = process.env.MAIL_TO_GENERAL || "hello@jirehgrp.com";
  if (services.includes("support") || projectType === "ongoing") {
    to = process.env.MAIL_TO_SUPPORT || to;
  } else if (budget && budget !== "discuss") {
    to = process.env.MAIL_TO_SALES || to;
  }

  const data: Payload = {
    name,
    email,
    company,
    services,
    projectType,
    budget,
    timeline,
    message,
    ip,
    agent: req.headers.get("user-agent") || "unknown",
  };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subjectBits = services.map((s) => SERVICE_LABELS[s] ?? s).join(", ");

    await transporter.sendMail({
      from: process.env.MAIL_FROM || "Jirehgrp <hello@jirehgrp.com>",
      to,
      replyTo: email,
      subject: `[Jirehgrp] New inquiry — ${subjectBits}`,
      html: adminEmail(data),
    });

    // Auto-reply (don't fail the request if this bounces)
    try {
      await transporter.sendMail({
        from: process.env.MAIL_FROM || "Jirehgrp <hello@jirehgrp.com>",
        to: email,
        subject: "We received your message — Jirehgrp",
        html: replyEmail(data),
      });
    } catch (e) {
      console.error("auto-reply failed:", e);
    }

    return NextResponse.json({ status: "success", message: "Message sent" });
  } catch (e) {
    console.error("contact mail failed:", e);
    return NextResponse.json(
      { status: "error", message: "Failed to send message" },
      { status: 500 }
    );
  }
}