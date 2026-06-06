// @/components/sections/Services.tsx

import {
  IconWorldWww,
  IconDeviceMobile,
  IconDatabase,
  IconCertificate,
  IconCode,
  IconHeadset,
} from "@tabler/icons-react";

const services = [
  {
    num: "01",
    code: "Web",
    icon: IconWorldWww,
    title: "Websites & Web Apps",
    text: "Marketing sites, web platforms, and client portals — fast, modern, and built to convert.",
  },
  {
    num: "02",
    code: "Mobile",
    icon: IconDeviceMobile,
    title: "Mobile Apps",
    text: "iOS and Android apps people actually want to use, from concept to App Store and Play Store.",
  },
  {
    num: "03",
    code: "ERP",
    icon: IconDatabase,
    title: "ERP & Business Systems",
    text: "Custom ERP, internal tools, and dashboards that unify operations and improve visibility.",
  },
  {
    num: "04",
    code: "LMS",
    icon: IconCertificate,
    title: "Learning Platforms (LMS)",
    text: "Course delivery, student management, assessments, and portals for schools and training teams.",
  },
  {
    num: "05",
    code: "Custom",
    icon: IconCode,
    title: "Custom Software",
    text: "Bespoke systems built around problems off-the-shelf software can't solve. If you can define it, we can build it.",
  },
  {
    num: "06",
    code: "Support",
    icon: IconHeadset,
    title: "Technical Support",
    text: "Ongoing maintenance, monitoring, and improvements that keep your systems reliable as you grow.",
  },
];

export default function Services() {
  return (
    <section id="solutions" className="section">
      <div className="section-head" data-reveal>
        <span className="label">Solutions / What we build</span>
        <h2 className="section-title">
          One team for the full range of software you need.
        </h2>
        <p className="section-intro">
          From websites and mobile apps to ERP, learning platforms, and fully
          custom systems — we design, build, and support it end to end.
        </p>
      </div>

      <div className="solutions-grid">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <article
              key={s.code}
              className="solution-card"
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="solution-card__top">
                <span className="solution-card__icon">
                  <Icon size={22} stroke={1.5} />
                </span>
                <span className="solution-card__num">{s.num}</span>
              </div>
              <h3 className="solution-card__title">{s.title}</h3>
              <p className="solution-card__text">{s.text}</p>
              <span className="solution-card__code label">{s.code}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}