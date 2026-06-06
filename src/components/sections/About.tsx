// @/components/sections/About.tsx

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-head" data-reveal>
        <span className="label">About / Jirehgrp</span>
      </div>

      <div className="about-layout">
        <div className="about-main" data-reveal>
          <p className="about-statement">
            We build systems that solve real operational problems — not software
            that only looks impressive on the surface.
          </p>
          <div className="about-body">
            <p>
              Based in Addis Ababa, we work with growing businesses, established
              companies, and ambitious organizations that need more than basic
              tools. From ERP systems and internal platforms to automation,
              dashboards, and digital products, we build around how businesses
              actually operate.
            </p>
            <p>
              Our approach combines business understanding, technical execution,
              and long-term thinking. Every system we deliver is built for
              performance, maintainability, and scale — so it stays useful as
              your operations grow and evolve.
            </p>
          </div>
        </div>

        <div
          className="capabilities"
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <div className="capability">
            <span className="capability__k">01</span>
            <span className="capability__v">
              Focus: ERP / Business Systems / Automation
            </span>
          </div>
          <div className="capability">
            <span className="capability__k">02</span>
            <span className="capability__v">
              Build: Internal Tools / Dashboards / Platforms
            </span>
          </div>
          <div className="capability">
            <span className="capability__k">03</span>
            <span className="capability__v">
              Approach: Analyze → Design → Build → Support
            </span>
          </div>
          <div className="capability">
            <span className="capability__k">04</span>
            <span className="capability__v">
              Standard: Performance / Reliability / Scale
            </span>
          </div>
          <div className="capability">
            <span className="capability__k">05</span>
            <span className="capability__v">
              Base: Addis Ababa // Africa &amp; Beyond
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}