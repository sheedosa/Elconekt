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
  const stageRef = useRef<HTMLDivElement>(null);
  const connectionsRef = useRef<SVGGElement>(null);
  const pulsesRef = useRef<SVGGElement>(null);
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

  // AI Core: position nodes + draw SVG connections with pulses (responsive)
  useEffect(() => {
    const stage = stageRef.current;
    const connG = connectionsRef.current;
    const pulseG = pulsesRef.current;
    if (!stage || !connG || !pulseG) return;

    const anims: number[] = [];

    function layout() {
      while (connG.firstChild) connG.removeChild(connG.firstChild);
      while (pulseG.firstChild) pulseG.removeChild(pulseG.firstChild);
      anims.forEach((id) => cancelAnimationFrame(id));
      anims.length = 0;

      const stageRect = stage.getBoundingClientRect();
      const stageW = stageRect.width;
      const scale = stageW / 720;
      const radius = 280 * scale;
      const innerR = 88 * scale;
      const cx = 360, cy = 360;

      const nodes = stage.querySelectorAll<HTMLElement>(".ai-core__node");
      const points: { x: number; y: number }[] = [];

      nodes.forEach((n, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        n.style.setProperty("--tx", `calc(-50% + ${x}px)`);
        n.style.setProperty("--ty", `calc(-50% + ${y}px)`);
        n.style.transform = `translate(var(--tx), var(--ty))`;
        n.style.animationDelay = `${i * 0.4}s`;
        const svgX = cx + (x / scale);
        const svgY = cy + (y / scale);
        points.push({ x: svgX, y: svgY });
      });

      const svgInnerR = innerR / scale;
      points.forEach((p, i) => {
        const dx = p.x - cx, dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sx = cx + (dx / dist) * svgInnerR;
        const sy = cy + (dy / dist) * svgInnerR;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(sx));
        line.setAttribute("y1", String(sy));
        line.setAttribute("x2", String(p.x));
        line.setAttribute("y2", String(p.y));
        line.setAttribute("class", "conn");
        connG.appendChild(line);

        const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pulse.setAttribute("r", String(Math.max(2.5, 4 * scale)));
        pulse.setAttribute("class", "pulse");
        pulseG.appendChild(pulse);

        const dur = 2400 + i * 220;
        const offset = i * 400;
        function animate(t: number) {
          const p2 = ((t + offset) % dur) / dur;
          pulse.setAttribute("cx", String(sx + (p.x - sx) * p2));
          pulse.setAttribute("cy", String(sy + (p.y - sy) * p2));
          pulse.setAttribute("opacity", String(Math.sin(p2 * Math.PI)));
          anims[i] = requestAnimationFrame(animate);
        }
        anims[i] = requestAnimationFrame(animate);
      });
    }

    layout();
    window.addEventListener("resize", layout);

    return () => {
      window.removeEventListener("resize", layout);
      anims.forEach((id) => cancelAnimationFrame(id));
      while (connG.firstChild) connG.removeChild(connG.firstChild);
      while (pulseG.firstChild) pulseG.removeChild(pulseG.firstChild);
    };
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
                <div className="viz-stack">
                  <div className="viz-stack__window">
                    <div className="viz-stack__chrome">
                      <div className="viz-stack__chrome-dots"><span /><span /><span /></div>
                      <div className="viz-stack__chrome-title">~/elconekt/app.tsx</div>
                    </div>
                    <div className="viz-stack__lines">
                      <div className="viz-stack__line"><span className="tok k" style={{ width: 24 }} /><span className="tok n" style={{ width: 42 }} /><span className="tok p" style={{ width: 8 }} /></div>
                      <div className="viz-stack__line"><span className="tok k" style={{ width: 18 }} /><span className="tok n" style={{ width: 30 }} /><span className="tok s" style={{ width: 54 }} /></div>
                      <div className="viz-stack__line"><span className="tok n" style={{ width: 36 }} /><span className="tok d" style={{ width: 22 }} /><span className="tok s" style={{ width: 40 }} /></div>
                      <div className="viz-stack__line"><span className="tok k" style={{ width: 14 }} /><span className="tok n" style={{ width: 28 }} /><span className="tok p" style={{ width: 6 }} /><span className="tok d" style={{ width: 30 }} /></div>
                      <div className="viz-stack__line"><span className="tok p" style={{ width: 10 }} /></div>
                      <div className="viz-stack__line"><span className="tok k" style={{ width: 20 }} /><span className="tok n" style={{ width: 46 }} /><span className="tok-caret" /></div>
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
                <div className="viz-orbit">
                  <div className="viz-orbit__hud">Neural · Online</div>
                  <div className="viz-orbit__field">
                    <svg className="viz-orbit__svg" viewBox="0 0 220 180" fill="none">
                      <defs>
                        <path id="p1" d="M110 90 L110 25" />
                        <path id="p2" d="M110 90 L191 58" />
                        <path id="p3" d="M110 90 L191 122" />
                        <path id="p4" d="M110 90 L110 155" />
                        <path id="p5" d="M110 90 L29 122" />
                        <path id="p6" d="M110 90 L29 58" />
                      </defs>
                      <g stroke="rgba(7,27,70,0.16)" strokeWidth="1" strokeDasharray="2 4" fill="none">
                        <use href="#p1" /><use href="#p2" /><use href="#p3" />
                        <use href="#p4" /><use href="#p5" /><use href="#p6" />
                      </g>
                      <g stroke="rgba(30,99,255,0.18)" strokeWidth="1" fill="none">
                        <polygon points="110,25 191,58 191,122 110,155 29,122 29,58" strokeDasharray="3 4" />
                      </g>
                      <circle className="viz-orbit__pulse" r="3" style={{ offsetPath: "path('M110 90 L110 25')" }} />
                      <circle className="viz-orbit__pulse" r="3" style={{ offsetPath: "path('M110 90 L191 58')" }} />
                      <circle className="viz-orbit__pulse" r="3" style={{ offsetPath: "path('M110 90 L191 122')" }} />
                      <circle className="viz-orbit__pulse" r="3" style={{ offsetPath: "path('M110 90 L29 122')" }} />
                      <circle className="viz-orbit__pulse" r="3" style={{ offsetPath: "path('M110 90 L29 58')" }} />
                    </svg>
                    <div className="viz-orbit__hex viz-orbit__hex--inner" />
                    <div className="viz-orbit__core"><span>AI</span></div>
                    <div className="viz-orbit__node viz-orbit__node--1" />
                    <div className="viz-orbit__node accent viz-orbit__node--2" />
                    <div className="viz-orbit__node viz-orbit__node--3" />
                    <div className="viz-orbit__node viz-orbit__node--4" />
                    <div className="viz-orbit__node accent viz-orbit__node--5" />
                    <div className="viz-orbit__node viz-orbit__node--6" />
                  </div>
                  <div className="viz-orbit__meta">7 nodes · live</div>
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
                <div className="viz-shield">
                  <span className="viz-shield__corner viz-shield__corner--tl" />
                  <span className="viz-shield__corner viz-shield__corner--tr" />
                  <span className="viz-shield__corner viz-shield__corner--bl" />
                  <span className="viz-shield__corner viz-shield__corner--br" />
                  <div className="viz-shield__hud">Monitoring · 24/7</div>
                  <div className="viz-shield__field">
                    <svg className="viz-shield__svg" viewBox="0 0 200 180" fill="none">
                      <defs>
                        <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1E63FF" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#1E63FF" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="sho" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#071B46" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#1E63FF" stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                      <path d="M100 20 L162 42 V96 C162 132 134 158 100 168 C66 158 38 132 38 96 V42 Z" fill="url(#shg)" stroke="url(#sho)" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M100 36 L148 53 V93 C148 122 128 144 100 152 C72 144 52 122 52 93 V53 Z" fill="none" stroke="#1E63FF" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 3" strokeLinejoin="round" />
                      <g stroke="rgba(7,27,70,0.15)" strokeWidth="0.8">
                        <line x1="100" y1="42" x2="100" y2="50" />
                        <line x1="100" y1="144" x2="100" y2="152" />
                        <line x1="54" y1="96" x2="62" y2="96" />
                        <line x1="138" y1="96" x2="146" y2="96" />
                      </g>
                      <circle cx="100" cy="96" r="16" fill="#071B46" />
                      <circle cx="100" cy="96" r="16" fill="none" stroke="#1E63FF" strokeOpacity="0.5" strokeWidth="1" />
                      <path d="M93 96 l5 5 l10 -11" stroke="#1E63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <div className="viz-shield__scan" />
                    <div className="viz-shield__pulse" />
                    <div className="viz-shield__pulse viz-shield__pulse--2" />
                    <div className="viz-shield__pulse viz-shield__pulse--3" />
                    <span className="viz-shield__threat viz-shield__threat--1" />
                    <span className="viz-shield__threat viz-shield__threat--2" />
                    <span className="viz-shield__threat viz-shield__threat--3" />
                  </div>
                  <div className="viz-shield__meta">3 threats · blocked</div>
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
      <section className="section section--tight">
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
        </div>

        <div className="ai-core reveal">
          <div className="ai-core__bg" />
          <div className="ai-core__sweep" />
          <div className="ai-core__telemetry ai-core__telemetry--tl">
            <span className="pulse-dot" />
            <span>System · <span className="v">Online</span></span>
          </div>
          <div className="ai-core__telemetry ai-core__telemetry--tr"><span>Model v2026.1</span></div>
          <div className="ai-core__telemetry ai-core__telemetry--bl"><span>Latency · <span className="v">24ms</span></span></div>
          <div className="ai-core__telemetry ai-core__telemetry--br"><span>Lat 51.5074°N · Lon 0.1278°W</span></div>
          <div className="ai-core__ring ai-core__ring--1" />
          <div className="ai-core__ring ai-core__ring--2" />
          <svg className="ai-core__ticks" viewBox="0 0 540 540" fill="none">
            <g stroke="rgba(7,27,70,0.18)" strokeWidth="1">
              <line x1="270" y1="0" x2="270" y2="10" />
              <line x1="270" y1="540" x2="270" y2="530" />
              <line x1="0" y1="270" x2="10" y2="270" />
              <line x1="540" y1="270" x2="530" y2="270" />
            </g>
            <g stroke="rgba(7,27,70,0.10)" strokeWidth="1">
              <line x1="60" y1="135" x2="68" y2="140" />
              <line x1="480" y1="135" x2="472" y2="140" />
              <line x1="60" y1="405" x2="68" y2="400" />
              <line x1="480" y1="405" x2="472" y2="400" />
            </g>
          </svg>

          <div className="ai-core__stage" ref={stageRef}>
            <svg className="ai-core__svg" viewBox="0 0 720 720" preserveAspectRatio="none">
              <defs>
                <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1E63FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1E63FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g ref={connectionsRef} />
              <g ref={pulsesRef} />
            </svg>

            <div className="ai-core__center">
              <div className="ai-core__center-inner">
                <div className="ai-core__center-glyph">AI</div>
                <div className="ai-core__center-meta">Core · v2026.1</div>
              </div>
            </div>

            {[
              { icon: <><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" /><path d="M5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>, label: "AI Apps", sub: "Production · 12" },
              { icon: <><path d="M2 7a5 5 0 0 1 5-5M12 7a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M7 2l-1.5 1.5L7 5M7 12l1.5-1.5L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></>, label: "Automation", sub: "Workflows · Live" },
              { icon: <path d="M2 12 V4 M2 12 H12 M4 10 V8 M7 10 V5 M10 10 V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />, label: "Analytics", sub: "24/7 · streaming" },
              { icon: <><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" /><path d="M7 1.5v2M7 10.5v2M1.5 7h2M10.5 7h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, label: "Surveillance", sub: "Real-time · CV" },
              { icon: <><path d="M7 1.5 L12 4 V8 C12 10.5 9.5 12 7 12.5 C4.5 12 2 10.5 2 8 V4 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 7l1.5 1.5L9 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></>, label: "Cyber Defence", sub: "SOC · 24/7" },
              { icon: <><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" /><path d="M7 4 V7 L9 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, label: "Operations", sub: "Managed · 99.9%" },
            ].map((node, i) => (
              <div className="ai-core__node" key={i}>
                <span className="ai-core__node-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">{node.icon}</svg>
                </span>
                <span className="ai-core__node-text">
                  <span className="ai-core__node-label">{node.label}</span>
                  <span className="ai-core__node-sub">{node.sub}</span>
                </span>
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
