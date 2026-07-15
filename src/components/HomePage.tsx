// @/components/HomePage.tsx

"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Database,
  Layers3,
  Menu,
  MoveRight,
  Network,
  Plus,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import LanguageToggle from "@/components/LanguageToggle";
import type { HomeDictionary, SiteLanguage } from "@/content/home";
import styles from "./HomePage.module.css";

gsap.registerPlugin(ScrollTrigger);

const codeStreams = [
  {
    label: "OPS / CORE",
    lines: [
      "const operation = await connect(workflows);",
      "if (friction) automate(process);",
      "data.sync({ branches: 'all' });",
      "role.access = policy.resolve(user);",
      "metrics.stream('real-time');",
      "return business.scale(confidently);",
      "// systems that move business",
    ],
  },
  {
    label: "ERP / LEDGER",
    lines: [
      "await ledger.reconcile(transactions);",
      "inventory.reserve(order.items);",
      "finance.post({ status: 'verified' });",
      "branch.closeDay({ balanced: true });",
      "report.publish('executive');",
      "queue.flush('reliable');",
      "// one source of truth",
    ],
  },
  {
    label: "API / GATEWAY",
    lines: [
      "POST /v1/operations/sync 202",
      "GET /v1/analytics/live 200",
      "PATCH /v1/workflows/:id 204",
      "auth.verify(roleBasedAccess);",
      "rateLimit.apply('adaptive');",
      "cache.invalidate('business');",
      "// secure by design",
    ],
  },
  {
    label: "DATA / SIGNAL",
    lines: [
      "SELECT insight FROM operations",
      "WHERE status = 'live';",
      "dashboard.refresh('executive');",
      "warehouse.merge(dailyEvents);",
      "forecast.update(currentSignals);",
      "system.observe(metrics);",
      "// visibility without delay",
    ],
  },
  {
    label: "CLOUD / EAST",
    lines: [
      "await deploy({ region: 'africa-east' });",
      "container.health = 'passing';",
      "replica.scale({ min: 2, max: 12 });",
      "backup.verify('encrypted');",
      "uptime.target = 99.95;",
      "alerts.route(onCallTeam);",
      "// infrastructure ready",
    ],
  },
  {
    label: "PRODUCT / LOOP",
    lines: [
      "const release = build(priorityScope);",
      "product.iterate(feedback);",
      "feature.measure(adoption);",
      "experience.remove('friction');",
      "roadmap.align(businessValue);",
      "release.ship({ confidence: high });",
      "// build, learn, improve",
    ],
  },
  {
    label: "SYSTEM / LIVE",
    lines: [
      "interface BusinessSystem {",
      "  finance: ConnectedModule;",
      "  inventory: ConnectedModule;",
      "  people: ConnectedModule;",
      "  reporting: LiveIntelligence;",
      "}",
      "platform.enable('clarity');",
    ],
  },
  {
    label: "SECURITY / AUTH",
    lines: [
      "session.rotate({ secure: true });",
      "permission.resolve(user.role);",
      "audit.append('access-granted');",
      "token.verify({ scope: 'business' });",
      "threat.detect(request.signal);",
      "policy.enforce('least-privilege');",
      "// trust is engineered",
    ],
  },
  {
    label: "WORKFLOW / QUEUE",
    lines: [
      "queue.enqueue(pendingApproval);",
      "worker.process({ concurrency: 8 });",
      "event.emit('inventory.updated');",
      "retry.backoff({ attempts: 3 });",
      "handoff.remove('manual');",
      "workflow.complete(nextAction);",
      "// operations keep moving",
    ],
  },
  {
    label: "CLIENT / MOBILE",
    lines: [
      "screen.render(currentState);",
      "notification.deliver(deviceToken);",
      "offline.cache(criticalData);",
      "gesture.respond('immediately');",
      "session.restore(userContext);",
      "experience.measure(latency);",
      "// useful on every screen",
    ],
  },
];

function CodeBackdrop() {
  const visibleStreams = codeStreams.slice(0, 7);

  return (
    <div className={styles.codeBackdrop} aria-hidden="true">
      <div className={styles.codeGrid} />
      <div className={styles.codeScanner} />

      <div className={styles.codeStreams}>
        {visibleStreams.map((stream, streamIndex) => {
          const streamText = Array.from({ length: 10 }, (_, repeatIndex) =>
            stream.lines
              .map((line, lineIndex) => {
                const lineNumber =
                  repeatIndex * stream.lines.length + lineIndex + 1;
                return `${String(lineNumber).padStart(3, "0")}  ${line}`;
              })
              .join("\n"),
          ).join("\n");

          return (
            <div
              className={styles.codeStream}
              key={`${stream.label}-${streamIndex}`}
              style={
                {
                  "--stream-duration": `${18 + (streamIndex % 4) * 3.5}s`,
                  "--stream-delay": `${streamIndex * -3.2}s`,
                  "--stream-opacity": 0.72 + (streamIndex % 3) * 0.08,
                } as CSSProperties
              }
            >
              <div className={styles.codeStreamHead}>
                <span>{String(streamIndex + 1).padStart(2, "0")}</span>
                <i />
                <span>{stream.label}</span>
              </div>

              <div className={styles.codeRainWindow}>
                <div className={styles.codeTrack}>
                  <pre className={styles.codeSequence}>{streamText}</pre>
                  <pre className={styles.codeSequence}>{streamText}</pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.codeTelemetry}>
        <span>
          <i /> BUILD RUNNING
        </span>
        <span>JIREH / SYSTEMS ONLINE</span>
        <span>ADDIS ABABA · 09.0327° N</span>
      </div>
    </div>
  );
}

const flyingCode = [
  "{ API }",
  "<SYSTEM />",
  "SELECT *",
  "DEPLOY()",
  "010110",
  "[SYNC]",
];

function LaptopCodeVisual() {
  return (
    <div className={styles.buildVisual} data-reveal aria-hidden="true">
      <div className={styles.buildVisualGrid} />
      <div className={styles.buildVisualGlow} />

      <svg
        className={styles.laptopIllustration}
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.laptopFloat}>
          <rect
            x="132"
            y="76"
            width="376"
            height="264"
            rx="18"
            fill="#111414"
            stroke="#B7FF39"
            strokeWidth="3"
          />
          <rect
            x="151"
            y="96"
            width="338"
            height="224"
            rx="8"
            fill="#090B0B"
            stroke="rgba(243,241,233,.22)"
          />
          <circle cx="320" cy="86" r="4" fill="#B7FF39" />
          <path
            d="M94 365H546L590 428H50L94 365Z"
            fill="#171A1A"
            stroke="rgba(243,241,233,.28)"
            strokeWidth="3"
          />
          <path
            d="M50 428H590C586 446 570 456 548 456H92C70 456 54 446 50 428Z"
            fill="#0B0D0D"
            stroke="rgba(243,241,233,.22)"
            strokeWidth="3"
          />
          <rect
            x="260"
            y="383"
            width="120"
            height="38"
            rx="8"
            fill="#0B0D0D"
            stroke="rgba(183,255,57,.34)"
          />
          <path
            d="M126 390H235M405 390H514M112 410H225M415 410H528"
            stroke="rgba(243,241,233,.13)"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className={styles.laptopScreenCode}>
        <div className={styles.screenChrome}>
          <span />
          <span />
          <span />
          <small>jireh-core.ts</small>
        </div>
        <div className={styles.screenLines}>
          <span>
            <b>01</b> const system = build(operation);
          </span>
          <span>
            <b>02</b> workflow.connect(branches);
          </span>
          <span>
            <b>03</b> data.stream(&quot;real-time&quot;);
          </span>
          <span>
            <b>04</b> business.scale(confidently);
          </span>
          <span>
            <b>05</b> await deploy(system);
          </span>
        </div>
      </div>

      <div className={styles.codeBurst}>
        {flyingCode.map((snippet, index) => (
          <span
            className={styles.flyingCode}
            key={snippet}
            style={
              {
                "--chip-left": `${12 + index * 13}%`,
                "--chip-delay": `${index * -0.72}s`,
                "--chip-x": `${(index % 2 === 0 ? -1 : 1) * (18 + index * 5)}px`,
              } as CSSProperties
            }
          >
            {snippet}
          </span>
        ))}
      </div>

      <div className={styles.buildVisualStatus}>
        <span>
          <i /> SYSTEM BUILDING
        </span>
        <span>PRODUCT + ENGINEERING</span>
      </div>
    </div>
  );
}

function ArrowLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a className={styles.arrowLink} href={href}>
      <span>{children}</span>
      <span className={styles.arrowLinkIcon} aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={1.8} />
      </span>
    </a>
  );
}

function ImagePlaceholder({
  label,
  recommendedLabel,
}: {
  label: string;
  index: string;
  recommendedLabel: string;
}) {
  return (
    <div
      className={styles.imagePlaceholder}
    >
      <div className={styles.imagePlaceholderGrid} aria-hidden="true" />
      <div className={styles.imagePlaceholderGlow} aria-hidden="true" />
      <div className={styles.imagePlaceholderTop}>

        <Plus size={18} strokeWidth={1.5} />
      </div>
      <div className={styles.imagePlaceholderCenter}>
        <Sparkles size={26} strokeWidth={1.35} />
        <p>{label}</p>
      </div>
      <div className={styles.imagePlaceholderBottom}>
        <span>{recommendedLabel}</span>
        <span>JIREHGRP</span>
      </div>
    </div>
  );
}

function SystemVisual() {
  return (
    <div className={styles.systemVisual} aria-hidden="true">
      <div className={styles.visualGrid} />
      <div className={`${styles.ring} ${styles.ringOne}`} />
      <div className={`${styles.ring} ${styles.ringTwo}`} />
      <div className={`${styles.ring} ${styles.ringThree}`} />

      <div className={`${styles.node} ${styles.nodeCore}`}>
        <Zap size={22} strokeWidth={1.4} />
        <span>CORE</span>
      </div>
      <div className={`${styles.node} ${styles.nodeSales}`}>
        <span>SALES</span>
        <i />
      </div>
      <div className={`${styles.node} ${styles.nodeFinance}`}>
        <span>FINANCE</span>
        <i />
      </div>
      <div className={`${styles.node} ${styles.nodeInventory}`}>
        <span>INVENTORY</span>
        <i />
      </div>
      <div className={`${styles.node} ${styles.nodePeople}`}>
        <span>PEOPLE</span>
        <i />
      </div>

      <svg className={styles.connectionLines} viewBox="0 0 700 700" fill="none">
        <path d="M350 350L175 185" />
        <path d="M350 350L535 175" />
        <path d="M350 350L565 510" />
        <path d="M350 350L165 525" />
      </svg>

      <div className={styles.visualStatus}>
        <span className={styles.statusDot} />
        <span>ALL SYSTEMS CONNECTED</span>
      </div>
    </div>
  );
}

type HomePageProps = {
  language: SiteLanguage;
  copy: HomeDictionary;
};

export default function HomePage({ language, copy }: HomePageProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const homeHref = language === "am" ? "/am" : "/";
  const startHref = language === "am" ? "/am/start" : "/start";
  const serviceIcons = [Layers3, Network, Braces, Database];
  const mobileNavigation = [
    [copy.navigation.about, "#about"],
    [copy.navigation.services, "#services"],
    [copy.navigation.work, "#work"],
    [copy.navigation.approach, "#approach"],
    [copy.navigation.contact, "#contact"],
  ] as const;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let tickerHandler: ((time: number) => void) | null = null;
    let lenis: Lenis | null = null;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.1,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tickerHandler = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerHandler);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set("[data-reveal], [data-hero-reveal]", {
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          scaleX: 1,
          filter: "none",
        });
        gsap.set(
          `.${styles.header}, .${styles.heroTopline}, .${styles.heroMeta}, .${styles.heroAside}, .${styles.scrollIndicator}`,
          { opacity: 1, y: 0 },
        );
        gsap.set(`.${styles.loader}`, { display: "none" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
      const heroFlashes = gsap.utils.toArray<HTMLElement>(
        `.${styles.heroLineFlash}`,
      );

      gsap.set(heroLines, { opacity: 0 });
      gsap.set(
        `.${styles.header}, .${styles.heroTopline}, .${styles.heroMeta}, .${styles.heroAside}, .${styles.scrollIndicator}`,
        { opacity: 0 },
      );

      intro
        .fromTo(
          `.${styles.loaderWord} span`,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.8, stagger: 0.06 },
        )
        .to(
          `.${styles.loaderProgressBar}`,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.35",
        )
        .to(`.${styles.loader}`, {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        })
        .fromTo(
          `.${styles.codeBackdrop}`,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.55, ease: "power2.out" },
          "-=0.08",
        )
        // Let the running system own the screen before the message lands.
        .to({}, { duration: 0.002 });

      const punchLine = (
        line: HTMLElement | undefined,
        flash: HTMLElement | undefined,
        from: {
          xPercent?: number;
          yPercent?: number;
          rotateZ?: number;
          scale?: number;
        },
      ) => {
        if (!line) return;

        intro.fromTo(
          line,
          {
            opacity: 0,
            scaleX: 0.72,
            ...from,
          },
          {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            rotateZ: 0,
            scale: 1,
            scaleX: 1,
            duration: 0.72,
            ease: "expo.out",
          },
        );

        if (flash) {
          intro.fromTo(
            flash,
            { xPercent: -115, opacity: 0.9 },
            { xPercent: 115, opacity: 0, duration: 0.52, ease: "power4.inOut" },
            "-=0.7",
          );
        }
      };

      intro.to(`.${styles.codeBackdrop}`, {
        opacity: 0.58,
        duration: 0.55,
        ease: "power2.out",
      });

      punchLine(heroLines[0], heroFlashes[0], {
        xPercent: -118,
        rotateZ: -2.5,
      });
      punchLine(heroLines[1], heroFlashes[1], { xPercent: 118, rotateZ: 2.5 });
      punchLine(heroLines[2], heroFlashes[2], { yPercent: 125, scale: 1.16 });

      intro
        .fromTo(
          `.${styles.heroTopline}`,
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.18",
        )
        .fromTo(
          `.${styles.header}`,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.4",
        )
        .fromTo(
          `.${styles.heroMeta}, .${styles.heroAside}, .${styles.scrollIndicator}`,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
          "-=0.38",
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 54 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-line-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: 105 },
            {
              yPercent: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>(`.${styles.serviceCard}`)
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 70, rotateX: 7 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.95,
              delay: index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>(`.${styles.projectVisual}`)
        .forEach((visual) => {
          const placeholder = visual.querySelector(
            `.${styles.imagePlaceholder}`,
          );
          if (!placeholder) return;

          gsap.fromTo(
            placeholder,
            { scale: 1.06, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: visual,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>(`.${styles.processItem}`)
        .forEach((item) => {
          const line = item.querySelector(`.${styles.processLineFill}`);
          if (!line) return;

          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 65%",
                scrub: true,
              },
            },
          );
        });

      const statementWords = gsap.utils.toArray<HTMLElement>(
        `.${styles.statementWord}`,
      );
      gsap.fromTo(
        statementWords,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: `.${styles.statementText}`,
            start: "top 72%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      gsap.to(`.${styles.marqueeTrack}`, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.marquee}`,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      if (tickerHandler) gsap.ticker.remove(tickerHandler);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const scrollTo = (target: string) => {
    setMenuOpen(false);
    const element = document.querySelector(target);
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element as HTMLElement, {
        offset: -76,
        duration: 1.25,
      });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main ref={rootRef} className={styles.page} data-language={language}>
      <div className={styles.loader} aria-hidden="true">
        <div className={styles.loaderInner}>
          <div className={styles.loaderWord}>
            <span>{copy.loader.brandName}</span>
          </div>

          <div className={styles.loaderWord}>
            <span>{copy.loader.brandGroup}</span>
          </div>

          <div className={styles.loaderMeta}>
            <span>{copy.loader.tagline}</span>
            <span>{copy.loader.location}</span>
          </div>

          <div className={styles.loaderProgress}>
            <div className={styles.loaderProgressBar} />
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <Link
          className={styles.logo}
          href={homeHref}
          aria-label={
            language === "am"
              ? "ወደ ጃይረ ግሩፕ መነሻ ገጽ ይመለሱ"
              : "Go to the Jireh Group homepage"
          }
        >
          <span className={styles.logoMark}>
            {language === "am" ? "ጃ" : "J"}
          </span>

          <span className={styles.logoText}>
            {copy.loader.brandName}
            <small>{copy.loader.brandGroup}</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <button type="button" onClick={() => scrollTo("#about")}>
            {copy.navigation.about}
          </button>
          <button type="button" onClick={() => scrollTo("#services")}>
            {copy.navigation.services}
          </button>
          <button type="button" onClick={() => scrollTo("#work")}>
            {copy.navigation.work}
          </button>
          <button type="button" onClick={() => scrollTo("#approach")}>
            {copy.navigation.approach}
          </button>
        </nav>

        <div className={styles.headerActions}>
          <LanguageToggle language={language} />

          <Link className={styles.headerCta} href={startHref}>
            <span>{copy.navigation.startProject}</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={
            menuOpen ? copy.navigation.closeMenu : copy.navigation.openMenu
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          {mobileNavigation.map(([label, href], index) => (
            <button key={href} type="button" onClick={() => scrollTo(href)}>
              <span>0{index + 1}</span>
              {label}
              <ArrowUpRight size={22} />
            </button>
          ))}

          <div className={styles.mobileMenuFooter}>
            <LanguageToggle language={language} variant="dark" />
            <a href="mailto:hello@jirehgrp.com">hello@jirehgrp.com</a>
          </div>
        </div>
      </div>

      <section id="top" className={styles.hero}>
        <CodeBackdrop />
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={styles.heroNoise} aria-hidden="true" />

        <div className={styles.heroTopline}>
          <span>{copy.hero.studio}</span>
          <span className={styles.heroToplineCenter}>
            <i /> {copy.hero.location}
          </span>
          <span>{copy.hero.category}</span>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <div className={styles.heroTitle}>
              <div className={styles.heroLineMask}>
                <h1 data-hero-reveal>{copy.hero.line1}</h1>
                <span className={styles.heroLineFlash} aria-hidden="true" />
              </div>
              <div className={styles.heroLineMask}>
                <h1 data-hero-reveal>{copy.hero.line2}</h1>
                <span className={styles.heroLineFlash} aria-hidden="true" />
              </div>
              <div
                className={`${styles.heroLineMask} ${styles.heroLineAccent}`}
              >
                <h1 data-hero-reveal>{copy.hero.line3}</h1>
                <span className={styles.heroLineFlash} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.heroMeta}>
              <p>{copy.hero.description}</p>
              <ArrowLink href="#contact">{copy.hero.cta}</ArrowLink>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <SystemVisual />
          </aside>
        </div>

        <div className={styles.scrollIndicator}>
          <span>{copy.hero.scroll}</span>
          <span className={styles.scrollLine}>
            <ArrowDown size={16} />
          </span>
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.sectionLabel} data-reveal>
          <span>01</span>
          <span>{copy.statement.label}</span>
        </div>

        <p className={styles.statementText}>
          {copy.statement.text.split(" ").map((word, index) => (
            <span className={styles.statementWord} key={`${word}-${index}`}>
              {word}{" "}
            </span>
          ))}
        </p>

        <div className={styles.statementFoot} data-reveal>
          <span>{copy.statement.from}</span>
          <MoveRight size={24} strokeWidth={1.4} />
          <span>{copy.statement.to}</span>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...copy.marquee, ...copy.marquee].map((word, index) => (
            <div className={styles.marqueeItem} key={`${word}-${index}`}>
              <span>{word}</span>
              <i />
            </div>
          ))}
        </div>
      </div>

      <section id="about" className={styles.about}>
        <div className={styles.aboutIntro}>
          <div className={styles.sectionLabel} data-reveal>
            <span>02</span>
            <span>{copy.about.label}</span>
          </div>

          <div className={styles.aboutHeading}>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.about.heading1}</h2>
            </div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.about.heading2}</h2>
            </div>
          </div>
        </div>

        <div className={styles.aboutShowcase}>
          <LaptopCodeVisual />

          <div className={styles.aboutLead} data-reveal>
            <p className={styles.aboutLeadStatement}>{copy.about.statement}</p>
            <p className={styles.aboutLeadDetail}>{copy.about.detail}</p>
          </div>
        </div>

        <div className={styles.aboutBody}>
          <div className={styles.factGrid}>
            {copy.about.facts.map((fact, index) => (
              <article className={styles.factCard} data-reveal key={fact.value}>
                <span>0{index + 1}</span>
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
              </article>
            ))}
          </div>

          <div className={styles.technology} data-reveal>
            <div className={styles.technologyHeader}>
              <span>{copy.about.technologyLabel}</span>
              <span>{copy.about.technologyNote}</span>
            </div>
            <div className={styles.technologyList}>
              {copy.about.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={styles.services}>
        <div className={styles.servicesIntro}>
          <div className={styles.sectionLabel} data-reveal>
            <span>03</span>
            <span>{copy.services.label}</span>
          </div>

          <div className={styles.servicesIntroSticky}>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.services.heading1}</h2>
            </div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.services.heading2}</h2>
            </div>
            <p data-reveal>{copy.services.description}</p>
            <ArrowLink href="#contact">{copy.services.cta}</ArrowLink>
          </div>
        </div>

        <div className={styles.serviceList}>
          {copy.services.items.map((service, index) => {
            const Icon = serviceIcons[index];

            return (
              <article className={styles.serviceCard} key={service.title}>
                <div className={styles.serviceCardTop}>
                  <span className={styles.serviceNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.serviceIcon}>
                    <Icon size={24} strokeWidth={1.35} />
                  </span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className={styles.serviceTags}>
                  {service.tags.map((tag) => (
                    <span key={tag}>
                      <Check size={13} strokeWidth={2} />
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight
                  className={styles.serviceArrow}
                  size={24}
                  strokeWidth={1.4}
                />
              </article>
            );
          })}
        </div>
      </section>

      <section id="work" className={styles.work}>
        <div className={styles.workHeading}>
          <div className={styles.sectionLabel} data-reveal>
            <span>04</span>
            <span>{copy.work.label}</span>
          </div>

          <div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.work.heading1}</h2>
            </div>
            <div className={`${styles.lineMask} ${styles.workHeadingOffset}`}>
              <h2 data-line-reveal>{copy.work.heading2}</h2>
            </div>
          </div>
        </div>

        <div className={styles.projectList}>
          {copy.work.projects.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <article className={styles.project} key={project.title}>
                <div className={styles.projectVisual} data-reveal>
                  <ImagePlaceholder
                    label={project.imageLabel}
                    index={number}
                    recommendedLabel={copy.work.recommended}
                  />
                </div>

                <div className={styles.projectInfo} data-reveal>
                  <div className={styles.projectMeta}>
                    <span>{number}</span>
                    <span>{project.type}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button type="button" className={styles.projectLink}>
                    {copy.work.viewSystem}
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.outcomes}>
        <div className={styles.outcomesHeader}>
          <div className={styles.sectionLabel} data-reveal>
            <span>05</span>
            <span>{copy.outcomes.label}</span>
          </div>
          <p data-reveal>{copy.outcomes.introduction}</p>
        </div>

        <div className={styles.outcomeGrid}>
          {copy.outcomes.items.map((item, index) => (
            <article
              className={styles.outcomeCard}
              data-reveal
              key={item.title}
            >
              <span className={styles.outcomeIndex}>
                {String.fromCharCode(65 + index)}
              </span>
              <strong>{item.value}</strong>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="approach" className={styles.approach}>
        <div className={styles.approachIntro}>
          <div className={styles.sectionLabel} data-reveal>
            <span>06</span>
            <span>{copy.approach.label}</span>
          </div>
          <div className={styles.approachHeading}>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.approach.heading1}</h2>
            </div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>{copy.approach.heading2}</h2>
            </div>
          </div>
          <p data-reveal>{copy.approach.description}</p>
        </div>

        <div className={styles.processList}>
          {copy.approach.steps.map((item, index) => (
            <article className={styles.processItem} key={item.title}>
              <div className={styles.processLine}>
                <span className={styles.processLineFill} />
              </div>
              <span className={styles.processNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.contactGlow} aria-hidden="true" />
        <div className={styles.contactTop}>
          <div className={styles.sectionLabel} data-reveal>
            <span>07</span>
            <span>{copy.contact.label}</span>
          </div>
          <span className={styles.contactAvailability} data-reveal>
            <i /> {copy.contact.availability}
          </span>
        </div>

        <div className={styles.contactHeading}>
          <div className={styles.lineMask}>
            <h2 data-line-reveal>{copy.contact.heading1}</h2>
          </div>
          <div className={styles.lineMask}>
            <h2 data-line-reveal>{copy.contact.heading2}</h2>
          </div>
          <div className={`${styles.lineMask} ${styles.contactAccent}`}>
            <h2 data-line-reveal>{copy.contact.heading3}</h2>
          </div>
        </div>

        <div className={styles.contactBottom} data-reveal>
          <p>{copy.contact.description}</p>
          <Link className={styles.contactButton} href={startHref}>
            <span>{copy.contact.cta}</span>
            <span className={styles.contactButtonIcon}>
              <ArrowUpRight size={28} strokeWidth={1.35} />
            </span>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link
          className={styles.footerBrand}
          href={homeHref}
          aria-label={
            language === "am"
              ? "ወደ ጃይረ ግሩፕ መነሻ ገጽ ይመለሱ"
              : "Go to the Jireh Group homepage"
          }
        >
          <span className={styles.footerLogoMark}>
            {language === "am" ? "ጃ" : "J"}
          </span>

          <div>
            <strong>
              {copy.loader.brandName} {copy.loader.brandGroup}
            </strong>

            <span>{copy.footer.tagline}</span>
          </div>
        </Link>

        <div className={styles.footerContacts}>
          <div>
            <span>{copy.footer.general}</span>
            <a href="mailto:hello@jirehgrp.com">hello@jirehgrp.com</a>
          </div>
          <div>
            <span>{copy.footer.sales}</span>
            <a href="mailto:sales@jirehgrp.com">sales@jirehgrp.com</a>
          </div>
          <div>
            <span>{copy.footer.support}</span>
            <a href="mailto:support@jirehgrp.com">support@jirehgrp.com</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 {language === "am" ? "ጃይረ ግሩፕ" : "Jirehgrp"}</span>
          <span>{copy.footer.location}</span>
          <button type="button" onClick={() => scrollTo("#top")}>
            {copy.footer.backToTop}
          </button>
        </div>
      </footer>
    </main>
  );
}
