// @/components/sections/About.tsx

const capabilities = [
  { k: "01", head: "Focus", body: "ERP / Business Systems / Automation" },
  { k: "02", head: "Build", body: "Internal Tools / Dashboards / Platforms" },
  { k: "03", head: "Approach", body: "Analyze → Design → Build → Support" },
  { k: "04", head: "Standard", body: "Performance / Reliability / Scale" },
  { k: "05", head: "Base", body: "Addis Ababa // Africa & Beyond" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-head" data-reveal>
        <span className="label">About / Jirehgrp</span>
      </div>

      <div className="about-layout">
        <div className="about-main">
          <p className="about-statement" data-split>
            We build systems that solve real operational problems — not software
            that only looks impressive on the surface.
          </p>
          <div className="about-body" data-rise>
            <p data-rise-item>
              Based in Addis Ababa, we work with growing businesses, established
              companies, and ambitious organizations that need more than basic
              tools. From ERP systems and internal platforms to automation,
              dashboards, and digital products, we build around how businesses
              actually operate.
            </p>
            <p data-rise-item>
              Our approach combines business understanding, technical execution,
              and long-term thinking. Every system we deliver is built for
              performance, maintainability, and scale — so it stays useful as
              your operations grow and evolve.
            </p>
          </div>
        </div>

        <div className="capabilities" data-ledger>
          {capabilities.map((c) => (
            <div className="capability" data-ledger-row key={c.k}>
              <span className="capability__bar" data-ledger-bar aria-hidden="true" />
              <span className="capability__k">{c.k}</span>
              <span className="capability__v">
                <b>{c.head}:</b> {c.body}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}