// @/components/sections/About.tsx

export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-text">
          <h2>About Jirehgrp</h2>

          <p>
            Jirehgrp is an enterprise software and digital transformation company
            focused on building systems that solve real operational problems —
            not just software that looks impressive on the surface.
          </p>

          <p>
            Based in Addis Ababa, we work with growing businesses, established
            companies, and ambitious organizations that need more than basic
            tools. From ERP systems and internal business platforms to
            automation, dashboards, and digital products, we build solutions
            around how businesses actually operate.
          </p>

          <p>
            Our approach combines business understanding, technical execution,
            and long-term thinking. Every system we deliver is built for
            performance, maintainability, and scale — so it remains useful as
            your operations grow and evolve.
          </p>
        </div>

        <div className="skills-list">
          <span className="skill-tag">
            01_FOCUS: ERP / BUSINESS SYSTEMS / AUTOMATION
          </span>
          <span className="skill-tag">
            02_BUILD: INTERNAL TOOLS / DASHBOARDS / PLATFORMS
          </span>
          <span className="skill-tag">
            03_APPROACH: ANALYZE → DESIGN → BUILD → SUPPORT
          </span>
          <span className="skill-tag">
            04_STANDARD: PERFORMANCE / RELIABILITY / SCALE
          </span>
          <span className="skill-tag">
            05_BASE: ADDIS ABABA // AFRICA & BEYOND
          </span>
        </div>
      </div>
    </section>
  );
}