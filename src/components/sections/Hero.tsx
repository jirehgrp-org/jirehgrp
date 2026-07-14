// @/components/sections/Hero.tsx

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section id="home" className="section hero">
      <span className="hero-eyebrow" data-hero-fade>
        <span className="dot" />
        <span className="label">Enterprise software · Addis Ababa</span>
      </span>

      <h1 className="hero-title">
        We build the <em>enterprise systems</em> that run modern businesses.
      </h1>

      <p className="hero-sub" data-hero-fade>
        Jirehgrp designs ERP solutions, internal business platforms, and custom
        software that help companies operate better, move faster, and grow with
        confidence.
      </p>

      <div className="hero-actions" data-hero-fade>
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

      <div className="hero-meta" data-hero-fade>
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