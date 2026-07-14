// @/components/sections/Contact.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      services: [fd.get("department") || "other"],
      projectType: "unsure",
      budget: "discuss",
      timeline: "flexible",
      message: fd.get("message"),
      company_website: fd.get("company_website"), // honeypot
    };

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
      form.reset();
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const buttonLabel =
    status === "sending"
      ? "Sending..."
      : status === "sent"
        ? "Message sent ✓"
        : status === "error"
          ? "Try again"
          : "Send message";

  return (
    <section id="contact" className="section">
      <div className="contact-layout">
        <div className="contact-aside" data-reveal>
          <span className="label">Contact / Get in touch</span>
          <h2 className="section-title">Let&apos;s build the right system.</h2>
          <p className="section-intro">
            Have a quick question? Drop us a line. Starting a real project?
            Use our project planner for a faster, more tailored response.
          </p>

          <div className="project-links" style={{ marginTop: 26 }}>
            <Link href="/start" className="btn btn-ghost">
              Plan a project <IconArrowUpRight size={16} stroke={2} />
            </Link>
          </div>

          <div className="contact-channels">
            <a className="contact-channel" href="mailto:hello@jirehgrp.com">
              <span>General</span>
              <small>hello@jirehgrp.com</small>
            </a>
            <a className="contact-channel" href="mailto:sales@jirehgrp.com">
              <span>Sales</span>
              <small>sales@jirehgrp.com</small>
            </a>
            <a className="contact-channel" href="mailto:support@jirehgrp.com">
              <span>Support</span>
              <small>support@jirehgrp.com</small>
            </a>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {/* honeypot */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          />

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
            <label htmlFor="department">Topic</label>
            <select id="department" name="department" defaultValue="other" className="form-select">
              <option value="other">General inquiry</option>
              <option value="website">Website / Web App</option>
              <option value="mobile">Mobile App</option>
              <option value="erp">ERP / Business System</option>
              <option value="support">Technical Support</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="How can we help?"
              required
              className="form-textarea"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {buttonLabel} <IconArrowUpRight size={16} stroke={2} />
          </button>
        </form>
      </div>
    </section>
  );
}