import { useEffect, useCallback } from "react";
import { ArrowIcon, RightArrowIcon } from "../components/Layout";
import { Link } from "react-router-dom";
import { useReveal } from "../motion/useReveal";
import { useParallax } from "../motion/useParallax";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import { smoothScrollTo } from "../motion/SmoothScroll";
import { prefersReducedMotion } from "../motion/env";
import HeroNodeBackground from "../motion/HeroNodeBackground";

export default function Elconekt() {
  useReveal();
  useParallax();
  useMagnetic();
  useTextReveal();

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
    if (prefersReducedMotion()) {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
    } else {
      smoothScrollTo("#" + id, -20);
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <header className="hero" id="elc-top">
        <HeroNodeBackground />
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
            <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
              Talk to Us
              <ArrowIcon size={14} />
            </Link>
            <a className="btn btn--ghost" href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }} data-magnetic="0.3">
              Explore Services
              <RightArrowIcon />
            </a>
          </div>
        </div>
      </header>

      {/* INTRO */}
      <section className="section" id="elc-about">
        <div className="container">
          <div className="intro__layout">
            <div>
              <h2 className="intro__copy" data-reveal-text>
                A technology partner<br />built <span className="accent">differently.</span>
              </h2>
            </div>
            <div className="intro__right reveal" data-parallax="-0.08">
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
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Build.<br />Transform.<br />
                <span className="accent">Protect.</span>
              </h2>
            </div>
            <p className="section__lead reveal">
              From digital products to defended infrastructure, we close the gap between strategy and the systems that actually run your business.
            </p>
          </div>

          <div className="services reveal-stagger">
            {/* Card 01 — Full Stack */}
            <article className="service-card">
              <div className="service-card__viz">
                <div className="viz-layers viz-devices">
                  {/* Desktop browser mockup */}
                  <div className="viz-devices__desktop" aria-hidden="true">
                    <div className="viz-devices__chrome">
                      <span /><span /><span />
                      <div className="viz-devices__url" />
                    </div>
                    <div className="viz-devices__screen">
                      <div className="viz-devices__sidebar">
                        <span /><span /><span /><span />
                      </div>
                      <div className="viz-devices__main">
                        <div className="viz-devices__hero" />
                        <div className="viz-devices__grid">
                          <span /><span /><span />
                        </div>
                        <div className="viz-devices__row" />
                        <div className="viz-devices__row viz-devices__row--short" />
                      </div>
                    </div>
                  </div>
                  {/* Phone mockup */}
                  <div className="viz-devices__phone" aria-hidden="true">
                    <div className="viz-devices__notch" />
                    <div className="viz-devices__phone-screen">
                      <div className="viz-devices__phone-header" />
                      <div className="viz-devices__phone-card" />
                      <div className="viz-devices__phone-row" />
                      <div className="viz-devices__phone-row viz-devices__phone-row--short" />
                      <div className="viz-devices__phone-dock">
                        <span /><span /><span /><span />
                      </div>
                    </div>
                  </div>
                  {/* Component tag floating to suggest software structure */}
                  <div className="viz-devices__tag" aria-hidden="true">
                    <span className="viz-devices__tag-dot" />
                    <span>&lt;Component /&gt;</span>
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
              <div className="service-card__viz">
                <div className="viz-network viz-brain">
                  <svg className="viz-brain__svg" viewBox="0 0 200 200" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      <radialGradient id="vizBrainCore" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                        <stop offset="35%" stopColor="rgba(255,255,255,0.45)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </radialGradient>
                    </defs>

                    {/* Outer brain contour — soft organic boundary, dotted */}
                    <path
                      className="viz-brain__contour"
                      d="M 100,18 C 142,18 178,52 178,100 C 178,148 142,182 100,182 C 58,182 22,148 22,100 C 22,52 58,18 100,18 Z"
                    />

                    {/* Counter-rotating dotted orbit — visual depth */}
                    <g className="viz-brain__orbit">
                      <circle cx="100" cy="100" r="60" />
                    </g>

                    {/* Background glow disc */}
                    <circle cx="100" cy="100" r="46" fill="url(#vizBrainCore)" />

                    {/* Synaptic curves — eight radial axons curving outward from the
                        core to perimeter neurons, mirrored for radial symmetry. */}
                    <g className="viz-brain__synapses">
                      <path d="M 100,100 Q 124,88 152,68" />
                      <path d="M 100,100 Q 132,100 168,100" />
                      <path d="M 100,100 Q 124,112 152,132" />
                      <path d="M 100,100 Q 108,124 100,168" />
                      <path d="M 100,100 Q 76,112 48,132" />
                      <path d="M 100,100 Q 68,100 32,100" />
                      <path d="M 100,100 Q 76,88 48,68" />
                      <path d="M 100,100 Q 92,76 100,32" />
                    </g>

                    {/* Active synapses — opposite-pair firing pattern */}
                    <g className="viz-brain__synapses-active">
                      <path d="M 100,100 Q 124,88 152,68" />
                      <path d="M 100,100 Q 76,112 48,132" />
                    </g>

                    {/* Pulse particles travelling synapses — staggered timings
                        across all four quadrants so the firing reads as continuous. */}
                    <circle r="2" className="viz-brain__pulse">
                      <animateMotion dur="2.4s" repeatCount="indefinite" path="M 100,100 Q 124,88 152,68" />
                    </circle>
                    <circle r="2" className="viz-brain__pulse">
                      <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.6s" path="M 100,100 Q 76,112 48,132" />
                    </circle>
                    <circle r="1.6" className="viz-brain__pulse">
                      <animateMotion dur="3s" repeatCount="indefinite" begin="1.1s" path="M 100,100 Q 132,100 168,100" />
                    </circle>
                    <circle r="1.6" className="viz-brain__pulse">
                      <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.6s" path="M 100,100 Q 92,76 100,32" />
                    </circle>
                    <circle r="1.4" className="viz-brain__pulse">
                      <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.1s" path="M 100,100 Q 108,124 100,168" />
                    </circle>

                    {/* Expanding thought-ripples emanating from the core */}
                    <circle cx="100" cy="100" r="22" className="viz-brain__halo" />
                    <circle cx="100" cy="100" r="22" className="viz-brain__halo viz-brain__halo--late" />

                    {/* Outer neurons at synapse endpoints — radially symmetric */}
                    <circle cx="152" cy="68" r="3.6" className="viz-brain__neuron viz-brain__neuron--firing" />
                    <circle cx="168" cy="100" r="3.6" className="viz-brain__neuron" />
                    <circle cx="152" cy="132" r="3.6" className="viz-brain__neuron" />
                    <circle cx="100" cy="168" r="3.6" className="viz-brain__neuron" />
                    <circle cx="48" cy="132" r="3.6" className="viz-brain__neuron viz-brain__neuron--firing" />
                    <circle cx="32" cy="100" r="3.6" className="viz-brain__neuron" />
                    <circle cx="48" cy="68" r="3.6" className="viz-brain__neuron" />
                    <circle cx="100" cy="32" r="3.6" className="viz-brain__neuron" />

                    {/* Central neural core — bright white nucleus, the heart */}
                    <circle cx="100" cy="100" r="14" className="viz-brain__core" />
                    <circle cx="100" cy="100" r="5" className="viz-brain__core-inner" />
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
              <div className="service-card__viz">
                <div className="viz-lock viz-defense">
                  <svg className="viz-defense__svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
                    <defs>
                      <radialGradient id="vizDefenseGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(30, 99, 255, 0.20)" />
                        <stop offset="55%" stopColor="rgba(30, 99, 255, 0.05)" />
                        <stop offset="100%" stopColor="rgba(30, 99, 255, 0)" />
                      </radialGradient>
                      <linearGradient id="vizShieldFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.14)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                      </linearGradient>
                    </defs>

                    {/* Soft theme-blue ambient glow */}
                    <circle cx="100" cy="100" r="96" fill="url(#vizDefenseGlow)" />

                    {/* Two staggered expanding rings — the only ambient motion */}
                    <circle cx="100" cy="100" r="58" className="viz-defense__pulse" />
                    <circle cx="100" cy="100" r="58" className="viz-defense__pulse viz-defense__pulse--late" />

                    {/* The shield — written in absolute viewBox coordinates so no
                        inline transform conflicts with CSS hover transforms. */}
                    <path
                      className="viz-defense__shield"
                      d="M 100,50 L 140,66 L 140,108 C 140,134 122,150 100,158 C 78,150 60,134 60,108 L 60,66 Z"
                    />

                    {/* Check mark — theme blue accent */}
                    <path
                      className="viz-defense__check"
                      d="M 82,104 L 94,116 L 118,90"
                    />
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
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                <span className="accent">AI</span><br />
                across everything<br />we deliver.
              </h2>
            </div>
            <p className="section__lead reveal">
              AI is embedded across everything we deliver. From customer-facing apps to back-of-house operations and the security perimeter around them.
            </p>
          </div>

          <div className="ai-grid reveal-stagger">
            {[
              {
                // AI-powered apps — CPU / chip
                icon: (
                  <>
                    <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.18" />
                    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
                    <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </>
                ),
                title: "AI-powered apps",
                desc: "Custom applications with machine learning and natural language built in from the start.",
              },
              {
                // Automation — cycle arrows
                icon: (
                  <>
                    <path d="M5 8a7 7 0 0 1 12-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M17 2v3.5h-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 16a7 7 0 0 1-12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M7 22v-3.5h3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                  </>
                ),
                title: "Automation",
                desc: "Workflow automation that removes manual steps and connects your systems end to end.",
              },
              {
                // Analytics — bar chart with trend line
                icon: (
                  <>
                    <path d="M3 21h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="4.5" y="13" width="3" height="6" rx="0.6" fill="currentColor" fillOpacity="0.55" />
                    <rect x="10.5" y="9" width="3" height="10" rx="0.6" fill="currentColor" />
                    <rect x="16.5" y="6" width="3" height="13" rx="0.6" fill="currentColor" fillOpacity="0.55" />
                    <path d="M3 10l5-4 5 2 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="20" cy="3" r="1.6" fill="currentColor" />
                  </>
                ),
                title: "Analytics",
                desc: "Real-time data pipelines and dashboards that surface what matters and drive decisions.",
              },
              {
                // Computer vision — scan frame + eye
                icon: (
                  <>
                    <path d="M3 7V4a1 1 0 0 1 1-1h3M21 7V4a1 1 0 0 0-1-1h-3M3 17v3a1 1 0 0 0 1 1h3M21 17v3a1 1 0 0 1-1 1h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M5 12c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.18" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </>
                ),
                title: "Computer vision",
                desc: "Surveillance, quality inspection, and visual recognition systems deployed at the edge.",
              },
              {
                // Cyber defence — shield with checkmark
                icon: (
                  <>
                    <path d="M12 2L20 5v6c0 4.5-3.4 8.5-8 9.8C7.4 19.5 4 15.5 4 11V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.22" />
                    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ),
                title: "Cyber defence",
                desc: "AI-driven threat detection, anomaly monitoring, and automated incident response.",
              },
              {
                // Managed operations — activity pulse in a ring
                icon: (
                  <>
                    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
                    <path d="M3.5 12h3l2-4 3.5 8 2-4h6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </>
                ),
                title: "Managed operations",
                desc: "Continuous monitoring, optimisation, and support powered by intelligent tooling.",
              },
            ].map((item, i) => (
              <div className="ai-grid__card" key={i}>
                <div className="ai-grid__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{item.icon}</svg>
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
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>Six reasons<br />leaders choose us.</h2>
            </div>
            <p className="section__lead reveal">
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
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>Sectors<br />we serve.</h2>
            </div>
            <p className="section__lead reveal">From sovereign infrastructure to scaling SMEs. We operate across industries where the cost of failure is real and the standard for delivery is higher.</p>
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
          <div>
            <h2 className="cta-close__title" data-reveal-text>
              Let's build<br />something <span className="accent">smarter</span>—<br />and <span className="accent">safer.</span>
            </h2>
          </div>
          <div className="cta-close__row reveal">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">
                Talk to Us
                <ArrowIcon size={14} />
              </Link>
              <a className="btn btn--ghost" href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }} style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
                Explore Services
                <RightArrowIcon />
              </a>
            </div>
            <div className="cta-close__meta">
              <span>info@elconekt.com</span>
              <span>·</span>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
