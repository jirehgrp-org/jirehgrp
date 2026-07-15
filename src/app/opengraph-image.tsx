// @/app/opengraph-image.tsx

import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const alt =
  "Jireh Group — ERP, internal business platforms, automation, and custom software";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const codeColumns = [
  [
    "01  const operation = await connect(workflows);",
    "02  finance.sync({ branches: 'all' });",
    "03  inventory.observe(stockLevels);",
    "04  reporting.refresh('real-time');",
    "05  workflow.remove('manual-handoff');",
  ],
  [
    "01  interface BusinessSystem {",
    "02    sales: ConnectedModule;",
    "03    people: ConnectedModule;",
    "04    analytics: LiveIntelligence;",
    "05  }",
  ],
  [
    "01  await deploy({ region: 'africa-east' });",
    "02  security.enforce(roleBasedAccess);",
    "03  data.transform(activity, insight);",
    "04  platform.enable('clarity');",
    "05  return business.scale();",
  ],
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#0a0b0b",
          color: "#f3f1e9",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(rgba(183,255,57,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(183,255,57,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Green ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-170px",
            right: "20px",
            display: "flex",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(183,255,57,0.24), rgba(183,255,57,0.06) 42%, transparent 70%)",
          }}
        />

        {/* Code panels */}
        <div
          style={{
            position: "absolute",
            inset: "92px 38px 38px 520px",
            display: "flex",
            gap: "12px",
            opacity: 0.48,
          }}
        >
          {codeColumns.map((column, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(183,255,57,0.24)",
                background: "rgba(5,7,7,0.78)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "32px",
                  padding: "0 12px",
                  borderBottom: "1px solid rgba(183,255,57,0.2)",
                  color: "rgba(243,241,233,0.58)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "1.4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#b7ff39",
                  }}
                />
                SYSTEM / 0{index + 1}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "22px 14px",
                  color:
                    index === 1
                      ? "rgba(243,241,233,0.54)"
                      : "rgba(183,255,57,0.72)",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  lineHeight: 1.45,
                }}
              >
                {[...column, ...column, ...column].map((line, lineIndex) => (
                  <div key={`${line}-${lineIndex}`} style={{ display: "flex" }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dark readability layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(10,11,11,0.98) 0%, rgba(10,11,11,0.94) 39%, rgba(10,11,11,0.38) 67%, rgba(10,11,11,0.14) 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 54px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  background: "#b7ff39",
                  color: "#0a0b0b",
                  fontSize: "25px",
                  fontWeight: 900,
                }}
              >
                J
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  fontSize: "21px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                }}
              >
                JIREH
                <span
                  style={{
                    color: "rgba(243,241,233,0.5)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                  }}
                >
                  GROUP
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "11px 16px",
                border: "1px solid rgba(243,241,233,0.2)",
                color: "rgba(243,241,233,0.66)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#b7ff39",
                }}
              />
              Addis Ababa · Africa &amp; Beyond
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "850px",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "24px",
                color: "#b7ff39",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2.4px",
                textTransform: "uppercase",
              }}
            >
              ERP / Platforms / Custom Software
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "76px",
                fontWeight: 900,
                lineHeight: 0.86,
                letterSpacing: "-4px",
                textTransform: "uppercase",
              }}
            >
              <div style={{ display: "flex" }}>We build the</div>
              <div style={{ display: "flex" }}>systems</div>
              <div style={{ display: "flex", color: "#b7ff39" }}>
                business runs on.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "760px",
                marginTop: "30px",
                color: "rgba(243,241,233,0.66)",
                fontSize: "20px",
                lineHeight: 1.45,
              }}
            >
              Connected ERP solutions, internal business platforms, automation,
              and dependable software engineered around real operations.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "18px",
              borderTop: "1px solid rgba(243,241,233,0.18)",
              color: "rgba(243,241,233,0.48)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>Systems that move business</div>

            <div style={{ display: "flex", color: "#b7ff39" }}>
              {siteConfig.domain}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}