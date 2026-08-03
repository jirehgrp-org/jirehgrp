// @/lib/start-project-email-templates.ts

export type Language = "en" | "am";

export type StartProjectEmailPayload = {
  fullName: string;
  workEmail: string;
  phone: string;
  role: string;
  company: string;
  website: string;
  location: string;
  projectTypes: string[];
  projectStage: string;
  projectSummary: string;
  businessProblem: string;
  successMetrics: string;
  audience: string;
  expectedScale: string;
  platforms: string[];
  existingSystem: string;
  mustHaveFeatures: string;
  integrations: string;
  securityRequirements: string;
  dataMigration: string;
  authentication: string;
  adminDashboard: string;
  designStatus: string;
  languages: string;
  relevantLinks: string;
  targetLaunch: string;
  timelineFlexibility: string;
  budget: string;
  budgetStatus: string;
  decisionMaker: string;
  stakeholders: string;
  supportPlan: string;
  preferredContact: string;
  discoverySource: string;
  anythingElse: string;
  consent: boolean;
  submissionLanguage: Language;
};

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided";
  }

  return value || "Not provided";
}

function row(label: string, value: string | string[]): string {
  return `
    <tr>
      <td style="width:180px;padding:14px 16px;border-bottom:1px solid #e7e7e2;color:#6b6d68;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #e7e7e2;color:#151716;font-size:14px;line-height:1.65;white-space:pre-wrap;">
        ${escapeHtml(formatValue(value))}
      </td>
    </tr>`;
}

function cleanHeader(value: string, maxLength = 180): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

export function buildInternalEmail(
  payload: StartProjectEmailPayload,
): EmailTemplate {
  const languageLabel =
    payload.submissionLanguage === "am" ? "Amharic" : "English";

  const subjectPrefix =
    payload.submissionLanguage === "am" ? "[AM] " : "";

  const subject = `${subjectPrefix}New project inquiry — ${cleanHeader(
    payload.company,
  )}`;

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;background:#f3f1e9;color:#151716;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:900px;margin:0 auto;padding:30px 16px;">
    <div style="background:#0a0b0b;padding:28px 30px;color:#f3f1e9;">
      <div style="display:inline-block;background:#b7ff39;color:#0a0b0b;padding:10px 14px;font-size:18px;font-weight:900;">J</div>
      <p style="margin:26px 0 8px;color:#b7ff39;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">
        New project inquiry
      </p>
      <h1 style="margin:0;font-size:34px;line-height:1.05;letter-spacing:-.04em;">
        ${escapeHtml(payload.company)}
      </h1>
      <p style="margin:12px 0 0;color:#a8aba5;font-size:14px;">
        Submitted by ${escapeHtml(payload.fullName)} · Preferred contact:
        ${escapeHtml(payload.preferredContact)}
      </p>
    </div>

    <table role="presentation" style="width:100%;border-collapse:collapse;background:#ffffff;">
      ${row("Submission language", languageLabel)}
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
      Reply directly to this email to contact
      ${escapeHtml(payload.fullName)} at
      ${escapeHtml(payload.workEmail)}.
    </div>
  </div>
</body>
</html>`;

  const text = `New project inquiry

Submission language: ${languageLabel}
Full name: ${formatValue(payload.fullName)}
Work email: ${formatValue(payload.workEmail)}
Phone / WhatsApp: ${formatValue(payload.phone)}
Role: ${formatValue(payload.role)}
Company: ${formatValue(payload.company)}
Website: ${formatValue(payload.website)}
Location: ${formatValue(payload.location)}
Project types: ${formatValue(payload.projectTypes)}
Project stage: ${formatValue(payload.projectStage)}
Project summary: ${formatValue(payload.projectSummary)}
Business problem: ${formatValue(payload.businessProblem)}
Success measures: ${formatValue(payload.successMetrics)}
Users / audience: ${formatValue(payload.audience)}
Expected scale: ${formatValue(payload.expectedScale)}
Platforms: ${formatValue(payload.platforms)}
Existing system: ${formatValue(payload.existingSystem)}
Must-have capabilities: ${formatValue(payload.mustHaveFeatures)}
Integrations: ${formatValue(payload.integrations)}
Security requirements: ${formatValue(payload.securityRequirements)}
Data migration: ${formatValue(payload.dataMigration)}
Authentication: ${formatValue(payload.authentication)}
Admin dashboard: ${formatValue(payload.adminDashboard)}
Design status: ${formatValue(payload.designStatus)}
Languages: ${formatValue(payload.languages)}
Relevant links: ${formatValue(payload.relevantLinks)}
Target launch: ${formatValue(payload.targetLaunch)}
Timeline flexibility: ${formatValue(payload.timelineFlexibility)}
Budget: ${formatValue(payload.budget)}
Budget status: ${formatValue(payload.budgetStatus)}
Decision role: ${formatValue(payload.decisionMaker)}
Stakeholders: ${formatValue(payload.stakeholders)}
Support plan: ${formatValue(payload.supportPlan)}
Preferred contact: ${formatValue(payload.preferredContact)}
Discovery source: ${formatValue(payload.discoverySource)}
Additional context: ${formatValue(payload.anythingElse)}

Reply to ${payload.workEmail} to contact ${payload.fullName}.`;

  return { subject, html, text };
}

export function buildConfirmationEmail(
  payload: StartProjectEmailPayload,
  replyEmail: string,
): EmailTemplate {
  const firstName = payload.fullName.split(/\s+/)[0] || payload.fullName;
  const safeFirstName = escapeHtml(firstName);
  const safeCompany = escapeHtml(payload.company);
  const safePreferredContact = escapeHtml(payload.preferredContact);
  const safeReplyEmail = escapeHtml(replyEmail);

  if (payload.submissionLanguage === "am") {
    return {
      subject: "የፕሮጀክት መረጃዎ ደርሶናል — ጃይረ ግሩፕ",
      text: `ሰላም ${firstName}፣

የ${payload.company} ፕሮጀክት መረጃ በተሳካ ሁኔታ ደርሶናል።

ቡድናችን የላኩትን መረጃ ይመለከታል። ከዚያም በመረጡት የመገናኛ መንገድ (${payload.preferredContact}) ያገኝዎታል።

የተለመደው የምላሽ ጊዜ፦ ከ1–2 የስራ ቀናት።

ተጨማሪ መረጃ ማከል ከፈለጉ ለዚህ ኢሜይል በቀጥታ መልስ መስጠት ይችላሉ።

እናመሰግናለን፣
ጃይረ ግሩፕ
ንግድን የሚያንቀሳቅሱ ስርዓቶች`,
      html: `<!doctype html>
<html lang="am">
<body style="margin:0;padding:0;background:#f3f1e9;color:#151716;font-family:'Entoto','Noto Sans Ethiopic','Abyssinica SIL','Nyala',Arial,sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
    <div style="background:#0a0b0b;color:#f3f1e9;padding:32px;">
      <div style="display:inline-block;background:#b7ff39;color:#0a0b0b;padding:10px 14px;font-size:19px;font-weight:900;">ጃ</div>
      <p style="margin:28px 0 10px;color:#b7ff39;font-size:12px;font-weight:700;">የፕሮጀክት መረጃዎ ደርሶናል</p>
      <h1 style="margin:0;font-size:38px;line-height:1.25;font-weight:800;">ሰላም ${safeFirstName}፣</h1>
      <p style="margin:18px 0 0;color:#c8cbc4;font-size:16px;line-height:1.85;">
        የ<strong style="color:#ffffff;">${safeCompany}</strong> ፕሮጀክት መረጃ በተሳካ ሁኔታ ደርሶናል።
      </p>
    </div>

    <div style="background:#ffffff;padding:32px;border:1px solid #e4e5df;border-top:0;">
      <h2 style="margin:0 0 14px;color:#151716;font-size:21px;">ቀጣዩ ሂደት</h2>
      <p style="margin:0;color:#5f625d;font-size:15px;line-height:1.9;">
        ቡድናችን የላኩትን መረጃ ይመለከታል። ከዚያም በመረጡት
        የመገናኛ መንገድ <strong>${safePreferredContact}</strong> ያገኝዎታል።
      </p>
      <div style="margin:26px 0;padding:18px;background:#f4f6ef;border-left:4px solid #b7ff39;">
        <p style="margin:0;color:#151716;font-size:14px;line-height:1.8;">
          <strong>የተለመደው የምላሽ ጊዜ፦</strong> ከ1–2 የስራ ቀናት።
        </p>
      </div>
      <p style="margin:0;color:#5f625d;font-size:14px;line-height:1.8;">
        ተጨማሪ መረጃ ማከል ከፈለጉ ለዚህ ኢሜይል በቀጥታ መልስ መስጠት ይችላሉ።
      </p>
      <a href="mailto:${safeReplyEmail}" style="display:inline-block;margin-top:24px;padding:14px 18px;background:#b7ff39;color:#0a0b0b;font-size:14px;font-weight:800;text-decoration:none;">
        ተጨማሪ መረጃ ይላኩ
      </a>
    </div>

    <div style="padding:22px 28px;background:#0a0b0b;color:#a8aba5;font-size:12px;line-height:1.7;">
      <strong style="color:#f3f1e9;">ጃይረ ግሩፕ</strong><br />
      ንግድን የሚያንቀሳቅሱ ስርዓቶች<br />
      Addis Ababa, Ethiopia
    </div>
  </div>
</body>
</html>`,
    };
  }

  return {
    subject: "We received your project brief — Jireh Group",
    text: `Hi ${firstName},

We successfully received the project brief for ${payload.company}.

Our team will review the information and contact you through your preferred method (${payload.preferredContact}).

Typical response time: 1–2 business days.

You can reply directly to this email if you need to add any information.

Thank you,
Jireh Group
Systems that move business`,
    html: `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f3f1e9;color:#151716;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
    <div style="background:#0a0b0b;color:#f3f1e9;padding:32px;">
      <div style="display:inline-block;background:#b7ff39;color:#0a0b0b;padding:10px 14px;font-size:19px;font-weight:900;">J</div>
      <p style="margin:28px 0 10px;color:#b7ff39;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">
        Project brief received
      </p>
      <h1 style="margin:0;font-size:38px;line-height:1.15;letter-spacing:-.03em;">Hi ${safeFirstName},</h1>
      <p style="margin:18px 0 0;color:#c8cbc4;font-size:16px;line-height:1.8;">
        We successfully received the project brief for
        <strong style="color:#ffffff;">${safeCompany}</strong>.
      </p>
    </div>

    <div style="background:#ffffff;padding:32px;border:1px solid #e4e5df;border-top:0;">
      <h2 style="margin:0 0 14px;color:#151716;font-size:21px;">What happens next</h2>
      <p style="margin:0;color:#5f625d;font-size:15px;line-height:1.85;">
        Our team will review the information and contact you through your preferred method:
        <strong>${safePreferredContact}</strong>.
      </p>
      <div style="margin:26px 0;padding:18px;background:#f4f6ef;border-left:4px solid #b7ff39;">
        <p style="margin:0;color:#151716;font-size:14px;line-height:1.7;">
          <strong>Typical response time:</strong> 1–2 business days.
        </p>
      </div>
      <p style="margin:0;color:#5f625d;font-size:14px;line-height:1.8;">
        You can reply directly to this email if you need to add documents,
        links, or any other project details.
      </p>
      <a href="mailto:${safeReplyEmail}" style="display:inline-block;margin-top:24px;padding:14px 18px;background:#b7ff39;color:#0a0b0b;font-size:14px;font-weight:800;text-decoration:none;">
        Add more information
      </a>
    </div>

    <div style="padding:22px 28px;background:#0a0b0b;color:#a8aba5;font-size:12px;line-height:1.7;">
      <strong style="color:#f3f1e9;">Jireh Group</strong><br />
      Systems that move business<br />
      Addis Ababa, Ethiopia
    </div>
  </div>
</body>
</html>`,
  };
}