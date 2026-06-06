// @/components/sections/Industries.tsx

import {
  IconBuildingFactory2,
  IconBuildingStore,
  IconBuildingSkyscraper,
  IconHeartbeat,
  IconSchool,
  IconTruck,
} from "@tabler/icons-react";

const industries = [
  {
    num: "01",
    icon: IconBuildingFactory2,
    title: "Manufacturing & Production",
    text: "Inventory control, production planning, quality tracking, and supply chain operations.",
  },
  {
    num: "02",
    icon: IconBuildingStore,
    title: "Retail & Distribution",
    text: "Point-of-sale, stock management, customer analytics, and multi-location coordination.",
  },
  {
    num: "03",
    icon: IconBuildingSkyscraper,
    title: "Construction & Real Estate",
    text: "Project tracking, resource planning, financial oversight, and client management.",
  },
  {
    num: "04",
    icon: IconHeartbeat,
    title: "Healthcare & Pharma",
    text: "Records, inventory, compliance, billing, and internal process management.",
  },
  {
    num: "05",
    icon: IconSchool,
    title: "Education & Training",
    text: "Student systems, learning platforms, admin tools, and institutional portals.",
  },
  {
    num: "06",
    icon: IconTruck,
    title: "Logistics & Transport",
    text: "Fleet, cargo, routing, and delivery systems for visibility and efficiency.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="section">
      <div className="section-head" data-reveal>
        <span className="label">Industries / Where we work</span>
        <h2 className="section-title">
          Built for the realities of complex operations.
        </h2>
        <p className="section-intro">
          We adapt to each sector&apos;s workflows, constraints, and compliance
          needs — not the other way around.
        </p>
      </div>

      <div className="industry-list">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <article
              key={ind.num}
              className="industry-item"
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="industry-item__index">{ind.num}</span>
              <span className="industry-item__icon">
                <Icon size={26} stroke={1.5} />
              </span>
              <div>
                <h3 className="industry-item__title">{ind.title}</h3>
                <p className="industry-item__text">{ind.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}