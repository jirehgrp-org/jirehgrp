// @/components/sections/Hero.tsx

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section id="home" className="section hero">
      <span className="hero-eyebrow" data-reveal>
        <span className="dot" />
        <span className="label">Enterprise software · Addis Ababa</span>
      </span>

      <h1
        className="hero-title"
        data-reveal
        style={{ "--i": 1 } as React.CSSProperties}
      >
        We build the <em>enterprise systems</em> that run modern businesses.
      </h1>

      <p
        className="hero-sub"
        data-reveal
        style={{ "--i": 2 } as React.CSSProperties}
      >
        Jirehgrp designs ERP solutions, internal business platforms, and custom
        software that help companies operate better, move faster, and grow with
        confidence.
      </p>

      <div
        className="hero-actions"
        data-reveal
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <a href="#contact" className="btn btn-primary">
          Request a consultation <IconArrowUpRight size={16} stroke={2} />
        </a>
        <Link href="/work" className="btn btn-ghost">
          View our work <IconArrowUpRight size={16} stroke={2} />
        </Link>
        <a href="#solutions" className="btn btn-ghost">
          Explore solutions
        </a>
      </div>

      <div
        className="hero-meta"
        data-reveal
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <span>
          <b>Addis Ababa</b> — Africa &amp; Beyond
        </span>
        <span>
          <b>Enterprise software</b> — Digital transformation
        </span>
      </div>
    </section>
  );
}