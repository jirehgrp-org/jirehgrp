// @/components/sections/FeaturedWork.tsx

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function FeaturedWork() {
  return (
    <section id="featured-work" className="section">
      <div className="featured-layout">
        <div className="featured-copy" data-rise>
          <span className="label" data-rise-item>
            Selected work / Proof
          </span>
          <h2 className="section-title" data-split>
            We don&apos;t just talk about it — we ship it.
          </h2>
          <p className="section-intro" data-rise-item>
            From a moderated anonymous social platform to a full restaurant
            reservation app, we design and build real products that people use
            every day. The same care goes into every system we deliver.
          </p>
          <div
            className="project-links"
            data-rise-item
            style={{ marginTop: 30 }}
          >
            <Link href="/work" className="btn btn-primary">
              View our work <IconArrowUpRight size={16} stroke={2} />
            </Link>
          </div>
        </div>

        <div
          className="featured-visual"
          data-reveal
          data-tilt
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work/confession.png"
            alt="Confession app"
            className="featured-phone featured-phone--back"
            loading="lazy"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work/dining.png"
            alt="Dine-in app"
            className="featured-phone featured-phone--front"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}