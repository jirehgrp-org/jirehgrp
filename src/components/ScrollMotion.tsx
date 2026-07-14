// @/components/ScrollMotion.tsx

"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const splits: SplitText[] = [];

    const fontsReady = Promise.race([
      (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts
        ?.ready ?? Promise.resolve(),
      new Promise((res) => setTimeout(res, 1200)),
    ]);

    const ctx = gsap.context(() => {
      // ---- Generic parallax ----
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.2");
        gsap.fromTo(
          el,
          { y: speed * 80 },
          {
            y: -speed * 80,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest<HTMLElement>("[data-parallax-root]") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      // ---- Showcase phones: gentle vertical parallax (all devices) ----
      const phones: Array<[string, number]> = [
        [".featured-phone--back", 0.4],
        [".featured-phone--front", 0.9],
      ];
      phones.forEach(([sel, speed]) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) return;
        gsap.fromTo(
          el,
          { "--py": `${speed * 60}px` },
          {
            "--py": `${-speed * 60}px`,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest<HTMLElement>(".featured-visual") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      // ---- Sticky-stacking process ----
      // Each card stays full-color while it's the front card, then dims only
      // once the NEXT card has actually risen up to cover it.
      const stackItems = gsap.utils.toArray<HTMLElement>(".stack-item");
      stackItems.forEach((item, i) => {
        if (i === stackItems.length - 1) return;
        const card = item.querySelector<HTMLElement>(".step--stack");
        if (!card) return;
        gsap.fromTo(
          card,
          { scale: 1, opacity: 1, y: 0 },
          {
            scale: 0.92,
            opacity: 0.42,
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: stackItems[i + 1],
              // start dimming only once the next card is well into view,
              // finish by the time it has fully covered this one
              start: "top 55%",
              end: "top 12%",
              scrub: true,
            },
          }
        );
      });

      // ---- Reusable: staggered rise-in lists ----
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((container) => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-rise-item]",
          container
        );
        if (!items.length) return;
        gsap.fromTo(
          items,
          {
            y: 42,
            autoAlpha: 0,
            x: (_i, t) => parseFloat((t as HTMLElement).dataset.x || "0"),
          },
          {
            y: 0,
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: container, start: "top 84%", once: true },
          }
        );
      });

      // ---- Industries: clean rise + scale (no horizontal drift) ----
      const industryList = document.querySelector<HTMLElement>(
        "[data-industry-list]"
      );
      if (industryList) {
        const items = gsap.utils.toArray<HTMLElement>(
          ".industry-item",
          industryList
        );
        gsap.fromTo(
          items,
          { y: 48, autoAlpha: 0, scale: 0.96 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: industryList,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // ---- About capabilities: ledger rows reveal + bars draw in ----
      const ledger = document.querySelector<HTMLElement>("[data-ledger]");
      if (ledger) {
        const rows = gsap.utils.toArray<HTMLElement>("[data-ledger-row]", ledger);
        const bars = gsap.utils.toArray<HTMLElement>("[data-ledger-bar]", ledger);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: ledger, start: "top 80%", once: true },
        });
        tl.fromTo(
          rows,
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          }
        ).fromTo(
          bars,
          { height: 0 },
          { height: "62%", duration: 0.5, ease: "power2.out", stagger: 0.1 },
          "-=0.55" // overlap the bars with the row reveal
        );
      }

      // ---- Pre-hide font-dependent elements (avoid flash) ----
      const splitEls = gsap.utils.toArray<HTMLElement>("[data-split]");
      if (splitEls.length) gsap.set(splitEls, { autoAlpha: 0 });

      const hero = document.querySelector<HTMLElement>(".hero");
      const heroTitle = hero?.querySelector<HTMLElement>(".hero-title");
      const heroFades = hero
        ? gsap.utils.toArray<HTMLElement>("[data-hero-fade]", hero)
        : [];
      if (heroTitle) gsap.set(heroTitle, { autoAlpha: 0 });
      if (heroFades.length) gsap.set(heroFades, { autoAlpha: 0, y: 24 });
    });

    // ---- Font-dependent reveals (hero + data-split line masks) ----
    fontsReady.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const hero = document.querySelector<HTMLElement>(".hero");
        const heroTitle = hero?.querySelector<HTMLElement>(".hero-title");
        const heroFades = hero
          ? gsap.utils.toArray<HTMLElement>("[data-hero-fade]", hero)
          : [];

        if (hero && heroTitle) {
          const heroSplit = new SplitText(heroTitle, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          });
          splits.push(heroSplit);
          gsap.set(heroTitle, { autoAlpha: 1 });

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(heroSplit.lines, {
              yPercent: 115,
              duration: 1.15,
              stagger: 0.12,
            })
            .to(
              heroFades,
              { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
              "-=0.75"
            );
        }

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = new SplitText(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          });
          splits.push(split);
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(
            split.lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    });

    const mm = gsap.matchMedia();

    // ---- Horizontal pinned solutions (desktop + motion only) ----
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = document.querySelector<HTMLElement>("[data-hpin]");
        const pinEl = section?.querySelector<HTMLElement>(".hpin__pin");
        const track = section?.querySelector<HTMLElement>(".hpin__track");
        if (!section || !pinEl || !track) return;

        const barFill = section.querySelector<HTMLElement>("[data-hpin-bar]");
        const counter = section.querySelector<HTMLElement>("[data-hpin-current]");
        const cards = gsap.utils.toArray<HTMLElement>(".hpin__card", track);

        section.classList.add("is-hpin-active");
        const distance = () => track.scrollWidth - window.innerWidth;

        const drive = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: pinEl,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barFill) gsap.set(barFill, { scaleX: self.progress });
              if (counter) {
                const n = Math.min(
                  cards.length,
                  Math.max(1, Math.round(self.progress * cards.length))
                );
                counter.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 70,
            scale: 0.94,
            scrollTrigger: {
              trigger: card,
              containerAnimation: drive,
              start: "left 88%",
              end: "left 55%",
              scrub: true,
            },
          });
        });

        ScrollTrigger.refresh();

        return () => {
          section.classList.remove("is-hpin-active");
          gsap.set(track, { clearProps: "transform" });
        };
      }
    );

    // ---- Featured work: 3D bloom on scroll + pointer tilt (desktop, real pointer) ----
    mm.add("(min-width: 1024px) and (pointer: fine)", () => {
      const visual = document.querySelector<HTMLElement>("[data-tilt]");
      if (!visual) return;

      // Scroll-driven spread + counter-spin (composes with base --tx/--ty + --py)
      const bloom: Array<[string, { spread: number; spin: number }]> = [
        [".featured-phone--back", { spread: -52, spin: -9 }],
        [".featured-phone--front", { spread: 66, spin: 12 }],
      ];
      bloom.forEach(([sel, v]) => {
        const el = visual.querySelector<HTMLElement>(sel);
        if (!el) return;
        gsap.fromTo(
          el,
          { "--spread": "0px", "--spin": "0deg" },
          {
            "--spread": `${v.spread}px`,
            "--spin": `${v.spin}deg`,
            ease: "none",
            scrollTrigger: {
              trigger: visual,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      // Pointer tilt — lerped, sets inherited vars on the stage
      let tX = 0;
      let tY = 0;
      let cX = 0;
      let cY = 0;
      let raf = 0;

      const onMove = (e: MouseEvent) => {
        const r = visual.getBoundingClientRect();
        tY = ((e.clientX - r.left) / r.width - 0.5) * 16; // rotateY
        tX = -((e.clientY - r.top) / r.height - 0.5) * 12; // rotateX
      };
      const onLeave = () => {
        tX = 0;
        tY = 0;
      };
      const loop = () => {
        cX += (tX - cX) * 0.08;
        cY += (tY - cY) * 0.08;
        visual.style.setProperty("--tiltX", cX.toFixed(2) + "deg");
        visual.style.setProperty("--tiltY", cY.toFixed(2) + "deg");
        raf = requestAnimationFrame(loop);
      };

      visual.addEventListener("mousemove", onMove);
      visual.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(loop);

      return () => {
        visual.removeEventListener("mousemove", onMove);
        visual.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
        visual.style.removeProperty("--tiltX");
        visual.style.removeProperty("--tiltY");
      };
    });

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctx.revert();
      mm.revert();
    };
  }, []);

  return null;
}