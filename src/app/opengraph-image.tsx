// @/app/opengraph-image.tsx

import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0a09",
          color: "#f5f1e9",
          padding: "56px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% -10%, rgba(230,178,87,0.22), transparent 42%), radial-gradient(circle at 0% 110%, rgba(230,178,87,0.16), transparent 40%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(230,178,87,0.20)",
            borderRadius: 8,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            JIREHGRP <span style={{ color: "#e6b257", marginLeft: 6 }}>{"//"}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 18,
              padding: "10px 18px",
              borderRadius: 999,
              color: "#e6b257",
              border: "1px solid rgba(230,178,87,0.35)",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Software Studio · Addis Ababa
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            <span>Web &amp; Mobile Apps.</span>
            <span>ERP &amp; Business Systems.</span>
            <span style={{ color: "#e6b257" }}>Custom Software.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.45,
              color: "rgba(245,241,233,0.7)",
              maxWidth: 920,
            }}
          >
            Jirehgrp designs, builds, and ships full-spectrum software — from
            websites and mobile apps to ERP, learning platforms, and custom
            systems.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(245,241,233,0.6)",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          <div style={{ display: "flex" }}>Design. Build. Ship.</div>
          <div style={{ display: "flex", color: "#e6b257" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}