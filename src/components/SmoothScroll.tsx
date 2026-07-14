// @/components/SmoothScroll.tsx

"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = 90; // matches your .section scroll-margin-top

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // smooth in-page anchor links (replaces CSS scroll-behavior)
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href*="#"]'
      );
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex < 0) return;

      const id = href.slice(hashIndex + 1);
      const path = href.slice(0, hashIndex); // "", "/", "/work"...
      const samePage = path === "" || path === window.location.pathname;
      const target = id ? document.getElementById(id) : null;
      if (!samePage || !target) return; // let Next handle cross-page links

      e.preventDefault();
      lenis.scrollTo(target, { offset: -NAV_OFFSET });
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}