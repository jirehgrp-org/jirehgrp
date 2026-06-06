/* eslint-disable @next/next/no-html-link-for-pages */
// @/app/work/page.tsx

import type { Metadata } from "next";
import { IconCheck, IconArrowUpRight, IconArrowLeft } from "@tabler/icons-react";
import SentinelCursor from "@/components/SentinelCursor";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Selected Projects",
  description:
    "Selected projects by Jirehgrp — mobile apps, platforms, and custom systems we have designed, built, and shipped.",
  alternates: { canonical: `${siteConfig.url}/work` },
};

type Project = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  chips: string[];
  features: string[];
  links: { label: string; href: string; primary?: boolean }[];
};

const projects: Project[] = [
  {
    index: "PROJECT_01",
    name: "Confession.et",
    tagline: "A moderated anonymous social platform.",
    description:
      "A space where people share stories and ask for advice anonymously, organized into categories and kept safe by a serious moderation layer. Built mobile-first for a fast, friendly feed that still holds a real community to account.",
    image: "/work/confession.png",
    imageAlt: "Confession app feed showing anonymous posts by category",
    chips: ["iOS", "Android", "Web", "Social", "Mobile App"],
    features: [
      "Anonymous posts organized by category — Relationships, Campus, Work, Life, Advice",
      "Reactions, comments, sharing and bookmarks",
      "Trending feed and interest-based groups",
      "Built-in moderation: report, block, hide, auto shadow-ban and admin tools",
    ],
    links: [
      { label: "Visit confession.et", href: "https://confession.et", primary: true },
      // TODO: add App Store link if it's live
    ],
  },
  {
    index: "PROJECT_02",
    name: "Dine-in",
    tagline: "Reserve a table in Addis — plus discovery, deals and events.",
    description:
      "A reservation-first dining app for Addis Ababa. Book a table in a few taps, discover restaurants nearby, and keep up with the latest deals and events — all in one warm, editorial interface.",
    image: "/work/dining.png",
    imageAlt: "Dine-in app home screen with special offers and featured restaurants",
    chips: ["iOS", "Android", "Reservations", "Discovery"],
    features: [
      "Table reservations in a few taps, with easy booking management",
      "Restaurant discovery with ratings, distance and featured spots",
      "Special offers and limited-time dining deals",
      "Local dining events and experiences",
      "Personal favorites and saved places",
    ],
    // TODO: confirm stack
    // TODO: add link if it's live
    links: [],
  },
];

export default function WorkPage() {
  return (
    <>
      <SentinelCursor />
      <ScrollReveal />
      <Navbar />

      <main className="site-main">
        <section className="section work-header">
          <span className="label" data-reveal>
            Work / Selected projects
          </span>
          <h1 className="work-title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Proof, <em>not promises.</em>
          </h1>
          <p className="work-intro" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            A look at products we&apos;ve designed, built, and shipped end to
            end — from anonymous social platforms to booking apps and custom
            systems.
          </p>
        </section>

        <section className="section projects">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`project-row ${i % 2 === 1 ? "reverse" : ""}`}
              data-reveal
            >
              <div className="project-stage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
              </div>

              <div className="project-body">
                <span className="project-index">{p.index}</span>
                <h2 className="project-name">{p.name}</h2>
                <p className="project-tagline">{p.tagline}</p>

                <div className="chips">
                  {p.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>

                <p className="project-desc">{p.description}</p>

                <ul className="project-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <IconCheck size={18} stroke={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                {p.links.length > 0 && (
                  <div className="project-links">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${l.primary ? "btn-primary" : "btn-ghost"}`}
                      >
                        {l.label} <IconArrowUpRight size={16} stroke={2} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="section work-cta">
          <h2 data-reveal>Have something to build?</h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            These are a few of the systems we&apos;ve shipped. Tell us what you
            need and we&apos;ll help you scope it.
          </p>
          <div
            className="project-links"
            data-reveal
            style={{ "--i": 2, justifyContent: "center" } as React.CSSProperties}
          >
            <a href="/#contact" className="btn btn-primary">
              Start a project <IconArrowUpRight size={16} stroke={2} />
            </a>
            <a href="/" className="btn btn-ghost">
              <IconArrowLeft size={16} stroke={2} /> Back home
            </a>
          </div>
        </section>
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