/* eslint-disable react-hooks/set-state-in-effect */
// @/components/StartProjectFormAmharic.tsx

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
    eyebrow: "01 / ድርጅትዎ",
    title: "ከማን ጋር እንገነባለን?",
    description:
      "በፕሮጀክቱ ጀርባ ያሉትን ሰዎች፣ ድርጅቱን እና ዋናውን አውድ በመግለጽ ይጀምሩ።",
  },
  {
    eyebrow: "02 / የፕሮጀክቱ ፍላጎት",
    title: "ምን መለወጥ አለበት?",
    description:
      "ችግሩን፣ ተጠቃሚዎቹን እና ስኬት ምን መምሰል እንዳለበት እንድንረዳ ይርዱን።",
  },
  {
    eyebrow: "03 / ምርት እና የሥራ ወሰን",
    title: "ስርዓቱ ምን ማድረግ አለበት?",
    description:
      "ዋና ተግባራቱን፣ ከሌሎች ስርዓቶች ጋር ያለውን ግንኙነት፣ የዳታ ፍላጎቶችን እና የተጠቃሚ ልምድን ይግለጹ።",
  },
  {
    eyebrow: "04 / አፈጻጸም",
    title: "በምን መንገድ እንሥራው?",
    description:
      "የጊዜ እቅድ፣ የበጀት ክልል፣ የውሳኔ ሂደት እና የረጅም ጊዜ ፍላጎቶችን ያጋሩ።",
  },
  {
    eyebrow: "05 / ግምገማ",
    title: "አንድ የመጨረሻ ምልከታ።",
    description: "መረጃው ወደ Jireh Group ቡድን ከመድረሱ በፊት ያረጋግጡ።",
  },
] as const;

const PROJECT_TYPES = [
  "የንግድ አስተዳደር ሲስተም / ERP",
  "የውስጥ ፕላትፎርም ወይም ዳሽቦርድ",
  "በትእዛዝ የተሰራ የዌብ መተግበሪያ",
  "የሞባይል መተግበሪያ",
  "የኩባንያ ወይም የምርት ድረ ገጽ",
  "POS / ክምችት / ኦፕሬሽን ሶፍትዌር",
  "አውቶሜሽን እና ኢንተግሬሽን",
  "ክላውድ፣ ዲፕሎይመንት ወይም መሠረተ ልማት",
  "ሳይበር ደህንነት ወይም ቴክኒክ ማማከር",
  "እስካሁን እርግጠኛ አይደለንም",
];

const PLATFORMS = [
  "ዌብ",
  "iOS",
  "Android",
  "ዴስክቶፕ",
  "ታብሌት / POS መሣሪያ",
  "API / ባክኤንድ ብቻ",
  "በርካታ ፕላትፎርሞች",
  "እስካሁን እርግጠኛ አይደለንም",
];

const STORAGE_KEY = "jireh-start-project-draft-am-v1";

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
        {required && <i>አስፈላጊ</i>}
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
        {required && <i>አስፈላጊ</i>}
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
        <small>{value.length.toLocaleString("am-ET")} ፊደላት</small>
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
        {required && <i>አስፈላጊ</i>}
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
          <span>{value || "አንድ አማራጭ ይምረጡ"}</span>

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
        {required && <i>አስፈላጊ</i>}
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
        {required && <i>አስፈላጊ</i>}
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
      <div>{children || <em>አልተገለጸም</em>}</div>
    </div>
  );
}

export default function StartProjectFormAmharic() {
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
        return "እባክዎ ሙሉ ስምዎን፣ የሥራ ኢሜይልዎን እና የድርጅትዎን ስም ያስገቡ።";
      }
      if (!/^\S+@\S+\.\S+$/.test(form.workEmail)) {
        return "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።";
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
        return "እባክዎ በፕሮጀክቱ አጠቃላይ መረጃ ክፍል ያሉትን አስፈላጊ ጥያቄዎች ይሙሉ።";
      }
    }

    if (currentStep === 2) {
      if (!form.mustHaveFeatures.trim()) {
        return "እባክዎ ፕሮጀክቱ ሊኖረው የሚገባውን ዋና ተግባር ይግለጹ።";
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
        return "እባክዎ የጊዜ፣ የበጀት እና የትብብር ክፍል ያሉትን አስፈላጊ ጥያቄዎች ይሙሉ።";
      }
    }

    if (currentStep === 4 && !form.consent) {
      return "እባክዎ Jireh Group ስለዚህ ፕሮጀክት ሊያነጋግርዎት እንደሚችል ያረጋግጡ።";
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
        body: JSON.stringify({ ...form, submissionLanguage: "am" }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message || "የፕሮጀክቱን መረጃ መላክ አልተቻለም።",
        );
      }

      sessionStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className={`${styles.successPage} ${styles.amharic}`} data-language="am">
        <div className={styles.successGrid} aria-hidden="true" />
        <Link className={styles.logo} href="/am">
          <span>J</span>
          <strong>
            JIREH <small>GROUP</small>
          </strong>
        </Link>

        <section className={styles.successCard}>
          <span className={styles.successIcon}>
            <CheckCircle2 size={34} />
          </span>
          <p>የፕሮጀክት መረጃው ደርሶናል</p>
          <h1>
            ውይይቱ
            <br />
            ከዚህ ይጀምራል።
          </h1>
          <p className={styles.successCopy}>
            እናመሰግናለን፣ {form.fullName.split(" ")[0]}። ለ{form.company} የላኩትን
            የፕሮጀክት መረጃ ተቀብለናል። የJireh Group ቡድን አባል
            መረጃውን ገምግሞ በመረጡት የመገናኛ መንገድ ይመልስልዎታል።
          </p>
          <div className={styles.successMeta}>
            <span>
              <Clock3 size={16} /> መደበኛ የምላሽ ጊዜ፦ 1–2 የሥራ ቀናት
            </span>
            <span>
              <Mail size={16} /> የፕሮጀክት መገናኛ፦ {form.workEmail}
            </span>
          </div>
          <Link className={styles.primaryButton} href="/am">
            ወደ ድረ ገጹ ተመለስ <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={`${styles.page} ${styles.amharic}`} data-language="am">
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.logo} href="/am">
          <span>J</span>
          <strong>
            JIREH <small>GROUP</small>
          </strong>
        </Link>
        <Link className={styles.backLink} href="/am">
          <ArrowLeft size={16} /> ወደ ድረ ገጹ ተመለስ
        </Link>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <span className={styles.kicker}>
              የፕሮጀክት መረጃ / 08–12 ደቂቃ
            </span>
            <h1>
              ቀጣዩን እርምጃ
              <br />
              አብረን እንወስን።
            </h1>
            <p>
              በጥንቃቄ የተሞላ ይህ መረጃ የሥራ ሂደቱን እንድንረዳ፣
              ትክክለኛውን ሲስተም እንድንለይ እና የመጀመሪያውን ውይይት
              የበለጠ ጠቃሚ እንድናደርግ ይረዳናል።
            </p>
          </div>

          <div className={styles.progressBlock}>
            <div className={styles.progressMeta}>
              <span>ሂደት</span>
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
                      ? "አሁን ያሉበት"
                      : index < step
                        ? "ተጠናቋል"
                        : "ቀጣይ"}
                  </small>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.sidebarTrust}>
            <ShieldCheck size={20} />
            <p>
              የሚያስገቡት መረጃ ይህን የፕሮጀክት ጥያቄ ለመገምገምና
              ምላሽ ለመስጠት ብቻ ይጠቀማል።
            </p>
          </div>
        </aside>

        <section className={styles.formPanel}>
          <div className={styles.formTopline}>
            <span>{STEPS[step].eyebrow}</span>
            {restored && (
              <button type="button" onClick={clearDraft}>
                <RotateCcw size={14} /> የተቀመጠውን ረቂቅ አጥፋ
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
                    label="ሙሉ ስም"
                    name="fullName"
                    value={form.fullName}
                    onChange={update}
                    placeholder="ስምዎ"
                    required
                    autoComplete="name"
                  />
                  <InputField
                    label="የሥራ ኢሜይል"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={update}
                    placeholder="you@company.com"
                    type="email"
                    required
                    autoComplete="email"
                  />
                  <InputField
                    label="ስልክ ወይም WhatsApp"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="የአገር ኮድ + ስልክ ቁጥር"
                    type="tel"
                    autoComplete="tel"
                  />
                  <InputField
                    label="የሥራ ድርሻዎ"
                    name="role"
                    value={form.role}
                    onChange={update}
                    placeholder="መስራች፣ የኦፕሬሽን ኃላፊ፣ የምርት ማኔጀር…"
                    autoComplete="organization-title"
                  />
                  <InputField
                    label="ኩባንያ ወይም ድርጅት"
                    name="company"
                    value={form.company}
                    onChange={update}
                    placeholder="የድርጅቱ ስም"
                    required
                    autoComplete="organization"
                  />
                  <InputField
                    label="ድረ ገጽ"
                    name="website"
                    value={form.website}
                    onChange={update}
                    placeholder="https://"
                    type="url"
                    autoComplete="url"
                  />
                </div>
                <InputField
                  label="ድርጅትዎ የት ይገኛል?"
                  name="location"
                  value={form.location}
                  onChange={update}
                  placeholder="ከተማ፣ አገር — እና ፕሮጀክቱ የሚያገለግላቸው አካባቢዎች"
                />
              </div>
            )}

            {step === 1 && (
              <div className={styles.stepContent}>
                <ChoiceGrid
                  label="ምን ዓይነት ፕሮጀክት እያሰቡ ነው?"
                  values={PROJECT_TYPES}
                  selected={form.projectTypes}
                  onToggle={(value) => toggleArray("projectTypes", value)}
                  required
                  hint="ተገቢ ሊሆኑ የሚችሉትን ሁሉንም ምድቦች ይምረጡ።"
                />

                <RadioCards
                  label="ፕሮጀክቱ አሁን በምን ደረጃ ላይ ነው?"
                  name="projectStage"
                  value={form.projectStage}
                  onChange={update}
                  options={[
                    "ሀሳቡን በመመርመር ላይ",
                    "ፍላጎቶቹ በመወሰን ላይ ናቸው",
                    "ዲዛይን ወይም ፕሮቶታይፕ አለ",
                    "ያለው ሲስተም መተካት ያስፈልገዋል",
                    "የልማት ሥራው ተጀምሯል",
                    "በሥራ ላይ ያለው ምርት ማሻሻያ ይፈልጋል",
                  ]}
                  required
                />

                <TextareaField
                  label="ፕሮጀክቱን በራስዎ ቃላት ይግለጹ"
                  name="projectSummary"
                  value={form.projectSummary}
                  onChange={update}
                  placeholder="ምን ለመፍጠር፣ ለመተካት፣ ለማሻሻል ወይም ለማገናኘት እያሰቡ ነው?"
                  required
                  rows={6}
                />

                <TextareaField
                  label="ይህን ፕሮጀክት እንዲጀመር ያደረገው የንግድ ችግር ምንድን ነው?"
                  name="businessProblem"
                  value={form.businessProblem}
                  onChange={update}
                  placeholder="የሥራ እንቅፋት፣ የጊዜ ብክነት፣ የመረጃ እጥረት፣ የደንበኛ ችግር ወይም የእድገት ገደብ ካለ ይግለጹ።"
                  required
                  rows={6}
                />

                <TextareaField
                  label="ፕሮጀክቱ ስኬታማ መሆኑን እንዴት ይለካሉ?"
                  name="successMetrics"
                  value={form.successMetrics}
                  onChange={update}
                  placeholder="ለምሳሌ፦ የማመሳሰል ጊዜን መቀነስ፣ በእጅ የሚዘጋጅ ሪፖርትን ማስወገድ፣ ሽያጭን ማሻሻል፣ ተጨማሪ ቅርንጫፎችን መደገፍ ወይም የሥራ ስህተቶችን መቀነስ።"
                  required
                  rows={5}
                  hint="ግልጽ ውጤቶች በመጀመሪያው ሪሊዝ ላይ ትክክለኛውን ቅድሚያ እንድንሰጥ ይረዱናል።"
                />

                <TextareaField
                  label="ስርዓቱን ማን ይጠቀማል?"
                  name="audience"
                  value={form.audience}
                  onChange={update}
                  placeholder="ደንበኞች፣ ካሸሮች፣ ማኔጀሮች፣ የመስክ ቡድኖች፣ አስተዳዳሪዎች፣ አጋሮች፣ አመራሮች…"
                  rows={4}
                />

                <SelectField
                  label="የመጀመሪያው ስሪት ምን ያህል ተጠቃሚ መደገፍ አለበት?"
                  name="expectedScale"
                  value={form.expectedScale}
                  onChange={update}
                  options={[
                    "ከ25 በታች የውስጥ ተጠቃሚዎች",
                    "25–100 የውስጥ ተጠቃሚዎች",
                    "100–500 የውስጥ ተጠቃሚዎች",
                    "500–5,000 ተጠቃሚዎች",
                    "ከ5,000 በላይ ተጠቃሚዎች",
                    "ለሕዝብ ወይም ለደንበኞች የሚቀርብ ምርት",
                    "የተጠቃሚው መጠን አሁን አይታወቅም",
                  ]}
                />

                <ChoiceGrid
                  label="የትኞቹ ፕላትፎርሞች ሊያስፈልጉ ይችላሉ?"
                  values={PLATFORMS}
                  selected={form.platforms}
                  onToggle={(value) => toggleArray("platforms", value)}
                />

                <TextareaField
                  label="አሁን ያለ ሲስተም ወይም የሥራ ሂደት አለ?"
                  name="existingSystem"
                  value={form.existingSystem}
                  onChange={update}
                  placeholder="አሁን ስለሚጠቀሙት ሶፍትዌር፣ ስፕሬድሺት፣ የወረቀት ሂደት፣ አቅራቢዎች ወይም መተካት/መጠበቅ ስለሚገባው ነገር ይንገሩን።"
                  rows={4}
                />
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <TextareaField
                  label="የግድ ሊኖሩ የሚገባቸው ተግባራት ምንድን ናቸው?"
                  name="mustHaveFeatures"
                  value={form.mustHaveFeatures}
                  onChange={update}
                  placeholder="የመጀመሪያው ሪሊዝ መደገፍ ያለበትን የሥራ ሂደት፣ ስክሪኖች፣ ፈቃዶች፣ ሪፖርቶች፣ አውቶሜሽኖች ወይም የደንበኛ ተግባራት ይዘርዝሩ።"
                  required
                  rows={7}
                  hint="በውጤቶችና በሥራ ሂደቶች ላይ ያተኩሩ። እኛ ወደ ተግባራዊ ፊቸሮች እንተረጉማቸዋለን።"
                />

                <TextareaField
                  label="ከየትኞቹ ስርዓቶች ወይም አገልግሎቶች ጋር መገናኘት አለበት?"
                  name="integrations"
                  value={form.integrations}
                  onChange={update}
                  placeholder="ክፍያ፣ አካውንቲንግ፣ SMS፣ ኢሜይል፣ ካርታ፣ ያሉ ዳታቤዞች፣ ERP መሣሪያዎች፣ APIs፣ የማንነት አገልግሎቶች…"
                  rows={5}
                />

                <TextareaField
                  label="የደህንነት፣ የሕግ ተገዢነት ወይም የዳታ ፍላጎቶች አሉ?"
                  name="securityRequirements"
                  value={form.securityRequirements}
                  onChange={update}
                  placeholder="የኦዲት መዝገቦች፣ የማጽደቅ ታሪክ፣ ኢንክሪፕሽን፣ SSO፣ ባክአፕ፣ ዳታ የሚቀመጥበት አገር፣ የፋይናንስ ቁጥጥር፣ የጤና ዘርፍ መስፈርቶች ወይም የውስጥ ደህንነት ፖሊሲዎች።"
                  rows={5}
                  hint="ልዩ መስፈርት ከሌለ ባዶ መተው ይችላሉ።"
                />


                <div className={styles.twoColumns}>
                  <SelectField
                    label="ያለውን ዳታ ወደ አዲሱ ሲስተም ማዛወር ያስፈልጋል?"
                    name="dataMigration"
                    value={form.dataMigration}
                    onChange={update}
                    options={["አዎ", "አይ", "ሊሆን ይችላል", "እርግጠኛ አይደለንም"]}
                  />
                  <SelectField
                    label="ተጠቃሚዎች አካውንት ወይም በሚና የተመሰረተ ፈቃድ ያስፈልጋቸዋል?"
                    name="authentication"
                    value={form.authentication}
                    onChange={update}
                    options={["አዎ", "አይ", "ሊሆን ይችላል", "እርግጠኛ አይደለንም"]}
                  />
                  <SelectField
                    label="ቡድኑ የአድሚን ዳሽቦርድ ያስፈልገዋል?"
                    name="adminDashboard"
                    value={form.adminDashboard}
                    onChange={update}
                    options={["አዎ", "አይ", "ሊሆን ይችላል", "እርግጠኛ አይደለንም"]}
                  />
                  <SelectField
                    label="አሁን ምን ዓይነት ዲዛይን አለ?"
                    name="designStatus"
                    value={form.designStatus}
                    onChange={update}
                    options={[
                      "እስካሁን ዲዛይን የለም",
                      "የብራንድ መለያ ብቻ",
                      "ዋየርፍሬም ወይም ቀላል ስኬች",
                      "ዝርዝር የUI ዲዛይኖች",
                      "ማሻሻል የሚፈልግ ያለ ምርት",
                      "እርግጠኛ አይደለንም",
                    ]}
                  />
                </div>

                <InputField
                  label="የቋንቋ ወይም የአካባቢ ማስማማት ፍላጎቶች"
                  name="languages"
                  value={form.languages}
                  onChange={update}
                  placeholder="እንግሊዝኛ፣ አማርኛ፣ Afaan Oromo፣ ፈረንሳይኛ…"
                />

                <TextareaField
                  label="ተዛማጅ ሊንኮች"
                  name="relevantLinks"
                  value={form.relevantLinks}
                  onChange={update}
                  placeholder="የFigma፣ ያሉ ምርቶች፣ ሰነዶች፣ ማጣቀሻዎች፣ ተወዳዳሪዎች ወይም የክላውድ ፎልደሮች ሊንክ ያጋሩ።"
                  rows={4}
                />
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <section className={styles.budgetSection}>
                  <div className={styles.budgetSectionHeader}>
                    <div>
                      <span>የፕሮጀክት በጀት</span>
                      <h3>ትክክለኛውን አቀራረብ አብረን እንወስን።</h3>
                    </div>

                    <p>
                      እውነታዊ የበጀት ክልል ትክክለኛውን የሥራ ወሰን፣ ቡድን፣
                      አርክቴክቸር እና የአፈጻጸም ሞዴል እንድንመክር ይረዳናል።
                      ይህ የመጨረሻ ዋጋ አይደለም።
                    </p>
                  </div>

                  <div className={styles.twoColumns}>
                    <SelectField
                      label="ግምታዊ በጀት — በብር"
                      name="budget"
                      value={form.budget}
                      onChange={update}
                      options={[
                        "ከ250,000 ብር በታች",
                        "250,000–500,000 ብር",
                        "500,000–1,000,000 ብር",
                        "1,000,000–2,500,000 ብር",
                        "2,500,000–5,000,000 ብር",
                        "5,000,000–10,000,000 ብር",
                        "10,000,000 ብር በላይ",
                        "በጀቱን ለመወሰን እገዛ እንፈልጋለን",
                      ]}
                      required
                    />

                    <SelectField
                      label="የበጀቱ የአሁኑ ሁኔታ ምንድን ነው?"
                      name="budgetStatus"
                      value={form.budgetStatus}
                      onChange={update}
                      options={[
                        "በጀቱ ጸድቋል",
                        "በጀቱ በቅድመ ሁኔታ ጸድቋል",
                        "የማጽደቅ ሂደቱ በመካሄድ ላይ ነው",
                        "የዋጋ ግምቶችን እያነጻጸርን ነው",
                        "አሁንም የሚቻል መሆኑን እየመረመርን ነው",
                        "እስካሁን እርግጠኛ አይደለንም",
                      ]}
                      required
                    />
                  </div>
                </section>

                <div className={styles.twoColumns}>
                  <SelectField
                    label="በተመረጠው ሁኔታ መቼ ማስጀመር ይፈልጋሉ?"
                    name="targetLaunch"
                    value={form.targetLaunch}
                    onChange={update}
                    options={[
                      "በተገቢው መንገድ በተቻለ ፍጥነት",
                      "በ1–2 ወራት ውስጥ",
                      "በ3–4 ወራት ውስጥ",
                      "በ5–6 ወራት ውስጥ",
                      "ከ6 ወራት በላይ",
                      "እስካሁን የተወሰነ ቀን የለም",
                    ]}
                    required
                  />
                  <SelectField
                    label="የጊዜ እቅዱ ምን ያህል ተለዋዋጭ ነው?"
                    name="timelineFlexibility"
                    value={form.timelineFlexibility}
                    onChange={update}
                    options={[
                      "የማስጀመሪያው ቀን የተወሰነ ነው",
                      "በመጠኑ ሊለወጥ ይችላል",
                      "በጣም ተለዋዋጭ ነው",
                      "ለማቀድ እገዛ እንፈልጋለን",
                    ]}
                  />
                  <SelectField
                    label="በውሳኔው ሂደት ውስጥ የእርስዎ ድርሻ ምንድን ነው?"
                    name="decisionMaker"
                    value={form.decisionMaker}
                    onChange={update}
                    options={[
                      "የመጨረሻውን ውሳኔ የምሰጠው እኔ ነኝ",
                      "ግምገማውንና ምክረ ሀሳቡን እመራለሁ",
                      "የውሳኔ ቡድኑ አባል ነኝ",
                      "ለሌላ ውሳኔ ሰጪ አማራጮችን እያሰባሰብኩ ነው",
                    ]}
                    required
                  />
                  <SelectField
                    label="ከማስጀመር በኋላ ምን ዓይነት ድጋፍ ያስፈልጋል?"
                    name="supportPlan"
                    value={form.supportPlan}
                    onChange={update}
                    options={[
                      "ቀጣይ ድጋፍ እና ተከታታይ ማሻሻያ",
                      "የጥገና እና የደህንነት ድጋፍ",
                      "ስልጠና እና ለውስጥ ቡድናችን ርክክብ",
                      "በማስጀመሪያ ጊዜ ድጋፍ ብቻ",
                      "እስካሁን እርግጠኛ አይደለንም",
                    ]}
                    required
                  />
                  <SelectField
                    label="በመጀመሪያ እንዴት እንድናነጋግርዎት ይመርጣሉ?"
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={update}
                    options={[
                      "ኢሜይል",
                      "የስልክ ጥሪ",
                      "WhatsApp",
                      "የቪዲዮ ስብሰባ",
                    ]}
                    required
                  />
                </div>

                <TextareaField
                  label="ሌላ ማን ይሳተፋል?"
                  name="stakeholders"
                  value={form.stakeholders}
                  onChange={update}
                  placeholder="ባለቤቶች፣ የኦፕሬሽን ኃላፊዎች፣ ፋይናንስ፣ IT፣ ተጠቃሚዎች፣ ግዥ፣ ውጫዊ አጋሮች…"
                  rows={4}
                />

                <InputField
                  label="ስለ Jireh Group እንዴት ሰሙ?"
                  name="discoverySource"
                  value={form.discoverySource}
                  onChange={update}
                  placeholder="ሪፈራል፣ የድር ፍለጋ፣ ማህበራዊ ሚዲያ፣ ያለ ደንበኛ፣ ዝግጅት…"
                />

                <TextareaField
                  label="ከመነጋገራችን በፊት ማወቅ ያለብን ሌላ ነገር አለ?"
                  name="anythingElse"
                  value={form.anythingElse}
                  onChange={update}
                  placeholder="ገደቦች፣ ልዩ ጥንቃቄዎች፣ የግዥ መስፈርቶች፣ ቴክኒካዊ ስጋቶች ወይም አስፈላጊ አውድ።"
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
                    <strong>የ{form.company} ፕሮጀክት መረጃ</strong>
                    <p>
                      ከመላክዎ በፊት ወደ ማንኛውም ክፍል ለመመለስ
                      “አስተካክል” የሚለውን ቁልፍ ይጠቀሙ።
                    </p>
                  </div>
                </div>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>ድርጅት</h3>
                    <button type="button" onClick={() => setStep(0)}>
                      አስተካክል
                    </button>
                  </div>
                  <ReviewRow label="የመገናኛ መረጃ">
                    {form.fullName} · {form.workEmail}
                  </ReviewRow>
                  <ReviewRow label="ድርጅት">{form.company}</ReviewRow>
                  <ReviewRow label="ድርሻ / አካባቢ">
                    {[form.role, form.location].filter(Boolean).join(" · ")}
                  </ReviewRow>
                </section>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>የፕሮጀክቱ ፍላጎት</h3>
                    <button type="button" onClick={() => setStep(1)}>
                      አስተካክል
                    </button>
                  </div>
                  <ReviewRow label="የፕሮጀክት ዓይነት">
                    {form.projectTypes.join(", ")}
                  </ReviewRow>
                  <ReviewRow label="ደረጃ">{form.projectStage}</ReviewRow>
                  <ReviewRow label="ፕሮጀክት">{form.projectSummary}</ReviewRow>
                  <ReviewRow label="የንግድ ችግር">
                    {form.businessProblem}
                  </ReviewRow>
                  <ReviewRow label="የስኬት መለኪያዎች">
                    {form.successMetrics}
                  </ReviewRow>
                  <ReviewRow label="የሚጠበቀው መጠን">
                    {form.expectedScale}
                  </ReviewRow>
                </section>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>የሥራ ወሰን</h3>
                    <button type="button" onClick={() => setStep(2)}>
                      አስተካክል
                    </button>
                  </div>
                  <ReviewRow label="ፕላትፎርሞች">
                    {form.platforms.join(", ")}
                  </ReviewRow>
                  <ReviewRow label="አስፈላጊ ተግባራት">
                    {form.mustHaveFeatures}
                  </ReviewRow>
                  <ReviewRow label="ኢንተግሬሽኖች">
                    {form.integrations}
                  </ReviewRow>
                  <ReviewRow label="የደህንነት ፍላጎቶች">
                    {form.securityRequirements}
                  </ReviewRow>
                  <ReviewRow label="የዲዛይን ሁኔታ">
                    {form.designStatus}
                  </ReviewRow>
                </section>

                <section className={styles.reviewSection}>
                  <div className={styles.reviewHeading}>
                    <h3>አፈጻጸም</h3>
                    <button type="button" onClick={() => setStep(3)}>
                      አስተካክል
                    </button>
                  </div>
                  <ReviewRow label="የማስጀመሪያ ጊዜ">
                    {form.targetLaunch}
                  </ReviewRow>
                  <ReviewRow label="በጀት">
                    {[form.budget, form.budgetStatus]
                      .filter(Boolean)
                      .join(" · ")}
                  </ReviewRow>
                  <ReviewRow label="በውሳኔው ያለዎት ድርሻ">
                    {form.decisionMaker}
                  </ReviewRow>
                  <ReviewRow label="ድጋፍ">{form.supportPlan}</ReviewRow>
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
                    ያስገባሁት መረጃ ትክክል መሆኑን አረጋግጣለሁ፣ እና Jireh Group
                    ስለዚህ ፕሮጀክት ሊያነጋግረኝ እስማማለሁ።
                  </p>
                </label>

                <label className={styles.honeypot} aria-hidden="true">
                  ድረ ገጽ
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
                <ChevronLeft size={18} /> ወደ ኋላ
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={nextStep}
                >
                  ቀጥል <ArrowRight size={18} />
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
                      መረጃው እየተላከ ነው
                    </>
                  ) : (
                    <>
                      የፕሮጀክት መረጃውን ላክ <ArrowRight size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <footer className={styles.formFooter}>
            <span>
              <Sparkles size={14} /> ምንም ግዴታ የለም። ግልጽና ተግባራዊ ቀጣይ እርምጃዎች።
            </span>
            <a href="mailto:sales@jirehgrp.com">
              በኢሜይል መገናኘት ይመርጣሉ? sales@jirehgrp.com
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}
