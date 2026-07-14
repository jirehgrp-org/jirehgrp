// @/app/start/page.tsx

import type { Metadata } from "next";
import SentinelCursor from "@/components/SentinelCursor";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import StartForm from "@/components/StartForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project — Project Planner",
  description:
    "Tell Jirehgrp what you need built. Pick your services, scope, budget, and timeline and we'll get back to you with the right next step.",
  alternates: { canonical: `${siteConfig.url}/start` },
};

export default function StartPage() {
  return (
    <>
      <SentinelCursor />
      <ScrollReveal />
      <Navbar />

      <main className="site-main">
        <section className="section start-header">
          <span className="label" data-reveal>
            Project planner / Start here
          </span>
          <h1
            className="work-title"
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Let&apos;s scope <em>your project.</em>
          </h1>
          <p
            className="work-intro"
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
          >
            A few quick questions help us understand what you need and respond
            with the right next step — the right team, a realistic plan, and a
            clear path forward. Takes about two minutes.
          </p>
        </section>

        <StartForm />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <span>© 2026 Jirehgrp</span>
          <span>Addis Ababa · Africa &amp; Beyond</span>
          <a href="/#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}