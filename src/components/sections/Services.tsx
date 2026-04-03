// @/components/sections/Services.tsx

const services = [
  {
    code: "SOLUTION_01 // ERP",
    stack: "CUSTOM / IMPLEMENTATION",
    title: "ERP\nSolutions",
    text: "Custom ERP systems designed to unify operations, improve visibility, and support business growth.",
  },
  {
    code: "SOLUTION_02 // SYSTEMS",
    stack: "WORKFLOWS / OPERATIONS",
    title: "Business\nSystems",
    text: "Internal tools, dashboards, and operational systems built around your real business processes.",
  },
  {
    code: "SOLUTION_03 // AUTOMATION",
    stack: "INTEGRATIONS / EFFICIENCY",
    title: "Automation &\nIntegrations",
    text: "Reduce manual work by connecting systems, automating workflows, and improving process efficiency.",
  },
  {
    code: "SOLUTION_04 // PLATFORMS",
    stack: "WEB / MOBILE / PORTALS",
    title: "Digital\nPlatforms",
    text: "Custom web platforms, client portals, and business applications built for modern organizations.",
  },
  {
    code: "SOLUTION_05 // DATA",
    stack: "REPORTING / ANALYTICS",
    title: "Dashboards &\nReporting",
    text: "Real-time reporting and decision-support dashboards that help teams track performance and act faster.",
  },
  {
    code: "SOLUTION_06 // CONSULTING",
    stack: "STRATEGY / TRANSFORMATION",
    title: "Digital\nTransformation",
    text: "Technology consulting and system planning to help businesses modernize, scale, and operate better.",
  },
];

export default function Services() {
  return (
    <section id="solutions">
      <div className="work-grid">
        {services.map((service) => (
          <article key={service.code} className="project-card">
            <div className="card-header">
              <span>{service.code}</span>
              <span>{service.stack}</span>
            </div>

            <div>
              <h3 className="project-title">
                {service.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
            </div>

            <div className="card-footer">
              <span className="source-text">{service.text}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}