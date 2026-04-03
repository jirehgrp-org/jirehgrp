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
          background: "#f6efe3",
          color: "#1a1816",
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
              "radial-gradient(circle at top left, rgba(26,24,22,0.08), transparent 34%), radial-gradient(circle at bottom right, rgba(26,24,22,0.06), transparent 30%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(26,24,22,0.10)",
            display: "flex",
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
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            JIREHGRP //
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 18,
              padding: "10px 18px",
              borderRadius: 999,
              color: "rgba(26,24,22,0.7)",
              border: "1px solid rgba(26,24,22,0.12)",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Custom digital systems
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            <span>Custom Websites.</span>
            <span>Apps. ERP. Software.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(26,24,22,0.72)",
              maxWidth: 900,
            }}
          >
            Jirehgrp builds modern websites, business software, ERP systems, and
            custom digital products for ambitious businesses.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(26,24,22,0.6)",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          <div>Design. Build. Scale.</div>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size
  );
}