import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type StartProjectPayload = {
  fullName?: string;
  workEmail?: string;
  phone?: string;
  role?: string;
  company?: string;
  website?: string;
  location?: string;
  projectTypes?: string[];
  projectStage?: string;
  projectSummary?: string;
  businessProblem?: string;
  successMetrics?: string;
  audience?: string;
  expectedScale?: string;
  platforms?: string[];
  existingSystem?: string;
  mustHaveFeatures?: string;
  integrations?: string;
  securityRequirements?: string;
  dataMigration?: string;
  authentication?: string;
  adminDashboard?: string;
  designStatus?: string;
  languages?: string;
  relevantLinks?: string;
  targetLaunch?: string;
  timelineFlexibility?: string;
  budget?: string;
  budgetStatus?: string;
  decisionMaker?: string;
  stakeholders?: string;
  supportPlan?: string;
  preferredContact?: string;
  discoverySource?: string;
  anythingElse?: string;
  consent?: boolean;
  websiteTrap?: string;
  submissionLanguage?: "en" | "am";
};

type RateLimitStore = Map<string, number>;

const globalForRateLimit = globalThis as typeof globalThis & {
  jirehStartProjectRateLimit?: RateLimitStore;
};

const rateLimitStore =
  globalForRateLimit.jirehStartProjectRateLimit ?? new Map<string, number>();

globalForRateLimit.jirehStartProjectRateLimit = rateLimitStore;

function clean(value: unknown, maxLength = 5_000): string {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").trim().slice(0, maxLength);
}

function cleanList(value: unknown, maxItems = 20): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => clean(item, 180))
    .filter(Boolean)
    .slice(0, maxItems);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string | string[]): string {
  const formatted = Array.isArray(value) ? value.join(", ") : value;
  return `
    <tr>
      <td style="width:180px;padding:14px 16px;border-bottom:1px solid #e7e7e2;color:#6b6d68;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #e7e7e2;color:#151716;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(formatted || "Not provided")}</td>
    </tr>`;
}

export async function POST(request: NextRequest) {
  const responseText = {
    en: {
      tooLarge: "The submitted project brief is too large.",
      rateLimited: "Please wait a moment before submitting another project brief.",
      invalidBody: "Invalid request body.",
      received: "Project brief received.",
      required: "Please complete every required project question.",
      invalidEmail: "Please enter a valid email address.",
      devReceived: "Project brief received in development mode.",
      notConfigured: "Project email delivery is not configured yet.",
      deliveryFailed: "We could not deliver the project brief. Please try again.",
    },
    am: {
      tooLarge: "የተላከው የፕሮጀክት መረጃ በጣም ትልቅ ነው።",
      rateLimited: "እባክዎ ሌላ መረጃ ከመላክዎ በፊት ጥቂት ጊዜ ይጠብቁ።",
      invalidBody: "የተላከው መረጃ ትክክለኛ አይደለም።",
      received: "የፕሮጀክት መረጃው ደርሶናል።",
      required: "እባክዎ ሁሉንም አስፈላጊ የፕሮጀክት ጥያቄዎች ይሙሉ።",
      invalidEmail: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።",
      devReceived: "የፕሮጀክት መረጃው በdevelopment mode ደርሷል።",
      notConfigured: "የፕሮጀክት ኢሜይል መላኪያው ገና አልተዋቀረም።",
      deliveryFailed: "የፕሮጀክት መረጃውን ማድረስ አልቻልንም። እባክዎ እንደገና ይሞክሩ።",
    },
  } as const;

  let responseLanguage: "en" | "am" = "en";
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 120_000) {
    return NextResponse.json(
      { message: `${responseText[responseLanguage].tooLarge}` },
      { status: 413 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const previousSubmission = rateLimitStore.get(ip) || 0;
  if (now - previousSubmission < 30_000) {
    return NextResponse.json(
      { message: `${responseText[responseLanguage].rateLimited}` },
      { status: 429 },
    );
  }

  let raw: StartProjectPayload;
  try {
    raw = (await request.json()) as StartProjectPayload;
    responseLanguage = raw.submissionLanguage === "am" ? "am" : "en";
  } catch {
    return NextResponse.json({ message: `${responseText[responseLanguage].invalidBody}` }, { status: 400 });
  }

  // Honeypot. Return a fake success so automated submissions do not retry.
  if (clean(raw.websiteTrap, 200)) {
    return NextResponse.json({ message: `${responseText[responseLanguage].received}` });
  }

  const payload = {
    fullName: clean(raw.fullName, 120),
    workEmail: clean(raw.workEmail, 180).toLowerCase(),
    phone: clean(raw.phone, 80),
    role: clean(raw.role, 120),
    company: clean(raw.company, 180),
    website: clean(raw.website, 300),
    location: clean(raw.location, 180),
    projectTypes: cleanList(raw.projectTypes),
    projectStage: clean(raw.projectStage, 180),
    projectSummary: clean(raw.projectSummary, 5_000),
    businessProblem: clean(raw.businessProblem, 5_000),
    successMetrics: clean(raw.successMetrics, 4_000),
    audience: clean(raw.audience, 3_000),
    expectedScale: clean(raw.expectedScale, 180),
    platforms: cleanList(raw.platforms),
    existingSystem: clean(raw.existingSystem, 4_000),
    mustHaveFeatures: clean(raw.mustHaveFeatures, 6_000),
    integrations: clean(raw.integrations, 4_000),
    securityRequirements: clean(raw.securityRequirements, 4_000),
    dataMigration: clean(raw.dataMigration, 80),
    authentication: clean(raw.authentication, 80),
    adminDashboard: clean(raw.adminDashboard, 80),
    designStatus: clean(raw.designStatus, 180),
    languages: clean(raw.languages, 300),
    relevantLinks: clean(raw.relevantLinks, 2_000),
    targetLaunch: clean(raw.targetLaunch, 180),
    timelineFlexibility: clean(raw.timelineFlexibility, 180),
    budget: clean(raw.budget, 180),
    budgetStatus: clean(raw.budgetStatus, 180),
    decisionMaker: clean(raw.decisionMaker, 220),
    stakeholders: clean(raw.stakeholders, 3_000),
    supportPlan: clean(raw.supportPlan, 220),
    preferredContact: clean(raw.preferredContact, 80),
    discoverySource: clean(raw.discoverySource, 300),
    anythingElse: clean(raw.anythingElse, 4_000),
    consent: raw.consent === true,
    submissionLanguage: responseLanguage,
  };

  if (
    !payload.fullName ||
    !payload.workEmail ||
    !payload.company ||
    payload.projectTypes.length === 0 ||
    !payload.projectStage ||
    !payload.projectSummary ||
    !payload.businessProblem ||
    !payload.successMetrics ||
    !payload.mustHaveFeatures ||
    !payload.targetLaunch ||
    !payload.budget ||
    !payload.budgetStatus ||
    !payload.decisionMaker ||
    !payload.supportPlan ||
    !payload.preferredContact ||
    !payload.consent
  ) {
    return NextResponse.json(
      { message: `${responseText[responseLanguage].required}` },
      { status: 422 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.workEmail)) {
    return NextResponse.json(
      { message: `${responseText[responseLanguage].invalidEmail}` },
      { status: 422 },
    );
  }

  rateLimitStore.set(ip, now);

  const html = `
  <!doctype html>
  <html>
    <body style="margin:0;background:#f3f1e9;font-family:Arial,Helvetica,sans-serif;color:#151716;">
      <div style="max-width:900px;margin:0 auto;padding:30px 16px;">
        <div style="background:#0a0b0b;padding:28px 30px;color:#f3f1e9;">
          <div style="display:inline-block;background:#b7ff39;color:#0a0b0b;padding:10px 14px;font-size:18px;font-weight:900;">J</div>
          <p style="margin:26px 0 8px;color:#b7ff39;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">New project inquiry</p>
          <h1 style="margin:0;font-size:34px;line-height:1.05;letter-spacing:-.04em;">${escapeHtml(payload.company)}</h1>
          <p style="margin:12px 0 0;color:#a8aba5;font-size:14px;">Submitted by ${escapeHtml(payload.fullName)} · Preferred contact: ${escapeHtml(payload.preferredContact)}</p>
        </div>

        <table role="presentation" style="width:100%;border-collapse:collapse;background:#ffffff;">
          ${row("Submission language", payload.submissionLanguage === "am" ? "Amharic" : "English")}
          ${row("Full name", payload.fullName)}
          ${row("Work email", payload.workEmail)}
          ${row("Phone / WhatsApp", payload.phone)}
          ${row("Role", payload.role)}
          ${row("Company", payload.company)}
          ${row("Website", payload.website)}
          ${row("Location", payload.location)}
          ${row("Project types", payload.projectTypes)}
          ${row("Project stage", payload.projectStage)}
          ${row("Project summary", payload.projectSummary)}
          ${row("Business problem", payload.businessProblem)}
          ${row("Success measures", payload.successMetrics)}
          ${row("Users / audience", payload.audience)}
          ${row("Expected scale", payload.expectedScale)}
          ${row("Platforms", payload.platforms)}
          ${row("Existing system", payload.existingSystem)}
          ${row("Must-have capabilities", payload.mustHaveFeatures)}
          ${row("Integrations", payload.integrations)}
          ${row("Security requirements", payload.securityRequirements)}
          ${row("Data migration", payload.dataMigration)}
          ${row("Authentication", payload.authentication)}
          ${row("Admin dashboard", payload.adminDashboard)}
          ${row("Design status", payload.designStatus)}
          ${row("Languages", payload.languages)}
          ${row("Relevant links", payload.relevantLinks)}
          ${row("Target launch", payload.targetLaunch)}
          ${row("Timeline flexibility", payload.timelineFlexibility)}
          ${row("Budget", payload.budget)}
          ${row("Budget status", payload.budgetStatus)}
          ${row("Decision role", payload.decisionMaker)}
          ${row("Stakeholders", payload.stakeholders)}
          ${row("Support plan", payload.supportPlan)}
          ${row("Preferred contact", payload.preferredContact)}
          ${row("Discovery source", payload.discoverySource)}
          ${row("Additional context", payload.anythingElse)}
        </table>

        <div style="padding:20px 24px;background:#b7ff39;color:#0a0b0b;font-size:12px;line-height:1.6;">
          Reply directly to this email to contact ${escapeHtml(payload.fullName)} at ${escapeHtml(payload.workEmail)}.
        </div>
      </div>
    </body>
  </html>`;

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "sales@jirehgrp.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Jireh Group <projects@jirehgrp.com>";

  if (!resendApiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[start-project] Development submission", payload);
      return NextResponse.json({
        message: `${responseText[responseLanguage].devReceived}`,
        preview: true,
      });
    }

    return NextResponse.json(
      { message: `${responseText[responseLanguage].notConfigured}` },
      { status: 503 },
    );
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.workEmail,
      subject: `${payload.submissionLanguage === "am" ? "[AM] " : ""}New project inquiry — ${payload.company}`,
      html,
    }),
  });

  if (!emailResponse.ok) {
    const failure = await emailResponse.text();
    console.error("[start-project] Email delivery failed", failure);
    return NextResponse.json(
      { message: `${responseText[responseLanguage].deliveryFailed}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: `${responseText[responseLanguage].received}` });
}
