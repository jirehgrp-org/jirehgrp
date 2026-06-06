// @/components/sections/Stats.tsx

const stats = [
  { value: 6, label: "Core solution areas" },
  { value: 6, label: "Industries served" },
  // TODO: set your real figure (years in business / systems delivered)
  { value: 5, suffix: "+", label: "Years building systems" },
  { value: 100, suffix: "%", label: "Built for reliability & scale" },
];

export default function Stats() {
  return (
    <section className="section stats-section">
      <div className="stats" data-reveal>
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div
              className="stat__num"
              data-count={s.value}
              data-suffix={s.suffix ?? ""}
            >
              0
            </div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}