// @/components/sections/CTA.tsx

import { IconArrowUpRight } from "@tabler/icons-react";

export default function CTA() {
  return (
    <section id="cta" className="cta-band">
      <div className="cta-inner" data-reveal>
        <h2 className="cta-title">Have a system in mind?</h2>
        <p className="cta-sub">
          Whether you need ERP, internal tools, automation, or a custom
          platform, we&apos;ll help you define the right solution before
          development begins.
        </p>
        <div className="cta-actions">
          <a href="#contact" className="btn btn-primary">
            Request a consultation <IconArrowUpRight size={16} stroke={2} />
          </a>
          <a href="mailto:hello@jirehgrp.com" className="btn btn-ghost">
            hello@jirehgrp.com
          </a>
        </div>
      </div>
    </section>
  );
}