// @/components/sections/CTA.tsx

export default function CTA() {
  return (
    <section id="cta" className="contact-section">
      <div className="about-grid">
        <div className="about-text">
          <h2>Have A System In Mind?</h2>

          <p>
            Whether you need ERP, internal tools, workflow automation, or a
            custom digital platform, we can help you define the right solution
            before development begins.
          </p>

          <p>
            We work with businesses that want clarity, scalability, and systems
            built around real operations — not generic software that creates
            more friction later.
          </p>
        </div>

        <div className="skills-list">
          <span className="skill-tag">
            01_DISCUSS: BUSINESS NEEDS / OPERATIONAL CHALLENGES
          </span>
          <span className="skill-tag">
            02_IDENTIFY: ERP / AUTOMATION / PLATFORM OPPORTUNITIES
          </span>
          <span className="skill-tag">
            03_PLAN: RIGHT SYSTEM / RIGHT SCOPE / RIGHT NEXT STEP
          </span>

          <a href="#contact" className="form-button" style={{ textAlign: "center" }}>
            REQUEST CONSULTATION
          </a>
        </div>
      </div>
    </section>
  );
}