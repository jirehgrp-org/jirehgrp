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
        Start The
        <br />
        Conversation.
      </h1>

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

        <input
          name="subject"
          placeholder="PROJECT SUBJECT"
          required
          className="form-input"
        />

        <textarea
          name="message"
          placeholder="TELL US WHAT YOU NEED..."
          required
          className="form-textarea"
        />

        <button type="submit" className="form-button">
          {status === "sending"
            ? "SENDING..."
            : status === "sent"
              ? "SENT ✓"
              : status === "error"
                ? "TRY AGAIN"
                : "SEND MESSAGE"}
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
        <span>READY_FOR_NEW_PROJECTS</span>
        <span>© 2026 JIREHGRP</span>
      </div>
    </section>
  );
}