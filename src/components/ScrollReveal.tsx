// @/components/ScrollReveal.tsx

"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const countEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );

    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-in"));
      countEls.forEach((el) => {
        const v = el.getAttribute("data-count") ?? "";
        el.textContent = v + (el.getAttribute("data-suffix") ?? "");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");

          if (el.hasAttribute("data-count")) {
            const end = parseFloat(el.getAttribute("data-count") || "0");
            const suffix = el.getAttribute("data-suffix") || "";
            const duration = 1200;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(end * eased) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
    countEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}