// @/components/sections/Contact.tsx

"use client";
import { useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to send message");
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
          : "Request consultation";

  return (
    <section id="contact" className="section">
      <div className="contact-layout">
        <div className="contact-aside" data-reveal>
          <span className="label">Contact / Start a project</span>
          <h2 className="section-title">Let&apos;s build the right system.</h2>
          <p className="section-intro">
            Tell us about your business, your operational challenges, or the
            system you need. We&apos;ll help you identify the right next step.
          </p>

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
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                placeholder="Jane Doe"
                required
                className="form-input"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Your email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              defaultValue="general"
              className="form-select"
            >
              <option value="general">General inquiry</option>
              <option value="sales">Sales / Proposal</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="subject">Project subject</label>
            <input
              id="subject"
              name="subject"
              placeholder="What do you need built?"
              required
              className="form-input"
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your business, current challenges, or the system you want to build..."
              required
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "sending"}
          >
            {buttonLabel} <IconArrowUpRight size={16} stroke={2} />
          </button>
        </form>
      </div>
    </section>
  );
}