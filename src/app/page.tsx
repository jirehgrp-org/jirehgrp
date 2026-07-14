// @/app/page.tsx

"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    icon: Layers3,
    title: "ERP & Operations",
    description:
      "Connected systems for finance, inventory, sales, procurement, branches, people, and reporting — designed around the way your company actually operates.",
    tags: ["ERP architecture", "Workflow design", "Role-based access"],
  },
  {
    number: "02",
    icon: Network,
    title: "Internal Platforms",
    description:
      "Purpose-built portals, dashboards, approval systems, and operational tools that replace scattered spreadsheets, chats, and manual handoffs.",
    tags: ["Admin platforms", "Dashboards", "Process automation"],
  },
  {
    number: "03",
    icon: Braces,
    title: "Custom Software",
    description:
      "Web and mobile products engineered from first principle — from customer-facing platforms to complex software that becomes core business infrastructure.",
    tags: ["Web applications", "Mobile products", "API systems"],
  },
  {
    number: "04",
    icon: Database,
    title: "Data & Intelligence",
    description:
      "A reliable data layer that turns day-to-day activity into visibility, accountability, and decisions your team can act on with confidence.",
    tags: ["Analytics", "Data modeling", "Executive reporting"],
  },
];

const projects = [
  {
    number: "01",
    type: "Enterprise platform",
    title: "A unified operating system for a growing multi-branch business.",
    summary:
      "Sales, inventory, expenses, users, reporting, and branch operations brought into one secure system.",
    tags: ["ERP", "Operations", "Analytics"],
    imageLabel: "Enterprise dashboard / product interface",
  },
  {
    number: "02",
    type: "Digital product",
    title: "A social platform designed for scale, safety, and daily engagement.",
    summary:
      "Mobile-first product engineering across authentication, feeds, notifications, moderation, and growth systems.",
    tags: ["Mobile", "Platform", "Infrastructure"],
    imageLabel: "Mobile app screens / campaign photography",
  },
  {
    number: "03",
    type: "Operational software",
    title: "A faster point-of-sale and management workflow for hospitality teams.",
    summary:
      "A focused transaction experience connected to menus, staff, payments, reconciliation, and management reporting.",
    tags: ["POS", "Hospitality", "Reporting"],
    imageLabel: "POS interface / restaurant operations",
  },
];

const process = [
  {
    number: "01",
    title: "Understand the operation",
    text: "We map the real workflow, constraints, responsibilities, and decisions before we discuss screens or features.",
  },
  {
    number: "02",
    title: "Design the system",
    text: "We define the architecture, user journeys, data model, and delivery priorities around measurable business value.",
  },
  {
    number: "03",
    title: "Build in clear stages",
    text: "Working software is delivered in focused releases, reviewed with your team, and improved through real operational feedback.",
  },
  {
    number: "04",
    title: "Launch and evolve",
    text: "We support rollout, adoption, monitoring, and the next layer of improvements as the business grows.",
  },
];

const capabilityWords = [
  "ERP SYSTEMS",
  "CUSTOM SOFTWARE",
  "INTERNAL PLATFORMS",
  "AUTOMATION",
  "DATA & ANALYTICS",
];


const companyFacts = [
  {
    value: "Addis Ababa",
    label:
      "Headquartered in Ethiopia and building dependable digital systems for organisations across Africa and beyond.",
  },
  {
    value: "End-to-end",
    label:
      "Discovery, product strategy, experience design, architecture, engineering, deployment, and support in one connected team.",
  },
  {
    value: "Built to last",
    label:
      "Maintainable software designed around real people, changing operations, growing teams, and long-term business ownership.",
  },
];

const technologyStack = [
  "NEXT.JS",
  "REACT",
  "NODE.JS",
  "DJANGO",
  "POSTGRESQL",
  "DOCKER",
  "CLOUD INFRASTRUCTURE",
  "API INTEGRATIONS",
];

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
                const lineNumber = repeatIndex * stream.lines.length + lineIndex + 1;
                return `${String(lineNumber).padStart(3, "0")}  ${line}`;
              })
              .join("\n"),
          ).join("\n");

          return (
            <div
              className={styles.codeStream}
              key={`${stream.label}-${streamIndex}`}
              style={{
                "--stream-duration": `${18 + (streamIndex % 4) * 3.5}s`,
                "--stream-delay": `${streamIndex * -3.2}s`,
                "--stream-opacity": 0.72 + (streamIndex % 3) * 0.08,
              } as CSSProperties}
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
        <span><i /> BUILD RUNNING</span>
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
          <rect x="132" y="76" width="376" height="264" rx="18" fill="#111414" stroke="#B7FF39" strokeWidth="3" />
          <rect x="151" y="96" width="338" height="224" rx="8" fill="#090B0B" stroke="rgba(243,241,233,.22)" />
          <circle cx="320" cy="86" r="4" fill="#B7FF39" />
          <path d="M94 365H546L590 428H50L94 365Z" fill="#171A1A" stroke="rgba(243,241,233,.28)" strokeWidth="3" />
          <path d="M50 428H590C586 446 570 456 548 456H92C70 456 54 446 50 428Z" fill="#0B0D0D" stroke="rgba(243,241,233,.22)" strokeWidth="3" />
          <rect x="260" y="383" width="120" height="38" rx="8" fill="#0B0D0D" stroke="rgba(183,255,57,.34)" />
          <path d="M126 390H235M405 390H514M112 410H225M415 410H528" stroke="rgba(243,241,233,.13)" strokeWidth="7" strokeLinecap="round" />
        </g>
      </svg>

      <div className={styles.laptopScreenCode}>
        <div className={styles.screenChrome}>
          <span /><span /><span />
          <small>jireh-core.ts</small>
        </div>
        <div className={styles.screenLines}>
          <span><b>01</b> const system = build(operation);</span>
          <span><b>02</b> workflow.connect(branches);</span>
          <span><b>03</b> data.stream(&quot;real-time&quot;);</span>
          <span><b>04</b> business.scale(confidently);</span>
          <span><b>05</b> await deploy(system);</span>
        </div>
      </div>

      <div className={styles.codeBurst}>
        {flyingCode.map((snippet, index) => (
          <span
            className={styles.flyingCode}
            key={snippet}
            style={{
              "--chip-left": `${12 + index * 13}%`,
              "--chip-delay": `${index * -0.72}s`,
              "--chip-x": `${(index % 2 === 0 ? -1 : 1) * (18 + index * 5)}px`,
            } as CSSProperties}
          >
            {snippet}
          </span>
        ))}
      </div>

      <div className={styles.buildVisualStatus}>
        <span><i /> SYSTEM BUILDING</span>
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

function ImagePlaceholder({ label, index }: { label: string; index: string }) {
  return (
    <div className={styles.imagePlaceholder} aria-label={`Image placeholder: ${label}`}>
      <div className={styles.imagePlaceholderGrid} aria-hidden="true" />
      <div className={styles.imagePlaceholderGlow} aria-hidden="true" />
      <div className={styles.imagePlaceholderTop}>
        <span>IMAGE SLOT / {index}</span>
        <Plus size={18} strokeWidth={1.5} />
      </div>
      <div className={styles.imagePlaceholderCenter}>
        <Sparkles size={26} strokeWidth={1.35} />
        <p>{label}</p>
        <small>Replace this component with your image</small>
      </div>
      <div className={styles.imagePlaceholderBottom}>
        <span>16:10 recommended</span>
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

export default function HomePage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      const heroFlashes = gsap.utils.toArray<HTMLElement>(`.${styles.heroLineFlash}`);

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
        .to(`.${styles.loaderProgressBar}`, {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
        }, "-=0.35")
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
        .to({}, { duration: 1.25 });

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

      intro.to(`.${styles.codeBackdrop}`, { opacity: 0.58, duration: 0.55, ease: "power2.out" });

      punchLine(heroLines[0], heroFlashes[0], { xPercent: -118, rotateZ: -2.5 });
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

      gsap.utils.toArray<HTMLElement>("[data-line-reveal]").forEach((element) => {
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

      gsap.utils.toArray<HTMLElement>(`.${styles.serviceCard}`).forEach((card, index) => {
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

      gsap.utils.toArray<HTMLElement>(`.${styles.projectVisual}`).forEach((visual) => {
        const placeholder = visual.querySelector(`.${styles.imagePlaceholder}`);
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

      gsap.utils.toArray<HTMLElement>(`.${styles.processItem}`).forEach((item) => {
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

      const statementWords = gsap.utils.toArray<HTMLElement>(`.${styles.statementWord}`);
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
      lenisRef.current.scrollTo(element as HTMLElement, { offset: -76, duration: 1.25 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main ref={rootRef} className={styles.page}>
      <div className={styles.loader} aria-hidden="true">
        <div className={styles.loaderInner}>
          <div className={styles.loaderWord}>
            <span>JIREH</span>
          </div>
          <div className={styles.loaderWord}>
            <span>GRP</span>
          </div>
          <div className={styles.loaderMeta}>
            <span>Systems that move business</span>
            <span>Addis Ababa / Africa & Beyond</span>
          </div>
          <div className={styles.loaderProgress}>
            <div className={styles.loaderProgressBar} />
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <a className={styles.logo} href="#top" onClick={(event) => { event.preventDefault(); scrollTo("#top"); }}>
          <span className={styles.logoMark}>J</span>
          <span className={styles.logoText}>
            JIREH
            <small>GRP</small>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <button type="button" onClick={() => scrollTo("#about")}>About</button>
          <button type="button" onClick={() => scrollTo("#services")}>Services</button>
          <button type="button" onClick={() => scrollTo("#work")}>Work</button>
          <button type="button" onClick={() => scrollTo("#approach")}>Approach</button>
        </nav>

        <a className={styles.headerCta} href="mailto:hello@jirehgrp.com">
          Start a project
          <ArrowUpRight size={16} />
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuInner}>
          {[
            ["About", "#about"],
            ["Services", "#services"],
            ["Work", "#work"],
            ["Approach", "#approach"],
            ["Contact", "#contact"],
          ].map(([label, href], index) => (
            <button key={href} type="button" onClick={() => scrollTo(href)}>
              <span>0{index + 1}</span>
              {label}
              <ArrowUpRight size={22} />
            </button>
          ))}
          <div className={styles.mobileMenuFooter}>
            <span>Addis Ababa</span>
            <a href="mailto:hello@jirehgrp.com">hello@jirehgrp.com</a>
          </div>
        </div>
      </div>

      <section id="top" className={styles.hero}>
        <CodeBackdrop />
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={styles.heroNoise} aria-hidden="true" />

        <div className={styles.heroTopline}>
          <span>Enterprise software studio</span>
          <span className={styles.heroToplineCenter}>
            <i /> Addis Ababa
          </span>
          <span>ERP / Platforms / Software</span>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <div className={styles.heroTitle}>
              <div className={styles.heroLineMask}>
                <h1 data-hero-reveal>WE BUILD THE</h1>
                <span className={styles.heroLineFlash} aria-hidden="true" />
              </div>
              <div className={styles.heroLineMask}>
                <h1 data-hero-reveal>SYSTEMS</h1>
                <span className={styles.heroLineFlash} aria-hidden="true" />
              </div>
              <div className={`${styles.heroLineMask} ${styles.heroLineAccent}`}>
                <h1 data-hero-reveal>BUSINESS RUNS ON.</h1>
                <span className={styles.heroLineFlash} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.heroMeta}>
              <p>
                Jirehgrp designs ERP solutions, internal business platforms,
                and custom software that help companies operate with clarity,
                move faster, and grow with confidence.
              </p>
              <ArrowLink href="#contact">Build with us</ArrowLink>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <SystemVisual />
          </aside>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll to explore</span>
          <span className={styles.scrollLine}>
            <ArrowDown size={16} />
          </span>
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.sectionLabel} data-reveal>
          <span>01</span>
          <span>Our point of view</span>
        </div>

        <p className={styles.statementText}>
          {"The best software does not add another layer of complexity. It removes friction, connects the operation, and gives every decision a clearer foundation."
            .split(" ")
            .map((word, index) => (
              <span className={styles.statementWord} key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
        </p>

        <div className={styles.statementFoot} data-reveal>
          <span>From fragmented workflows</span>
          <MoveRight size={24} strokeWidth={1.4} />
          <span>to one connected system</span>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...capabilityWords, ...capabilityWords].map((word, index) => (
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
            <span>Who we are</span>
          </div>

          <div className={styles.aboutHeading}>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>ENGINEERING WITH</h2>
            </div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>BUSINESS CONTEXT.</h2>
            </div>
          </div>
        </div>

        <div className={styles.aboutShowcase}>
          <LaptopCodeVisual />

          <div className={styles.aboutLead} data-reveal>
            <p className={styles.aboutLeadStatement}>
              Jireh Group builds digital systems that replace disconnected work
              with clear, dependable operations.
            </p>
            <p className={styles.aboutLeadDetail}>
              We bring business understanding, product thinking, and engineering
              into one team—mapping the operation, designing the system behind it,
              and staying close as it becomes part of how the company runs.
            </p>
          </div>
        </div>

        <div className={styles.aboutBody}>
          <div className={styles.factGrid}>
            {companyFacts.map((fact, index) => (
              <article className={styles.factCard} data-reveal key={fact.value}>
                <span>0{index + 1}</span>
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
              </article>
            ))}
          </div>

          <div className={styles.technology} data-reveal>
            <div className={styles.technologyHeader}>
              <span>Technology layer</span>
              <span>Chosen for the system—not for the trend</span>
            </div>
            <div className={styles.technologyList}>
              {technologyStack.map((technology) => (
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
            <span>What we build</span>
          </div>

          <div className={styles.servicesIntroSticky}>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>ONE PARTNER.</h2>
            </div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>THE WHOLE SYSTEM.</h2>
            </div>
            <p data-reveal>
              Strategy, product thinking, engineering, and long-term evolution —
              connected from the first operational question to the final release.
            </p>
            <ArrowLink href="#contact">Discuss your system</ArrowLink>
          </div>
        </div>

        <div className={styles.serviceList}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className={styles.serviceCard} key={service.number}>
                <div className={styles.serviceCardTop}>
                  <span className={styles.serviceNumber}>{service.number}</span>
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
                <ArrowRight className={styles.serviceArrow} size={24} strokeWidth={1.4} />
              </article>
            );
          })}
        </div>
      </section>

      <section id="work" className={styles.work}>
        <div className={styles.workHeading}>
          <div className={styles.sectionLabel} data-reveal>
            <span>04</span>
            <span>Selected systems</span>
          </div>

          <div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>BUILT FOR THE</h2>
            </div>
            <div className={`${styles.lineMask} ${styles.workHeadingOffset}`}>
              <h2 data-line-reveal>REAL OPERATION.</h2>
            </div>
          </div>
        </div>

        <div className={styles.projectList}>
          {projects.map((project) => (
            <article className={styles.project} key={project.number}>
              <div className={styles.projectVisual} data-reveal>
                <ImagePlaceholder label={project.imageLabel} index={project.number} />
              </div>
              <div className={styles.projectInfo} data-reveal>
                <div className={styles.projectMeta}>
                  <span>{project.number}</span>
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
                  View system
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.outcomes}>
        <div className={styles.outcomesHeader}>
          <div className={styles.sectionLabel} data-reveal>
            <span>05</span>
            <span>What changes</span>
          </div>
          <p data-reveal>
            Not software for the sake of software. A stronger way to run the business.
          </p>
        </div>

        <div className={styles.outcomeGrid}>
          <div className={styles.outcomeCard} data-reveal>
            <span className={styles.outcomeIndex}>A</span>
            <strong>ONE</strong>
            <h3>Source of truth</h3>
            <p>Everyone works from the same reliable operational picture.</p>
          </div>
          <div className={styles.outcomeCard} data-reveal>
            <span className={styles.outcomeIndex}>B</span>
            <strong>FEWER</strong>
            <h3>Manual handoffs</h3>
            <p>Routine work moves through the system instead of through memory.</p>
          </div>
          <div className={styles.outcomeCard} data-reveal>
            <span className={styles.outcomeIndex}>C</span>
            <strong>FASTER</strong>
            <h3>Decisions</h3>
            <p>Leaders see what matters without waiting for another report.</p>
          </div>
          <div className={styles.outcomeCard} data-reveal>
            <span className={styles.outcomeIndex}>D</span>
            <strong>READY</strong>
            <h3>For growth</h3>
            <p>The operational foundation scales as teams, branches, and complexity grow.</p>
          </div>
        </div>
      </section>

      <section id="approach" className={styles.approach}>
        <div className={styles.approachIntro}>
          <div className={styles.sectionLabel} data-reveal>
            <span>06</span>
            <span>How we work</span>
          </div>
          <div className={styles.approachHeading}>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>CLARITY BEFORE</h2>
            </div>
            <div className={styles.lineMask}>
              <h2 data-line-reveal>COMPLEXITY.</h2>
            </div>
          </div>
          <p data-reveal>
            We do not begin with a feature list. We begin with the business:
            what is happening, what is slowing it down, and what the right system
            must make possible.
          </p>
        </div>

        <div className={styles.processList}>
          {process.map((step) => (
            <article className={styles.processItem} key={step.number}>
              <div className={styles.processLine}>
                <span className={styles.processLineFill} />
              </div>
              <span className={styles.processNumber}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.contactGlow} aria-hidden="true" />
        <div className={styles.contactTop}>
          <div className={styles.sectionLabel} data-reveal>
            <span>07</span>
            <span>Start a conversation</span>
          </div>
          <span className={styles.contactAvailability} data-reveal>
            <i /> Open to ambitious projects
          </span>
        </div>

        <div className={styles.contactHeading}>
          <div className={styles.lineMask}>
            <h2 data-line-reveal>YOUR BUSINESS HAS</h2>
          </div>
          <div className={styles.lineMask}>
            <h2 data-line-reveal>A NEXT SYSTEM.</h2>
          </div>
          <div className={`${styles.lineMask} ${styles.contactAccent}`}>
            <h2 data-line-reveal>LET&apos;S BUILD IT.</h2>
          </div>
        </div>

        <div className={styles.contactBottom} data-reveal>
          <p>
            Tell us what is difficult, disconnected, or ready to scale. We&apos;ll
            help identify the right next step.
          </p>
          <a className={styles.contactButton} href="mailto:hello@jirehgrp.com">
            <span>hello@jirehgrp.com</span>
            <span className={styles.contactButtonIcon}>
              <ArrowUpRight size={28} strokeWidth={1.35} />
            </span>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogoMark}>J</span>
          <div>
            <strong>JIREHGRP</strong>
            <span>Systems that move business.</span>
          </div>
        </div>

        <div className={styles.footerContacts}>
          <div>
            <span>General</span>
            <a href="mailto:hello@jirehgrp.com">hello@jirehgrp.com</a>
          </div>
          <div>
            <span>Sales</span>
            <a href="mailto:sales@jirehgrp.com">sales@jirehgrp.com</a>
          </div>
          <div>
            <span>Support</span>
            <a href="mailto:support@jirehgrp.com">support@jirehgrp.com</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Jirehgrp</span>
          <span>Addis Ababa · Africa & Beyond</span>
          <button type="button" onClick={() => scrollTo("#top")}>Back to top ↑</button>
        </div>
      </footer>
    </main>
  );
}
