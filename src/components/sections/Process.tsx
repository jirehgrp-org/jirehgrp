// @/components/sections/Process.tsx

const steps = [
  {
    num: "01",
    title: "Analyze",
    text: "We study how your business actually runs — the workflows, bottlenecks, and goals.",
  },
  {
    num: "02",
    title: "Design",
    text: "We architect the right system and scope before a line of code is written.",
  },
  {
    num: "03",
    title: "Build",
    text: "We develop for performance, maintainability, and scale from day one.",
  },
  {
    num: "04",
    title: "Support",
    text: "We stay on to maintain, improve, and evolve the system as you grow.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="section-head" data-reveal>
        <span className="label">Approach / How we work</span>
        <h2 className="section-title">
          A clear path from problem to working system.
        </h2>
      </div>

      <div className="process-grid">
        {steps.map((s, i) => (
          <article
            key={s.num}
            className="step"
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="step__num">{s.num} —</span>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__text">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}