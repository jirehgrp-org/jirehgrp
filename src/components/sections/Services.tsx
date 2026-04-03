// @/components/sections/Services.tsx

const services = [
  {
    code: "SERVICE_01 // WEB",
    stack: "UI / UX / DEVELOPMENT",
    title: "Custom\nWebsites",
    text: "High-performance websites designed to convert, scale, and represent your brand properly.",
  },
  {
    code: "SERVICE_02 // SYSTEMS",
    stack: "ERP / DASHBOARDS",
    title: "Business\nSystems",
    text: "Internal tools, dashboards, and ERP systems built around your actual workflow.",
  },
  {
    code: "SERVICE_03 // PRODUCTS",
    stack: "WEB / MOBILE",
    title: "Apps &\nPlatforms",
    text: "Custom-built platforms and applications for startups and growing businesses.",
  },
  {
    code: "SERVICE_04 // DESIGN",
    stack: "UX / PRODUCT DESIGN",
    title: "Product\nDesign",
    text: "User-focused design systems and interfaces that make complex systems simple to use.",
  },
  {
    code: "SERVICE_05 // AUTOMATION",
    stack: "WORKFLOWS / INTEGRATIONS",
    title: "Automation\n& Integrations",
    text: "Streamline operations by connecting tools, automating processes, and reducing manual work.",
  },
  {
    code: "SERVICE_06 // SUPPORT",
    stack: "SCALING / MAINTENANCE",
    title: "Scale &\nMaintain",
    text: "Ongoing improvements, monitoring, and support as your product and business grow.",
  },
];

export default function Services() {
  return (
    <section id="services">
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