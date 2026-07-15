/* eslint-disable react-hooks/set-state-in-effect */
// @/components/StartProjectForm.tsx

"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronDown,
  Clock3,
  FileText,
  LoaderCircle,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import styles from "@/components/StartProjectForm.module.css";

type FormState = {
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
  audience: string;
  platforms: string[];
  existingSystem: string;
  mustHaveFeatures: string;
  integrations: string;
  dataMigration: string;
  authentication: string;
  adminDashboard: string;
  designStatus: string;
  languages: string;
  relevantLinks: string;
  targetLaunch: string;
  timelineFlexibility: string;
  budget: string;
  decisionMaker: string;
  stakeholders: string;
  supportPlan: string;
  preferredContact: string;
  discoverySource: string;
  anythingElse: string;
  consent: boolean;
  websiteTrap: string;
  successMetrics: string;
  expectedScale: string;
  securityRequirements: string;
  budgetStatus: string;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  workEmail: "",
  phone: "",
  role: "",
  company: "",
  website: "",
  location: "",
  projectTypes: [],
  projectStage: "",
  projectSummary: "",
  businessProblem: "",
  audience: "",
  platforms: [],
  existingSystem: "",
  mustHaveFeatures: "",
  integrations: "",
  dataMigration: "",
  authentication: "",
  adminDashboard: "",
  designStatus: "",
  languages: "",
  relevantLinks: "",
  targetLaunch: "",
  timelineFlexibility: "",
  budget: "",
  decisionMaker: "",
  stakeholders: "",
  supportPlan: "",
  preferredContact: "",
  discoverySource: "",
  anythingElse: "",
  consent: false,
  websiteTrap: "",
  successMetrics: "",
  expectedScale: "",
  securityRequirements: "",
  budgetStatus: "",
};

const STEPS = [
  {
    eyebrow: "01 / Your organisation",
    title: "Who are we building with?",
    description:
      "Start with the people, company, and context behind the project.",
  },
  {
    eyebrow: "02 / The opportunity",
    title: "What needs to change?",
    description:
      "Help us understand the problem, the users, and what success should look like.",
  },
  {
    eyebrow: "03 / Product & scope",
    title: "What should the system do?",
    description:
      "Outline the core functionality, integrations, data, and experience requirements.",
  },
  {
    eyebrow: "04 / Delivery",
    title: "How should we approach it?",
    description:
      "Share the timing, investment range, decision process, and long-term needs.",
  },
  {
    eyebrow: "05 / Review",
    title: "One last look.",
    description: "Confirm the brief before it reaches the Jireh Group team.",
  },
] as const;

const PROJECT_TYPES = [
  "Business management system / ERP",
  "Internal platform or dashboard",
  "Custom web application",
  "Mobile application",
  "Corporate or product website",
  "POS / inventory / operations software",
  "Automation and integrations",
  "Cloud, deployment, or infrastructure",
  "Cybersecurity or technical consulting",
  "Not sure yet",
];

const PLATFORMS = [
  "Web",
  "iOS",
  "Android",
  "Desktop",
  "Tablet / POS device",
  "API / backend only",
  "Multiple platforms",
  "Not sure yet",
];

const STORAGE_KEY = "jireh-start-project-draft-v1";

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  hint,
  autoComplete,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (name: keyof FormState, value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label}
        {required && <i>Required</i>}
      </span>
      <input
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        type={type}
        required={required}
        autoComplete={autoComplete}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  hint,
  rows = 5,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (name: keyof FormState, value: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label}
        {required && <i>Required</i>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
      <span className={styles.fieldFoot}>
        {hint ? <small>{hint}</small> : <span />}
        <small>{value.length.toLocaleString()} characters</small>
      </span>
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  hint,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (name: keyof FormState, value: string) => void;
  options: string[];
  required?: boolean;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        controlRef.current &&
        !controlRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const selectOption = (option: string) => {
    onChange(name, option);
    setOpen(false);
  };

  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>
        {label}
        {required && <i>Required</i>}
      </span>

      <div
        ref={controlRef}
        className={`${styles.selectControl} ${
          open ? styles.selectControlOpen : ""
        }`}
      >
        <button
          type="button"
          className={`${styles.selectTrigger} ${
            value ? styles.selectTriggerSelected : ""
          }`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{value || "Select an option"}</span>

          <ChevronDown
            size={18}
            className={open ? styles.selectChevronOpen : ""}
          />
        </button>

        {open && (
          <div className={styles.selectMenu} role="listbox">
            {options.map((option) => {
              const selected = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`${styles.selectOption} ${
                    selected ? styles.selectOptionActive : ""
                  }`}
                  onClick={() => selectOption(option)}
                >
                  <span>{option}</span>

                  <span className={styles.selectOptionIndicator}>
                    {selected && <Check size={14} />}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <input type="hidden" name={String(name)} value={value} />
      </div>

      {hint && <small>{hint}</small>}
    </div>
  );
}

function ChoiceGrid({
  label,
  values,
  selected,
  onToggle,
  required = false,
  hint,
}: {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.fieldLabel}>
        {label}
        {required && <i>Required</i>}
      </legend>
      {hint && <p className={styles.fieldHint}>{hint}</p>}
      <div className={styles.choiceGrid}>
        {values.map((value) => {
          const active = selected.includes(value);
          return (
            <button
              className={`${styles.choiceCard} ${active ? styles.choiceCardActive : ""}`}
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(value)}
            >
              <span>
                {active ? (
                  <Check size={16} />
                ) : (
                  <span className={styles.choiceBox} />
                )}
              </span>
              {value}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function RadioCards({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
  hint,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  options: string[];
  onChange: (name: keyof FormState, value: string) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.fieldLabel}>
        {label}
        {required && <i>Required</i>}
      </legend>
      {hint && <p className={styles.fieldHint}>{hint}</p>}
      <div className={styles.radioGrid}>
        {options.map((option) => {
          const active = value === option;
          return (
            <label
              className={`${styles.radioCard} ${active ? styles.radioCardActive : ""}`}
              key={option}
            >
              <input
                type="radio"
                name={String(name)}
                value={option}
                checked={active}
                onChange={() => onChange(name, option)}
              />
              <span className={styles.radioDot}>{active && <i />}</span>
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ReviewRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.reviewRow}>
      <span>{label}</span>
      <div>{children || <em>Not provided</em>}</div>
    </div>
  );
}

export default function StartProjectForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<FormState>;
        setForm((current) => ({ ...current, ...parsed, websiteTrap: "" }));
        setRestored(true);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (submitted) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form, submitted]);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const update = (name: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const toggleArray = (name: "projectTypes" | "platforms", value: string) => {
    setForm((current) => ({
      ...current,
      [name]: current[name].includes(value)
        ? current[name].filter((item) => item !== value)
        : [...current[name], value],
    }));
    setError("");
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 0) {
      if (
        !form.fullName.trim() ||
        !form.workEmail.trim() ||
        !form.company.trim()
      ) {
        return "Please provide your name, work email, and company.";
      }
      if (!/^\S+@\S+\.\S+$/.test(form.workEmail)) {
        return "Please enter a valid email address.";
      }
    }

    if (currentStep === 1) {
      if (
        form.projectTypes.length === 0 ||
        !form.projectStage ||
        !form.projectSummary.trim() ||
        !form.businessProblem.trim() ||
        !form.successMetrics.trim()
      ) {
        return "Please complete the required project overview questions.";
      }
    }

    if (currentStep === 2) {
      if (!form.mustHaveFeatures.trim()) {
        return "Please describe the must-have capabilities for the project.";
      }
    }

    if (currentStep === 3) {
      if (
        !form.targetLaunch ||
        !form.budget ||
        !form.budgetStatus ||
        !form.decisionMaker ||
        !form.supportPlan ||
        !form.preferredContact
      ) {
        return "Please complete the required delivery and engagement questions.";
      }
    }

    if (currentStep === 4 && !form.consent) {
      return "Please confirm that Jireh Group may contact you about this project.";
    }

    return "";
  };

  const nextStep = () => {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }

    setStep((current) => Math.min(current + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearDraft = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setForm(INITIAL_FORM);
    setStep(0);
    setError("");
    setRestored(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validateStep(4);
    if (message) {
      setError(message);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submissionLanguage: "en" }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message || "The project brief could not be sent.",
        );
      }

      sessionStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className={styles.successPage}>
        <div className={styles.successGrid} aria-hidden="true" />
        <Link className={styles.logo} href="/">
          <span>J</span>
          <strong>
            JIREH <small>GROUP</small>
          </strong>
        </Link>

        <section className={styles.successCard}>
          <span className={styles.successIcon}>
            <CheckCircle2 size={34} />
          </span>
          <p>Project brief received</p>
          <h1>
            THE CONVERSATION
            <br />
            STARTS HERE.
          </h1>
          <p className={styles.successCopy}>
            Thank you, {form.fullName.split(" ")[0]}. We have received the brief for{" "}
            {form.company}. A member of the Jireh Group team will review it and
            respond using your preferred contact method.
          </p>
          <div className={styles.successMeta}>
            <span>
              <Clock3 size={16} /> Typical response: 1–2 business days
            </span>
            <span>
              <Mail size={16} /> Project contact: {form.workEmail}
            </span>
          </div>
          <Link className={styles.primaryButton} href="/">
            Return to the website <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <span>J</span>
          <strong>
            JIREH <small>GROUP</small>
          </strong>
        </Link>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={16} /> Back to website
        </Link>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <span className={styles.kicker}>
              Project intake / 08–12 minutes
            </span>
            <h1>
              LET&apos;S DEFINE
              <br />
              WHAT&apos;S NEXT.
            </h1>
            <p>
              A thoughtful brief helps us understand the operation, identify the
              right system, and make the first conversation more useful.
            </p>
          </div>

          <div className={styles.progressBlock}>
            <div className={styles.progressMeta}>
              <span>Progress</span>
              <strong>
                {String(step + 1).padStart(2, "0")} /{" "}
                {String(STEPS.length).padStart(2, "0")}
              </strong>
            </div>
            <div className={styles.progressTrack}>
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ol className={styles.stepList}>
            {STEPS.map((item, index) => (
              <li
                className={`${index === step ? styles.stepActive : ""} ${index < step ? styles.stepComplete : ""}`}
                key={item.eyebrow}
              >
                <span>
                  {index < step ? (
                    <Check size={13} />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <div>
                  <strong>{item.eyebrow.split(" / ")[1]}</strong>
                  <small>
                    {index === step
                      ? "Current section"
                      : index < step
                        ? "Complete"
                        : "Upcoming"}
                  </small>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.sidebarTrust}>
            <ShieldCheck size={20} />
            <p>
              Your information is used only to evaluate and respond to this
              project inquiry.
            </p>
          </div>
        </aside>

        <section className={styles.formPanel}>
          <div className={styles.formTopline}>
            <span>{STEPS[step].eyebrow}</span>
            {restored && (
              <button type="button" onClick={clearDraft}>
                <RotateCcw size={14} /> Clear saved draft
              </button>
            )}
          </div>

          <div className={styles.formHeading}>
            <h2>{STEPS[step].title}</h2>
            <p>{STEPS[step].description}</p>
          </div>

          <form onSubmit={submit}>
            {step === 0 && (
              <div className={styles.stepContent}>
                <div className={styles.twoColumns}>
                  <InputField
                    label="Full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={update}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                  <InputField
                    label="Work email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={update}
                    placeholder="you@company.com"
                    type="email"
                    required
                    autoComplete="email"
                  />
                  <InputField
                    label="Phone or WhatsApp"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="Country code + number"
                    type="tel"
                    autoComplete="tel"
                  />
                  <InputField
                    label="Your role"
                    name="role"
                    value={form.role}
                    onChange={update}
                    placeholder="Founder, operations lead, product manager…"
                    autoComplete="organization-title"
                  />
                  <InputField
                    label="Company or organisation"
                    name="company"
                    value={form.company}
                    onChange={update}
                    placeholder="Organisation name"
                    required
                    autoComplete="organization"
                  />
                  <InputField
                    label="Website"
                    name="website"
                    value={form.website}
                    onChange={update}
                    placeholder="https://"
                    type="url"
                    autoComplete="url"
                  />
                </div>
                <InputField
                  label="Where is your organisation based?"
                  name="location"
                  value={form.location}
                  onChange={update}
                  placeholder="City, country — and regions the project will serve"
                />
              </div>
            )}

            {step === 1 && (
              <div className={styles.stepContent}>
                <ChoiceGrid
                  label="What kind of project are you considering?"
                  values={PROJECT_TYPES}
                  selected={form.projectTypes}
                  onToggle={(value) => toggleArray("projectTypes", value)}
                  required
                  hint="Select every category that may be relevant."
                />

                <RadioCards
                  label="What stage is the project currently in?"
                  name="projectStage"
                  value={form.projectStage}
                  onChange={update}
                  options={[
                    "Exploring the idea",
                    "Requirements are being defined",
                    "Design or prototype exists",
                    "An existing system needs replacement",
                    "Development has already started",
                    "Live product needs improvement",
                  ]}
                  required
                />

                <TextareaField
                  label="Describe the project in your own words"
                  name="projectSummary"
                  value={form.projectSummary}
                  onChange={update}
                  placeholder="What are you hoping to create, replace, improve, or connect?"
                  required
                  rows={6}
                />

                <TextareaField
                  label="What business problem is driving this project?"
                  name="businessProblem"
                  value={form.businessProblem}
                  onChange={update}
                  placeholder="Explain the friction, lost time, missed visibility, customer problem, or growth constraint behind the request."
                  required
                  rows={6}
                />

                <TextareaField
                  label="How will you know the project is successful?"
                  name="successMetrics"
                  value={form.successMetrics}
                  onChange={update}
                  placeholder="Examples: reduce reconciliation time, remove manual reporting, improve conversion, support more branches, or reduce operational errors."
                  required
                  rows={5}
                  hint="Specific outcomes help us prioritise the right first release."
                />

                <TextareaField
                  label="Who will use the system?"
                  name="audience"
                  value={form.audience}
                  onChange={update}
                  placeholder="Customers, cashiers, managers, field teams, administrators, partners, executives…"
                  rows={4}
                />

                <SelectField
                  label="What scale should the first version support?"
                  name="expectedScale"
                  value={form.expectedScale}
                  onChange={update}
                  options={[
                    "Fewer than 25 internal users",
                    "25–100 internal users",
                    "100–500 internal users",
                    "500–5,000 users",
                    "More than 5,000 users",
                    "Public or customer-facing product",
                    "Scale is currently unknown",
                  ]}
                />

                <ChoiceGrid
                  label="Which platforms may be required?"
                  values={PLATFORMS}
                  selected={form.platforms}
                  onToggle={(value) => toggleArray("platforms", value)}
                />

                <TextareaField
                  label="Is there an existing system or workflow?"
                  name="existingSystem"
                  value={form.existingSystem}
                  onChange={update}
                  placeholder="Tell us about current software, spreadsheets, paper processes, vendors, or anything that must be replaced or preserved."
                  rows={4}
                />
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <TextareaField
                  label="What capabilities are absolutely essential?"
                  name="mustHaveFeatures"
                  value={form.mustHaveFeatures}
                  onChange={update}
                  placeholder="List the workflows, screens, permissions, reports, automations, or customer actions the first release must support."
                  required
                  rows={7}
                  hint="Focus on outcomes and workflows. We will help translate them into features."
                />

                <TextareaField
                  label="What systems or services must connect to it?"
                  name="integrations"
                  value={form.integrations}
                  onChange={update}
                  placeholder="Payments, accounting, SMS, email, maps, existing databases, ERP tools, APIs, identity providers…"
                  rows={5}
                />

                <TextareaField
                  label="Are there security, compliance, or data requirements?"
                  name="securityRequirements"
                  value={form.securityRequirements}
                  onChange={update}
                  placeholder="Audit logs, approval history, encryption, SSO, backups, data residency, financial controls, healthcare requirements, or internal security policies."
                  rows={5}
                  hint="Leave this blank when there are no known special requirements."
                />


                <div className={styles.twoColumns}>
                  <SelectField
                    label="Will existing data need to be migrated?"
                    name="dataMigration"
                    value={form.dataMigration}
                    onChange={update}
                    options={["Yes", "No", "Possibly", "Not sure"]}
                  />
                  <SelectField
                    label="Will users need accounts or role-based access?"
                    name="authentication"
                    value={form.authentication}
                    onChange={update}
                    options={["Yes", "No", "Possibly", "Not sure"]}
                  />
                  <SelectField
                    label="Will the team need an admin dashboard?"
                    name="adminDashboard"
                    value={form.adminDashboard}
                    onChange={update}
                    options={["Yes", "No", "Possibly", "Not sure"]}
                  />
                  <SelectField
                    label="What design work already exists?"
                    name="designStatus"
                    value={form.designStatus}
                    onChange={update}
                    options={[
                      "No design yet",
                      "Brand identity only",
                      "Wireframes or rough sketches",
                      "High-fidelity UI designs",
                      "Existing product to improve",
                      "Not sure",
                    ]}
                  />
                </div>

                <InputField
                  label="Languages or localisation requirements"
                  name="languages"
                  value={form.languages}
                  onChange={update}
                  placeholder="English, Amharic, Afaan Oromo, French…"
                />

                <TextareaField
                  label="Relevant links"
                  name="relevantLinks"
                  value={form.relevantLinks}
                  onChange={update}
                  placeholder="Share links to Figma, existing products, documents, references, competitors, or cloud folders."
                  rows={4}
                />
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <section className={styles.budgetSection}>
                  <div className={styles.budgetSectionHeader}>
                    <div>
                      <span>Project investment</span>
                      <h3>Let&apos;s shape the right approach.</h3>
                    </div>

                    <p>
                      A realistic range helps us recommend the correct scope,
                      team, architecture, and delivery model. It does not lock
                      you into a final price.
                    </p>
                  </div>

                  <div className={styles.twoColumns}>
                    <SelectField
                      label="Approximate budget — ETB"
                      name="budget"
                      value={form.budget}
                      onChange={update}
                      options={[
                        "Under 250,000 ETB",
                        "250,000–500,000 ETB",
                        "500,000–1,000,000 ETB",
                        "1,000,000–2,500,000 ETB",
                        "2,500,000–5,000,000 ETB",
                        "5,000,000–10,000,000 ETB",
                        "10,000,000 ETB+",
                        "Need help defining the budget",
                      ]}
                      required
                    />

                    <SelectField
                      label="What is the current budget status?"
                      name="budgetStatus"
                      value={form.budgetStatus}
                      onChange={update}
                      options={[
                        "Budget is approved",
                        "Budget is provisionally approved",
                        "Approval is currently in progress",
                        "We are comparing estimates",
                        "We are still exploring feasibility",
                        "Not sure yet",
                      ]}
                      required
                    />
                  </div>
                </section>

                <div className={styles.twoColumns}>
                  <SelectField
                    label="When would you ideally like to launch?"
                    name="targetLaunch"
                    value={form.targetLaunch}
                    onChange={update}
                    options={[
                      "As soon as responsibly possible",
                      "Within 1–2 months",
                      "Within 3–4 months",
                      "Within 5–6 months",
                      "More than 6 months",
                      "No fixed date yet",
                    ]}
                    required
                  />
                  <SelectField
                    label="How flexible is the timeline?"
                    name="timelineFlexibility"
                    value={form.timelineFlexibility}
                    onChange={update}
                    options={[
                      "Launch date is fixed",
                      "Some flexibility",
                      "Very flexible",
                      "We need help planning it",
                    ]}
                  />
                  <SelectField
                    label="What is your role in the decision?"
                    name="decisionMaker"
                    value={form.decisionMaker}
                    onChange={update}
                    options={[
                      "I am the final decision-maker",
                      "I lead the evaluation and recommendation",
                      "I am part of the decision team",
                      "I am gathering options for someone else",
                    ]}
                    required
                  />
                  <SelectField
                    label="What happens after launch?"
                    name="supportPlan"
                    value={form.supportPlan}
                    onChange={update}
                    options={[
                      "Ongoing support and continuous improvement",
                      "Maintenance and security support",
                      "Training and handover to our internal team",
                      "Launch support only",
                      "Not sure yet",
                    ]}
                    required
                  />
                  <SelectField
                    label="Preferred first contact"
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={update}
                    options={[
                      "Email",
                      "Phone call",
                      "WhatsApp",
                      "Video meeting",
                    ]}
                    required
                  />
                </div>

                <TextareaField
                  label="Who else will be involved?"
                  name="stakeholders"
                  value={form.stakeholders}
                  onChange={update}
                  placeholder="Owners, operations leaders, finance, IT, users, procurement, external partners…"
                  rows={4}
                />

                <InputField
                  label="How did you hear about Jireh Group?"
                  name="discoverySource"
                  value={form.discoverySource}
                  onChange={update}
                  placeholder="Referral, search, social media, existing client, event…"
                />

                <TextareaField
                  label="Anything else we should understand before speaking?"
                  name="anythingElse"
                  value={form.anythingElse}
                  onChange={update}
                  placeholder="Constraints, sensitivities, procurement requirements, technical concerns, or important context."
                  rows={5}
                />
              </div>
            )}

            {step === 4 && (
              <div className={styles.stepContent}>
                <div className={styles.reviewIntro}>
                  <span>
                    <FileText size={20} />
                  </span>
                  <div>
                    <strong>Project brief for {form.company}</strong>
                    <p>
                      Use the edit buttons to return to a section before
                      submitting.
                    </p>
                  </div>
                </div>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>Organisation</h3>
                    <button type="button" onClick={() => setStep(0)}>
                      Edit
                    </button>
                  </div>
                  <ReviewRow label="Contact">
                    {form.fullName} · {form.workEmail}
                  </ReviewRow>
                  <ReviewRow label="Company">{form.company}</ReviewRow>
                  <ReviewRow label="Role / location">
                    {[form.role, form.location].filter(Boolean).join(" · ")}
                  </ReviewRow>
                </section>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>Opportunity</h3>
                    <button type="button" onClick={() => setStep(1)}>
                      Edit
                    </button>
                  </div>
                  <ReviewRow label="Project type">
                    {form.projectTypes.join(", ")}
                  </ReviewRow>
                  <ReviewRow label="Stage">{form.projectStage}</ReviewRow>
                  <ReviewRow label="Project">{form.projectSummary}</ReviewRow>
                  <ReviewRow label="Business problem">
                    {form.businessProblem}
                  </ReviewRow>
                  <ReviewRow label="Success measures">
                    {form.successMetrics}
                  </ReviewRow>
                  <ReviewRow label="Expected scale">
                    {form.expectedScale}
                  </ReviewRow>
                </section>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>Scope</h3>
                    <button type="button" onClick={() => setStep(2)}>
                      Edit
                    </button>
                  </div>
                  <ReviewRow label="Platforms">
                    {form.platforms.join(", ")}
                  </ReviewRow>
                  <ReviewRow label="Must-have capabilities">
                    {form.mustHaveFeatures}
                  </ReviewRow>
                  <ReviewRow label="Integrations">
                    {form.integrations}
                  </ReviewRow>
                  <ReviewRow label="Security requirements">
                    {form.securityRequirements}
                  </ReviewRow>
                  <ReviewRow label="Design status">
                    {form.designStatus}
                  </ReviewRow>
                </section>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>Delivery</h3>
                    <button type="button" onClick={() => setStep(3)}>
                      Edit
                    </button>
                  </div>
                  <ReviewRow label="Target launch">
                    {form.targetLaunch}
                  </ReviewRow>
                  <ReviewRow label="Investment">
                    {[form.budget, form.budgetStatus]
                      .filter(Boolean)
                      .join(" · ")}
                  </ReviewRow>
                  <ReviewRow label="Decision role">
                    {form.decisionMaker}
                  </ReviewRow>
                  <ReviewRow label="Support">{form.supportPlan}</ReviewRow>
                </section>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      update("consent", event.target.checked)
                    }
                  />
                  <span>
                    <Check size={15} />
                  </span>
                  <p>
                    I confirm that the information is accurate and agree that
                    Jireh Group may contact me about this project inquiry.
                  </p>
                </label>

                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.websiteTrap}
                    onChange={(event) =>
                      update("websiteTrap", event.target.value)
                    }
                  />
                </label>
              </div>
            )}

            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.formActions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={previousStep}
                disabled={step === 0 || submitting}
              >
                <ChevronLeft size={18} /> Previous
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={nextStep}
                >
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  className={styles.primaryButton}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className={styles.spinner} size={18} />{" "}
                      Sending brief
                    </>
                  ) : (
                    <>
                      Send project brief <ArrowRight size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <footer className={styles.formFooter}>
            <span>
              <Sparkles size={14} /> No obligation. Clear, practical next steps.
            </span>
            <a href="mailto:sales@jirehgrp.com">
              Prefer email? sales@jirehgrp.com
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}
