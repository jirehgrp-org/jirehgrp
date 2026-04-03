// @/components/sections/Industries.tsx

const industries = [
  {
    code: "INDUSTRY_01 // MANUFACTURING",
    title: "Manufacturing &\nProduction",
    text: "ERP solutions for inventory control, production planning, quality tracking, and supply chain operations.",
  },
  {
    code: "INDUSTRY_02 // RETAIL",
    title: "Retail &\nDistribution",
    text: "Systems for point-of-sale, stock management, customer analytics, and multi-location coordination.",
  },
  {
    code: "INDUSTRY_03 // CONSTRUCTION",
    title: "Construction &\nReal Estate",
    text: "Project tracking, resource planning, financial oversight, and client management tools built for complex operations.",
  },
  {
    code: "INDUSTRY_04 // HEALTHCARE",
    title: "Healthcare &\nPharmaceuticals",
    text: "Operational systems for records, inventory, compliance, billing, and internal process management.",
  },
  {
    code: "INDUSTRY_05 // EDUCATION",
    title: "Education &\nTraining",
    text: "Student systems, learning platforms, administrative tools, and portals for better institutional coordination.",
  },
  {
    code: "INDUSTRY_06 // LOGISTICS",
    title: "Logistics &\nTransportation",
    text: "Fleet, cargo, routing, and delivery management systems designed for visibility and operational efficiency.",
  },
];

export default function Industries() {
  return (
    <section id="industries">
      <div className="work-grid">
        {industries.map((industry) => (
          <article key={industry.code} className="project-card">
            <div className="card-header">
              <span>{industry.code}</span>
              <span>BUSINESS_SYSTEMS / ERP / AUTOMATION</span>
            </div>

            <div>
              <h3 className="project-title">
                {industry.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
            </div>

            <div className="card-footer">
              <span className="source-text">{industry.text}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}