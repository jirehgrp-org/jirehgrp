// @/components/sections/About.tsx

export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-text">
          <h2>What We Do</h2>

          <p>
            Jirehgrp is a software and digital solutions company focused on
            building systems that actually solve business problems — not just
            look good.
          </p>

          <p>
            We work with businesses, startups, and teams that need more than a
            basic website. Whether it’s an internal dashboard, a full ERP system,
            or a scalable web platform, we design and build solutions tailored
            to how your business operates.
          </p>

          <p>
            Our focus is simple: performance, clarity, and long-term usability.
            Every system we build is designed to be maintainable, scalable, and
            aligned with real workflows — not assumptions.
          </p>
        </div>

        <div className="skills-list">
          <span className="skill-tag">
            01_WE_BUILD: WEBSITES / WEB PLATFORMS
          </span>
          <span className="skill-tag">
            02_SYSTEMS: ERP / INTERNAL TOOLS / DASHBOARDS
          </span>
          <span className="skill-tag">
            03_PRODUCTS: MOBILE APPS / SAAS SYSTEMS
          </span>
          <span className="skill-tag">
            04_PROCESS: DESIGN → BUILD → SCALE → MAINTAIN
          </span>
          <span className="skill-tag">
            05_FOCUS: PERFORMANCE / CLARITY / REAL USE
          </span>
        </div>
      </div>
    </section>
  );
}