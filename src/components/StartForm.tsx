// @/components/StartForm.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconCheck,
  IconWorldWww,
  IconDeviceMobile,
  IconDatabase,
  IconCertificate,
  IconCode,
  IconHeadset,
  IconDots,
} from "@tabler/icons-react";

type Status = "idle" | "sending" | "sent" | "error";

const SERVICES = [
  { id: "website", label: "Website / Web App", icon: IconWorldWww, note: "From 30,000 ETB" },
  { id: "mobile", label: "Mobile App", icon: IconDeviceMobile, note: "From 65,000 ETB" },
  { id: "erp", label: "ERP / Business System", icon: IconDatabase, note: "From 70,000 ETB" },
  { id: "lms", label: "Learning Platform (LMS)", icon: IconCertificate, note: "Custom quote" },
  { id: "custom", label: "Custom Software", icon: IconCode, note: "Custom quote" },
  { id: "support", label: "Technical Support", icon: IconHeadset, note: "Monthly retainer" },
  { id: "other", label: "Something else", icon: IconDots, note: "Let's talk" },
];

const PROJECT_TYPES = [
  { id: "new", label: "New build" },
  { id: "rebuild", label: "Redesign / Rebuild" },
  { id: "ongoing", label: "Ongoing support" },
  { id: "unsure", label: "Not sure yet" },
];

const BUDGETS = [
  { id: "b1", label: "Under 50,000 ETB" },
  { id: "b2", label: "50,000 – 150,000 ETB" },
  { id: "b3", label: "150,000 – 500,000 ETB" },
  { id: "b4", label: "500,000+ ETB" },
  { id: "discuss", label: "Prefer to discuss" },
];

const TIMELINES = [
  { id: "asap", label: "ASAP" },
  { id: "1-3", label: "1 – 3 months" },
  { id: "3-6", label: "3 – 6 months" },
  { id: "flexible", label: "Flexible" },
];

export default function StartForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [projectType, setProjectType] = useState("new");
  const [budget, setBudget] = useState("discuss");
  const [timeline, setTimeline] = useState("flexible");

  const toggleService = (id: string) =>
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (services.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      services,
      projectType,
      budget,
      timeline,
      message: fd.get("message"),
      company_website: fd.get("company_website"), // honeypot
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Failed");
      }
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // Success screen
  if (status === "sent") {
    return (
      <section className="section start-success">
        <div className="start-success__card" data-reveal>
          <span className="start-success__check">
            <IconCheck size={30} stroke={2.5} />
          </span>
          <h2 className="section-title">Request received.</h2>
          <p className="section-intro" style={{ margin: "16px auto 0" }}>
            Thanks for the detail — it helps a lot. We&apos;ve sent a copy to
            your inbox and a member of the team will be in touch shortly.
          </p>
          <div className="project-links" style={{ justifyContent: "center", marginTop: 30 }}>
            <Link href="/" className="btn btn-primary">
              Back home <IconArrowUpRight size={16} stroke={2} />
            </Link>
            <Link href="/work" className="btn btn-ghost">
              See our work
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section start-form-section">
      <form className="start-form" onSubmit={handleSubmit}>
        {/* honeypot */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        />

        {/* STEP 1 — services */}
        <div className="start-block" data-reveal>
          <div className="start-block__head">
            <span className="start-step">01</span>
            <h2 className="start-block__title">What do you need built?</h2>
            <p className="start-block__hint">Select all that apply.</p>
          </div>
          <div className="service-grid">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const on = services.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`service-pick ${on ? "is-selected" : ""}`}
                  aria-pressed={on}
                  onClick={() => toggleService(s.id)}
                >
                  <span className="service-pick__icon">
                    <Icon size={22} stroke={1.5} />
                  </span>
                  <span className="service-pick__text">
                    <span className="service-pick__label">{s.label}</span>
                    <span className="service-pick__note">{s.note}</span>
                  </span>
                  {on && (
                    <span className="service-pick__check">
                      <IconCheck size={14} stroke={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="start-block__hint" style={{ marginTop: 18 }}>
            Starting prices are estimates — final quotes depend on scope, features,
            and timeline.
          </p>
        </div>

        {/* STEP 2 — type / budget / timeline */}
        <div className="start-block" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <div className="start-block__head">
            <span className="start-step">02</span>
            <h2 className="start-block__title">Scope &amp; budget</h2>
            <p className="start-block__hint">Rough is fine — it just helps us plan.</p>
          </div>

          <div className="field">
            <label>Project type</label>
            <div className="option-row">
              {PROJECT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`option-toggle ${projectType === t.id ? "is-selected" : ""}`}
                  aria-pressed={projectType === t.id}
                  onClick={() => setProjectType(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Budget</label>
            <div className="option-row">
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`option-toggle ${budget === b.id ? "is-selected" : ""}`}
                  aria-pressed={budget === b.id}
                  onClick={() => setBudget(b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Timeline</label>
            <div className="option-row">
              {TIMELINES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`option-toggle ${timeline === t.id ? "is-selected" : ""}`}
                  aria-pressed={timeline === t.id}
                  onClick={() => setTimeline(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 3 — details */}
        <div className="start-block" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <div className="start-block__head">
            <span className="start-step">03</span>
            <h2 className="start-block__title">About you</h2>
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" placeholder="Jane Doe" required className="form-input" />
            </div>
            <div className="field">
              <label htmlFor="email">Your email</label>
              <input id="email" name="email" type="email" placeholder="jane@company.com" required className="form-input" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="company">Company / Organization (optional)</label>
            <input id="company" name="company" placeholder="Company name" className="form-input" />
          </div>

          <div className="field">
            <label htmlFor="message">Tell us about your project</label>
            <textarea
              id="message"
              name="message"
              placeholder="What are you trying to build or solve? Any context, goals, or constraints help."
              required
              className="form-textarea"
            />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="start-submit">
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending"
              ? "Sending..."
              : status === "error"
                ? "Try again"
                : "Submit request"}{" "}
            <IconArrowUpRight size={16} stroke={2} />
          </button>
          <span className="start-submit__note">
            We&apos;ll reply by email. No spam, ever.
          </span>
        </div>
      </form>
    </section>
  );
}