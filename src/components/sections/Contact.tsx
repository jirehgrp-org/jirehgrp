// @/components/sections/Contact.tsx

"use client";

import { useState } from "react";

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

  return (
    <section id="contact" className="contact-section">
      <h1 className="hero-title">
        Let’s Build The
        <br />
        Right System.
      </h1>

      <p className="hero-sub">
        Tell us about your business, your operational challenges, or the system
        you need. Whether you are exploring ERP, automation, internal tools, or
        a custom digital platform, we’ll help you identify the right next step.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            name="name"
            placeholder="YOUR NAME"
            required
            className="form-input"
          />

          <input
            name="email"
            type="email"
            placeholder="YOUR EMAIL"
            required
            className="form-input"
          />
        </div>

        <select
          name="department"
          defaultValue="general"
          className="form-input"
          aria-label="Department"
        >
          <option value="general">GENERAL INQUIRY</option>
          <option value="sales">SALES / PROPOSAL</option>
          <option value="support">SUPPORT</option>
        </select>

        <input
          name="subject"
          placeholder="PROJECT SUBJECT / BUSINESS NEED"
          required
          className="form-input"
        />

        <textarea
          name="message"
          placeholder="TELL US ABOUT YOUR BUSINESS, CURRENT CHALLENGES, OR THE SYSTEM YOU WANT TO BUILD..."
          required
          className="form-textarea"
        />

        <button type="submit" className="form-button">
          {status === "sending"
            ? "SENDING..."
            : status === "sent"
              ? "MESSAGE SENT ✓"
              : status === "error"
                ? "TRY AGAIN"
                : "REQUEST CONSULTATION"}
        </button>
      </form>

      <div className="social-grid">
        <a href="mailto:hello@jirehgrp.com" className="social-link">
          HELLO
        </a>
        <a href="mailto:sales@jirehgrp.com" className="social-link">
          SALES
        </a>
        <a href="mailto:support@jirehgrp.com" className="social-link">
          SUPPORT
        </a>
      </div>

      <div className="contact-footer">
        <span>READY_FOR_NEW_PROJECTS // CONSULTATIONS</span>
        <span>© 2026 JIREHGRP</span>
      </div>
    </section>
  );
}