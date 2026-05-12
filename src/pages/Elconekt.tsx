import { useEffect, useRef, useCallback, useState } from "react";
import "./elconekt.css";

const ArrowIcon = ({ size = 12 }: { size?: number }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Elconekt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let animId: number;
    const mouse = { x: -9999, y: -9999 };
    const NODE_COUNT = 70;
    const MAX_DIST = 160;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number; accent: boolean }[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.6,
          pulse: Math.random() * Math.PI * 2,
          accent: Math.random() < 0.18,
        });
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, W, H);
      if (mouse.x > -9000) {
        const g = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(30,99,255,0.10)");
        g.addColorStop(1, "rgba(30,99,255,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, W, H);
      }
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.02;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.28;
            ctx!.strokeStyle = `rgba(7,27,70,${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        const a = nodes[i];
        const mdx = a.x - mouse.x, mdy = a.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 180) {
          ctx!.strokeStyle = `rgba(30,99,255,${(1 - md / 180) * 0.45})`;
          ctx!.lineWidth = 0.8;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }
      for (const n of nodes) {
        const breathe = 1 + Math.sin(n.pulse) * 0.3;
        if (n.accent) {
          ctx!.fillStyle = "rgba(30,99,255,0.95)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 1.6 * breathe, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = "rgba(30,99,255,0.15)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 5 * breathe, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          ctx!.fillStyle = "rgba(7,27,70,0.55)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * breathe, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      animId = requestAnimationFrame(tick);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    initNodes();
    animId = requestAnimationFrame(tick);
    window.addEventListener("resize", () => { resize(); initNodes(); });
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Scroll: nav state + progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      navRef.current?.classList.toggle("scrolled", y > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = ((y / h) * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver reveals
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".elconekt .reveal, .elconekt .reveal-stagger").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Animated stat counters
  useEffect(() => {
    const stats = document.querySelectorAll<HTMLElement>(".elconekt [data-count]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = parseInt(el.dataset.count!, 10);
            const dur = 1400;
            const start = performance.now();
            function step(t: number) {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.floor(eased * target).toString();
              if (p < 1) requestAnimationFrame(step);
              else el.textContent = target.toString();
            }
            requestAnimationFrame(step);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );
    stats.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);



  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="elconekt">
      <div className="progress" ref={progressRef} />

      {/* NAV */}
      <nav className="nav" ref={navRef} aria-label="Primary">
        <a className="nav__brand" href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-top"); }}>
          <img src="/elconekt-logo.png" alt="Elconekt" className="nav__logo" />
        </a>
        <ul className={`nav__menu${menuOpen ? " is-open" : ""}`}>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo("elc-top"); }}>Home</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo("elc-about"); }}>About</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo("elc-services"); }}>Services</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo("elc-industries"); }}>Industries</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo("elc-contact"); }}>Contact</a></li>
        </ul>
        <button className="nav__burger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`nav__burger-line${menuOpen ? " is-open" : ""}`} />
          <span className={`nav__burger-line${menuOpen ? " is-open" : ""}`} />
          <span className={`nav__burger-line${menuOpen ? " is-open" : ""}`} />
        </button>
        <a className="nav__cta" href="mailto:hello@elconekt.com">
          Talk to Us
          <ArrowIcon />
        </a>
      </nav>
      {menuOpen && <div className="nav__overlay" onClick={() => setMenuOpen(false)} />}

      {/* HERO */}
      <header className="hero" id="elc-top">
        <canvas className="hero__canvas" ref={canvasRef} />
        <div className="hero__grad" />
        <div className="container hero__inner">
          <div className="hero__meta">
            <span className="eyebrow">Intelligent Systems Integrator</span>
          </div>
          <h1 className="hero__title">
            <span className="word"><span>Engineering</span></span>{" "}
            <span className="word"><span>smarter,</span></span><br />
            <span className="word"><span className="accent">safer&nbsp;</span></span>
            <span className="word"><span>systems.</span></span>
          </h1>
          <p className="hero__sub">
            AI-powered digital solutions, intelligent systems, and enterprise-grade cybersecurity for modern organisations.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="mailto:hello@elconekt.com">
              Talk to Us
              <ArrowIcon size={14} />
            </a>
            <a className="btn btn--ghost" href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>
              Explore Services
              <RightArrowIcon />
            </a>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="scroll-cue__line" />
        </div>
      </header>

      {/* INTRO */}
      <section className="section" id="elc-about">
        <div className="container reveal">
          <div className="intro__layout">
            <div>
              <span className="eyebrow" style={{ marginBottom: 32, display: "inline-flex" }}>[ 02 — Who we are ]</span>
              <h2 className="intro__copy" style={{ marginTop: 24 }}>
                A technology partner<br />built <span className="accent">differently.</span>
              </h2>
            </div>
            <div className="intro__right">
              <p>Elconekt was founded on a simple belief: modern organisations need more than disconnected vendors. They need one trusted partner who can help them build, transform, and protect their operations.</p>
              <p>That's why we combine full stack development, intelligent systems, and cybersecurity under one roof, delivering integrated solutions designed for long-term growth.</p>
            </div>
          </div>
          <div className="principles reveal-stagger">
            <div className="principle">
              <span className="principle__num">01</span>
              <h4 className="principle__title">Engineering-led</h4>
              <p className="principle__desc">Senior expertise. Real accountability.</p>
            </div>
            <div className="principle">
              <span className="principle__num">02</span>
              <h4 className="principle__title"><span className="ai">AI</span>-enabled</h4>
              <p className="principle__desc">Intelligence embedded across every solution.</p>
            </div>
            <div className="principle">
              <span className="principle__num">03</span>
              <h4 className="principle__title">Security-first</h4>
              <p className="principle__desc">Protection built in from day one.</p>
            </div>
            <div className="principle">
              <span className="principle__num">04</span>
              <h4 className="principle__title">Vendor-neutral</h4>
              <p className="principle__desc">Technology chosen around your needs.</p>
            </div>
            <div className="principle">
              <span className="principle__num">05</span>
              <h4 className="principle__title">End-to-end</h4>
              <p className="principle__desc">From strategy through long-term support.</p>
            </div>
            <div className="principle">
              <span className="principle__num">06</span>
              <h4 className="principle__title">Global delivery</h4>
              <p className="principle__desc">Built to international standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee__track">
          {["Full Stack Development", "AI & Intelligent Systems", "Cybersecurity", "Managed Operations", "Full Stack Development", "AI & Intelligent Systems", "Cybersecurity", "Managed Operations"].map((word, i) => (
            <span className="marquee__item" key={i}>
              {word} <em>·</em>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="section section--surface" id="elc-services">
        <div className="container">
          <div className="section__header reveal">
            <div>
              <span className="eyebrow" style={{ marginBottom: 24, display: "inline-flex" }}>[ 03 — What we do ]</span>
              <h2 className="section__title" style={{ marginTop: 20 }}>
                Build.<br />Transform.<br />
                <span className="accent">Protect.</span>
              </h2>
            </div>
            <p className="section__lead">
              From digital products to defended infrastructure, we close the gap between strategy and the systems that actually run your business.
            </p>
          </div>

          <div className="services reveal-stagger">
            {/* Card 01 — Full Stack */}
            <article className="service-card">
              <div className="service-card__num">01 / Full Stack Development</div>
              <div className="service-card__viz">
                <div className="viz-layers">
                  <div className="viz-layers__stack">
                    <div className="viz-layers__row">
                      <div className="viz-layers__bar viz-layers__bar--front">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2z" stroke="currentColor" strokeWidth="1.2" /><path d="M2 6h12" stroke="currentColor" strokeWidth="1.2" /><circle cx="4.5" cy="4.5" r="0.8" fill="currentColor" /><circle cx="6.5" cy="4.5" r="0.8" fill="currentColor" /></svg>
                        <span>Interface</span>
                      </div>
                      <div className="viz-layers__flow"><span /><span /><span /></div>
                    </div>
                    <div className="viz-layers__row">
                      <div className="viz-layers__bar viz-layers__bar--api">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l-2 4 2 4M12 4l2 4-2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 3L7 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                        <span>Logic</span>
                      </div>
                      <div className="viz-layers__flow"><span /><span /><span /></div>
                    </div>
                    <div className="viz-layers__row">
                      <div className="viz-layers__bar viz-layers__bar--data">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="4" rx="5.5" ry="2.2" stroke="currentColor" strokeWidth="1.2" /><path d="M2.5 4v8c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2V4" stroke="currentColor" strokeWidth="1.2" /><path d="M2.5 8c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2" stroke="currentColor" strokeWidth="1.2" /></svg>
                        <span>Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="service-card__title">Full Stack Development</h3>
              <p className="service-card__desc">Modern websites, applications and digital platforms built to scale.</p>
              <div className="service-card__foot">
                <span>Capability</span>
                <span className="arrow"><ArrowIcon size={14} /></span>
              </div>
            </article>

            {/* Card 02 — AI Solutions */}
            <article className="service-card">
              <div className="service-card__num">02 / AI Solutions &amp; Intelligent Systems</div>
              <div className="service-card__viz">
                <div className="viz-network">
                  <svg className="viz-network__svg" viewBox="0 0 240 160" fill="none">
                    {/* Connections */}
                    <g className="viz-network__edges" stroke="var(--line)" strokeWidth="1">
                      <line x1="120" y1="80" x2="60" y2="36" />
                      <line x1="120" y1="80" x2="180" y2="36" />
                      <line x1="120" y1="80" x2="42" y2="100" />
                      <line x1="120" y1="80" x2="198" y2="100" />
                      <line x1="120" y1="80" x2="80" y2="140" />
                      <line x1="120" y1="80" x2="160" y2="140" />
                      <line x1="60" y1="36" x2="180" y2="36" className="viz-network__edge--faint" />
                      <line x1="42" y1="100" x2="80" y2="140" className="viz-network__edge--faint" />
                      <line x1="198" y1="100" x2="160" y2="140" className="viz-network__edge--faint" />
                    </g>
                    {/* Animated data dots traveling along edges */}
                    <circle className="viz-network__dot" r="2.5">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M120,80 L60,36" />
                    </circle>
                    <circle className="viz-network__dot" r="2.5">
                      <animateMotion dur="3.4s" repeatCount="indefinite" path="M120,80 L198,100" begin="0.6s" />
                    </circle>
                    <circle className="viz-network__dot" r="2.5">
                      <animateMotion dur="2.8s" repeatCount="indefinite" path="M120,80 L160,140" begin="1.2s" />
                    </circle>
                    {/* Outer nodes */}
                    <circle cx="60" cy="36" r="6" className="viz-network__node" />
                    <circle cx="180" cy="36" r="6" className="viz-network__node" />
                    <circle cx="42" cy="100" r="6" className="viz-network__node" />
                    <circle cx="198" cy="100" r="6" className="viz-network__node" />
                    <circle cx="80" cy="140" r="6" className="viz-network__node" />
                    <circle cx="160" cy="140" r="6" className="viz-network__node" />
                    {/* Centre node */}
                    <circle cx="120" cy="80" r="14" className="viz-network__hub" />
                    <circle cx="120" cy="80" r="14" className="viz-network__hub-ring" />
                    <circle cx="120" cy="80" r="22" className="viz-network__hub-glow" />
                    <text x="120" y="84" textAnchor="middle" className="viz-network__hub-label">AI</text>
                  </svg>
                </div>
              </div>
              <h3 className="service-card__title">AI Solutions &amp; Intelligent Systems</h3>
              <p className="service-card__desc">Practical AI implementation, intelligent automation, and connected systems.</p>
              <div className="service-card__foot">
                <span>Capability</span>
                <span className="arrow"><ArrowIcon size={14} /></span>
              </div>
            </article>

            {/* Card 03 — Cybersecurity */}
            <article className="service-card">
              <div className="service-card__num">03 / Cybersecurity &amp; Digital Resilience</div>
              <div className="service-card__viz">
                <div className="viz-lock">
                  <div className="viz-lock__rings">
                    <div className="viz-lock__ring viz-lock__ring--1" />
                    <div className="viz-lock__ring viz-lock__ring--2" />
                    <div className="viz-lock__ring viz-lock__ring--3" />
                  </div>
                  <svg className="viz-lock__icon" viewBox="0 0 64 72" fill="none">
                    <rect x="8" y="30" width="48" height="36" rx="6" fill="var(--navy)" />
                    <rect x="8" y="30" width="48" height="36" rx="6" stroke="var(--blue)" strokeWidth="1.2" strokeOpacity="0.4" />
                    <path d="M18 30V22a14 14 0 1 1 28 0v8" stroke="var(--navy)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M18 30V22a14 14 0 1 1 28 0v8" stroke="var(--blue)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
                    <circle cx="32" cy="46" r="4" fill="var(--blue)" />
                    <path d="M32 50v6" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="service-card__title">Cybersecurity &amp; Digital Resilience</h3>
              <p className="service-card__desc">Enterprise-grade security designed to protect and enable growth.</p>
              <div className="service-card__foot">
                <span>Capability</span>
                <span className="arrow"><ArrowIcon size={14} /></span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* AI CORE */}
      <section className="section" id="elc-ai">
        <div className="container">
          <div className="section__header reveal">
            <div>
              <span className="eyebrow" style={{ marginBottom: 24, display: "inline-flex" }}>[ 04 — The AI thread ]</span>
              <h2 className="section__title" style={{ marginTop: 20 }}>
                <span className="accent">AI</span><br />
                across everything<br />we deliver.
              </h2>
            </div>
            <p className="section__lead">
              AI is embedded across everything we deliver. From customer-facing apps to back-of-house operations and the security perimeter around them.
            </p>
          </div>

          <div className="ai-grid reveal-stagger">
            {[
              { icon: <><rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 8l1.5 1.5L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>, title: "AI-powered apps", desc: "Custom applications with machine learning and natural language built in from the start." },
              { icon: <><path d="M2.5 8a5.5 5.5 0 0 1 5.5-5.5M13.5 8a5.5 5.5 0 0 1-5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M8 2.5L6.5 4 8 5.5M8 13.5l1.5-1.5L8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></>, title: "Automation", desc: "Workflow automation that removes manual steps and connects your systems end to end." },
              { icon: <path d="M2 14V4M2 14h12M4.5 12V9M7.5 12V6M10.5 12V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />, title: "Analytics", desc: "Real-time data pipelines and dashboards that surface what matters and drive decisions." },
              { icon: <><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M8 2v2M8 14v-2M2 8h2M14 8h-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Computer vision", desc: "Surveillance, quality inspection, and visual recognition systems deployed at the edge." },
              { icon: <><path d="M8 1.5L13.5 4.5V9.5C13.5 12 11 14 8 14.5 5 14 2.5 12 2.5 9.5V4.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5.5 8l2 2L11 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>, title: "Cyber defence", desc: "AI-driven threat detection, anomaly monitoring, and automated incident response." },
              { icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></>, title: "Managed operations", desc: "Continuous monitoring, optimisation, and support powered by intelligent tooling." },
            ].map((item, i) => (
              <div className="ai-grid__card" key={i}>
                <div className="ai-grid__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{item.icon}</svg>
                </div>
                <h4 className="ai-grid__title">{item.title}</h4>
                <p className="ai-grid__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <div>
              <span className="eyebrow" style={{ marginBottom: 24, display: "inline-flex" }}>[ 05 — Why Elconekt ]</span>
              <h2 className="section__title" style={{ marginTop: 20 }}>Six reasons<br />leaders<br />choose us.</h2>
            </div>
            <p className="section__lead">
              We're built for the moments that matter. The launch that can't slip, the breach that can't happen, the system that has to scale. <strong>No middlemen. No lock-in. No surprises.</strong>
            </p>
          </div>

          <div className="why-grid reveal-stagger">
            {[
              { num: "01", title: "Engineering-led", desc: "Senior engineers run the room. No account managers between you and the build.", icon: <><circle className="ink" cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="1.4" /><path className="ink" d="M6 28h44M28 6v44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.45" /><path className="blue" d="M14 32 L20 28 L24 30 L30 18 L34 26 L40 22 L46 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle className="blue" cx="30" cy="18" r="2.5" fill="currentColor" /></> },
              { num: "02", title: "Vendor-neutral", desc: "We pick the right tools for your problem, not the easy ones for our margin.", icon: <><path className="ink" d="M28 4 L48 16 V40 L28 52 L8 40 V16 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path className="ink" d="M28 4 V28 M48 16 L28 28 M8 16 L28 28 M28 28 V52" stroke="currentColor" strokeWidth="1" opacity="0.45" /><circle className="blue" cx="28" cy="28" r="5" fill="currentColor" /><circle className="blue" cx="28" cy="4" r="2.5" fill="currentColor" /><circle className="blue" cx="48" cy="16" r="2.5" fill="currentColor" /><circle className="blue" cx="8" cy="40" r="2.5" fill="currentColor" /></> },
              { num: "03", title: "Security-first", desc: "Threat modelling, hardened defaults, and monitored response. Baked in, not bolted on.", icon: <><path className="ink" d="M28 4 L46 12 V26 C46 38 38 48 28 52 C18 48 10 38 10 26 V12 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path className="ink" d="M28 12 L40 17 V26 C40 34 35 41 28 44 C21 41 16 34 16 26 V17 Z" stroke="currentColor" strokeWidth="1" opacity="0.45" strokeLinejoin="round" /><path className="blue" d="M22 27 L26 31 L34 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle className="blue" cx="28" cy="4" r="2" fill="currentColor" /></> },
              { num: "04", title: "AI-enabled", desc: "AI-accelerated workflows compress what used to take quarters into weeks.", icon: <><path className="ink" d="M6 36 L18 24 L28 32 L40 14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" opacity="0.45" /><path className="ink" d="M6 44 L18 32 L28 40 L40 22" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" opacity="0.7" /><path className="blue" d="M14 50 L26 38 L36 46 L50 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /><path className="blue" d="M42 24 H50 V32" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /><circle className="blue" cx="50" cy="24" r="2.5" fill="currentColor" /></> },
              { num: "05", title: "End-to-end", desc: "Strategy, build, run, defend. One accountable team across the full lifecycle.", icon: <><circle className="ink" cx="10" cy="28" r="5" stroke="currentColor" strokeWidth="1.4" /><circle className="ink" cx="28" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" /><circle className="ink" cx="46" cy="28" r="5" stroke="currentColor" strokeWidth="1.4" /><circle className="ink" cx="28" cy="42" r="5" stroke="currentColor" strokeWidth="1.4" /><path className="blue" d="M14 26 L24 16 M32 16 L42 26 M42 30 L32 40 M24 40 L14 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle className="blue" cx="28" cy="28" r="3" fill="currentColor" /></> },
              { num: "06", title: "Enterprise-grade", desc: "Architected for organisations that operate under regulation, scrutiny, and scale.", icon: <><rect className="ink" x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect className="ink" x="20" y="20" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect className="blue" x="20" y="20" width="16" height="16" fill="currentColor" fillOpacity="0.15" /><path className="blue" d="M20 28h16M28 20v16" stroke="currentColor" strokeWidth="1.4" /><circle className="blue" cx="28" cy="28" r="2" fill="currentColor" /></> },
            ].map((cell) => (
              <div className="why-cell" key={cell.num}>
                <span className="why-cell__watermark">{cell.num}</span>
                <div className="why-cell__head">
                  <span className="why-cell__num">Reason {cell.num}</span>
                  <svg className="why-cell__icon" viewBox="0 0 56 56" fill="none">{cell.icon}</svg>
                </div>
                <div className="why-cell__body">
                  <h3 className="why-cell__title">{cell.title}</h3>
                  <p className="why-cell__desc">{cell.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section--surface" id="elc-industries">
        <div className="container">
          <div className="section__header reveal">
            <div>
              <span className="eyebrow" style={{ marginBottom: 24, display: "inline-flex" }}>[ 06 — Where we work ]</span>
              <h2 className="section__title" style={{ marginTop: 20 }}>Sectors<br />we serve.</h2>
            </div>
            <p className="section__lead">From sovereign infrastructure to scaling SMEs. We operate across industries where the cost of failure is real and the standard for delivery is higher.</p>
          </div>

          <div className="industries-grid reveal-stagger">
            {[
              { num: "01", title: "Government", sub: "Sovereign · Public sector", icon: <><path className="ink" d="M10 78 H82 M14 78 V40 M78 78 V40 M10 40 L46 16 L82 40" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /><path className="ink" d="M24 78 V50 H32 V78 M40 78 V50 H48 V78 M56 78 V50 H64 V78" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path className="blue" d="M40 30 L46 26 L52 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle className="blue" cx="46" cy="22" r="2.5" fill="currentColor" /></> },
              { num: "02", title: "Enterprise", sub: "Scale · Complex orgs", icon: <><rect className="ink" x="14" y="26" width="32" height="52" stroke="currentColor" strokeWidth="1.4" /><rect className="ink" x="46" y="40" width="32" height="38" stroke="currentColor" strokeWidth="1.4" /><path className="ink" d="M14 78 H78" stroke="currentColor" strokeWidth="1.4" /><path className="ink" d="M22 36 H26 M34 36 H38 M22 48 H26 M34 48 H38 M22 60 H26 M34 60 H38 M54 50 H58 M66 50 H70 M54 62 H58 M66 62 H70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><rect className="blue" x="28" y="68" width="6" height="10" fill="currentColor" /><circle className="blue" cx="62" cy="32" r="3" fill="currentColor" /></> },
              { num: "03", title: "Banking", sub: "Finance · Regulated", icon: <><path className="ink" d="M10 36 L46 16 L82 36" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /><path className="ink" d="M14 36 V72 M78 36 V72 M10 72 H82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path className="ink" d="M26 42 V66 M40 42 V66 M52 42 V66 M66 42 V66" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path className="blue" d="M22 80 H70" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle className="blue" cx="46" cy="26" r="3" fill="currentColor" /></> },
              { num: "04", title: "Healthcare", sub: "Clinical · Critical care", icon: <><path className="ink" d="M10 46 H30 L36 30 L46 62 L54 38 L60 46 H82" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" /><circle className="ink" cx="46" cy="46" r="32" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.55" /><circle className="blue" cx="46" cy="46" r="4" fill="currentColor" /><path className="blue" d="M70 18 a14 14 0 1 1 -14 -2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></> },
              { num: "05", title: "Telecom", sub: "Networks · Carriers", icon: <><path className="ink" d="M16 50 a30 30 0 0 1 60 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.4" /><path className="ink" d="M26 56 a20 20 0 0 1 40 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" /><path className="blue" d="M36 62 a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /><circle className="blue" cx="46" cy="66" r="4" fill="currentColor" /><path className="ink" d="M46 70 V82 M40 82 H52" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
              { num: "06", title: "Oil & Gas", sub: "Energy · Upstream", icon: <><path className="ink" d="M46 10 C56 26 70 36 70 54 a24 24 0 1 1 -48 0 C22 36 36 26 46 10 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" /><path className="blue" d="M34 56 a12 12 0 0 0 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /><ellipse className="blue" cx="46" cy="56" rx="6" ry="9" fill="currentColor" opacity="0.18" /><circle className="blue" cx="46" cy="58" r="3" fill="currentColor" /></> },
              { num: "07", title: "Education", sub: "Learning · Research", icon: <><path className="ink" d="M8 36 L46 18 L84 36 L46 54 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" /><path className="ink" d="M22 44 V62 C22 70 34 76 46 76 C58 76 70 70 70 62 V44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path className="blue" d="M78 40 V62" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle className="blue" cx="78" cy="66" r="3" fill="currentColor" /><circle className="blue" cx="46" cy="36" r="3" fill="currentColor" /></> },
              { num: "08", title: "SMEs", sub: "Growth-stage · Agile", icon: <><rect className="ink" x="14" y="32" width="64" height="48" stroke="currentColor" strokeWidth="1.4" /><path className="ink" d="M32 32 V22 C32 18 34 16 38 16 H54 C58 16 60 18 60 22 V32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path className="ink" d="M14 50 H78" stroke="currentColor" strokeWidth="1.4" /><path className="blue" d="M40 56 L50 56 M40 64 L58 64 M40 72 L46 72" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path className="blue" d="M40 50 V44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></> },
            ].map((ind) => (
              <div className="industry" key={ind.num}>
                <div className="industry__top">
                  <span className="industry__num">/ {ind.num}</span>
                  <span className="industry__dot" />
                </div>
                <svg className="industry__icon" viewBox="0 0 92 92" fill="none">{ind.icon}</svg>
                <h3 className="industry__title">{ind.title}</h3>
                <p className="industry__sub">{ind.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CLOSE */}
      <section className="cta-close" id="elc-contact">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 40, display: "inline-flex" }}>[ 07 — Start a conversation ]</span>
            <h2 className="cta-close__title" style={{ marginTop: 32 }}>
              Let's build<br />something <span className="accent">smarter</span>—<br />and <span className="accent">safer.</span>
            </h2>
          </div>
          <div className="cta-close__row reveal">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn btn--primary" href="mailto:hello@elconekt.com">
                Talk to Us
                <ArrowIcon size={14} />
              </a>
              <a className="btn btn--ghost" href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }} style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
                Explore Services
                <RightArrowIcon />
              </a>
            </div>
            <div className="cta-close__meta">
              <span>hello@elconekt.com</span>
              <span>·</span>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <div className="footer__brand">
                <img src="/elconekt-logo.png" alt="Elconekt" className="footer__logo" />
              </div>
              <p className="footer__tag">An AI-enabled intelligent systems integrator and technology consultancy. Engineering smarter, safer systems.</p>
            </div>
            <div className="footer__col">
              <h5>Company</h5>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-about"); }}>About</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>Services</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-industries"); }}>Industries</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-contact"); }}>Contact</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Capabilities</h5>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>Full Stack Development</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>AI &amp; Intelligent Systems</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>Cybersecurity</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>Managed Operations</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Contact</h5>
              <ul>
                <li><a href="mailto:hello@elconekt.com">hello@elconekt.com</a></li>
                <li><span>London, United Kingdom</span></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Elconekt Ltd. All rights reserved.</span>
            <div className="footer__socials">
              <a href="#" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zm7.5 0H12v2.18h.07c.63-1.18 2.17-2.42 4.46-2.42 4.77 0 5.65 3.14 5.65 7.23V24h-5v-7.62c0-1.82-.03-4.17-2.54-4.17-2.55 0-2.94 1.99-2.94 4.04V24h-5z" /></svg></a>
              <a href="#" aria-label="X"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="#" aria-label="GitHub"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.72.08-.72 1.21.08 1.84 1.24 1.84 1.24 1.08 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.81 5.62-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0012 .3" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
