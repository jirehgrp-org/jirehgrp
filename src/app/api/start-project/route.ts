// @/app/api/start-project/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildConfirmationEmail,
  buildInternalEmail,
  type Language,
  type StartProjectEmailPayload,
} from "@/lib/start-project-email-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  submissionLanguage?: Language;
};

type RateLimitStore = Map<string, number>;

const MAX_BODY_SIZE = 120_000;
const RATE_LIMIT_WINDOW = 30_000;

const RESPONSE_TEXT = {
  en: {
    tooLarge: "The submitted project brief is too large.",
    rateLimited:
      "Please wait a moment before submitting another project brief.",
    invalidBody: "Invalid request body.",
    received: "Project brief received.",
    required: "Please complete every required project question.",
    invalidEmail: "Please enter a valid email address.",
    devReceived: "Project brief received in development mode.",
    notConfigured: "Project email delivery is not configured yet.",
    deliveryFailed:
      "We could not deliver the project brief. Please try again.",
  },
  am: {
    tooLarge: "የተላከው የፕሮጀክት መረጃ በጣም ትልቅ ነው።",
    rateLimited:
      "እባክዎ ሌላ የፕሮጀክት መረጃ ከመላክዎ በፊት ጥቂት ጊዜ ይጠብቁ።",
    invalidBody: "የተላከው መረጃ ትክክለኛ አይደለም።",
    received: "የፕሮጀክት መረጃዎ ደርሶናል።",
    required: "እባክዎ ሁሉንም አስፈላጊ የፕሮጀክት ጥያቄዎች ይሙሉ።",
    invalidEmail: "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።",
    devReceived: "የፕሮጀክት መረጃዎ በdevelopment mode ደርሷል።",
    notConfigured: "የፕሮጀክት ኢሜይል መላኪያው ገና አልተዋቀረም።",
    deliveryFailed:
      "የፕሮጀክት መረጃዎን ማድረስ አልቻልንም። እባክዎ እንደገና ይሞክሩ።",
  },
} as const;

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

function getRequestLanguage(request: NextRequest): Language {
  const explicitLanguage = request.headers
    .get("x-submission-language")
    ?.toLowerCase();

  if (explicitLanguage === "am") return "am";

  const acceptedLanguage = request.headers
    .get("accept-language")
    ?.toLowerCase();

  return acceptedLanguage?.startsWith("am") ? "am" : "en";
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function parseRecipients(value: string): string[] {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function pruneRateLimitStore(now: number): void {
  const expirationTime = RATE_LIMIT_WINDOW * 10;

  for (const [ip, submittedAt] of rateLimitStore.entries()) {
    if (now - submittedAt > expirationTime) {
      rateLimitStore.delete(ip);
    }
  }
}

function sanitizePayload(
  raw: StartProjectPayload,
  language: Language,
): StartProjectEmailPayload {
  return {
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
    submissionLanguage: language,
  };
}

function hasEveryRequiredField(payload: StartProjectEmailPayload): boolean {
  return Boolean(
    payload.fullName &&
      payload.workEmail &&
      payload.company &&
      payload.projectTypes.length > 0 &&
      payload.projectStage &&
      payload.projectSummary &&
      payload.businessProblem &&
      payload.successMetrics &&
      payload.mustHaveFeatures &&
      payload.targetLaunch &&
      payload.budget &&
      payload.budgetStatus &&
      payload.decisionMaker &&
      payload.supportPlan &&
      payload.preferredContact &&
      payload.consent,
  );
}

export async function POST(request: NextRequest) {
  let responseLanguage = getRequestLanguage(request);

  const declaredContentLength = Number(
    request.headers.get("content-length") || 0,
  );

  if (declaredContentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].tooLarge },
      { status: 413 },
    );
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].invalidBody },
      { status: 400 },
    );
  }

  const actualBodySize = new TextEncoder().encode(rawBody).length;

  if (actualBodySize > MAX_BODY_SIZE) {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].tooLarge },
      { status: 413 },
    );
  }

  let raw: StartProjectPayload;

  try {
    raw = JSON.parse(rawBody) as StartProjectPayload;
    responseLanguage = raw.submissionLanguage === "am" ? "am" : "en";
  } catch {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].invalidBody },
      { status: 400 },
    );
  }

  if (clean(raw.websiteTrap, 200)) {
    return NextResponse.json({
      message: RESPONSE_TEXT[responseLanguage].received,
    });
  }

  const ip = getClientIp(request);
  const now = Date.now();

  pruneRateLimitStore(now);

  const previousSubmission = rateLimitStore.get(ip) || 0;

  if (now - previousSubmission < RATE_LIMIT_WINDOW) {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].rateLimited },
      { status: 429 },
    );
  }

  const payload = sanitizePayload(raw, responseLanguage);

  if (!hasEveryRequiredField(payload)) {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].required },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.workEmail)) {
    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].invalidEmail },
      { status: 422 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[start-project] Development submission", payload);

      return NextResponse.json({
        message: RESPONSE_TEXT[responseLanguage].devReceived,
        preview: true,
        confirmationSent: false,
      });
    }

    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].notConfigured },
      { status: 503 },
    );
  }

  const resend = new Resend(resendApiKey);

  const internalRecipients = parseRecipients(
    process.env.CONTACT_TO_EMAIL || "sales@jirehgrp.com",
  );

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    "Jireh Group <projects@jirehgrp.com>";

  const confirmationFromEmail =
    process.env.CONTACT_CONFIRMATION_FROM_EMAIL || fromEmail;

  const replyEmail =
    process.env.CONTACT_REPLY_TO_EMAIL ||
    internalRecipients[0] ||
    "hello@jirehgrp.com";

  rateLimitStore.set(ip, now);

  const internalEmail = buildInternalEmail(payload);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: internalRecipients,
      replyTo: payload.workEmail,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
    });

    if (error) throw new Error(error.message);

    console.info("[start-project] Internal email sent", {
      id: data?.id,
      to: internalRecipients,
    });
  } catch (error) {
    rateLimitStore.delete(ip);

    console.error("[start-project] Internal email delivery failed", error);

    return NextResponse.json(
      { message: RESPONSE_TEXT[responseLanguage].deliveryFailed },
      { status: 502 },
    );
  }

  const confirmationEmail = buildConfirmationEmail(payload, replyEmail);
  let confirmationSent = false;

  try {
    const { data, error } = await resend.emails.send({
      from: confirmationFromEmail,
      to: [payload.workEmail],
      replyTo: replyEmail,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text,
    });

    if (error) throw new Error(error.message);

    confirmationSent = true;

    console.info("[start-project] Confirmation email sent", {
      id: data?.id,
      to: payload.workEmail,
    });
  } catch (error) {
    console.error("[start-project] Customer confirmation email failed", {
      email: payload.workEmail,
      language: payload.submissionLanguage,
      error,
    });
  }

  return NextResponse.json({
    message: RESPONSE_TEXT[responseLanguage].received,
    confirmationSent,
  });
}