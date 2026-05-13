import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, RightArrowIcon } from "../components/Layout";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import PinnedSequence from "../motion/PinnedSequence";

export default function FullStackDev() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useReveal();
  useMagnetic();
  useTextReveal();

  return (
    <>
      {/* HERO */}
      <header className="svc-hero">
        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__breadcrumb reveal">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/#elc-services">Services</Link>
              <span>/</span>
              <span>Full Stack Development</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Build modern<br />digital <span className="accent">products.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              From websites and mobile apps to complex platforms, we engineer digital products designed to scale.
            </p>
            <div className="svc-hero__ctas reveal">
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Discuss Your Project
                <ArrowIcon size={14} />
              </Link>
              <a className="btn btn--ghost" href="#svc-work" data-magnetic="0.3">
                How We Work
                <RightArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT WE BUILD */}
      <section className="section" id="svc-what">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Everything your<br />business runs on.
              </h2>
            </div>
            <p className="section__lead reveal">
              We design and build the digital products that power modern organisations, from public-facing platforms to the internal tools your team relies on daily.
            </p>
          </div>

          <div className="svc-offerings reveal-stagger">
            {[
              { icon: <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5 13v1.5M11 13v1.5M4 14.5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Websites and landing pages", desc: "High-performance marketing sites, landing pages, and corporate web presences built for speed and conversion." },
              { icon: <><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M2 5.5h12" stroke="currentColor" strokeWidth="1.3" /><circle cx="4" cy="3.8" r="0.6" fill="currentColor" /><circle cx="5.8" cy="3.8" r="0.6" fill="currentColor" /></>, title: "Web applications", desc: "Complex, data-rich web apps with real-time features, role-based access, and enterprise-grade architecture." },
              { icon: <><rect x="4" y="1.5" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M7 12.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Mobile apps", desc: "Cross-platform mobile applications that feel native, built with React Native or Flutter for iOS and Android." },
              { icon: <><rect x="1.5" y="2" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 6h13" stroke="currentColor" strokeWidth="1.3" /><path d="M5 9h3M5 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></>, title: "Enterprise portals", desc: "Secure, scalable portals for customers, partners, and internal teams with SSO, audit trails, and compliance." },
              { icon: <><path d="M2 12V4M2 12h12M4.5 10V7M7 10V5M9.5 10V8M12 10V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Internal dashboards", desc: "Operational dashboards that consolidate data from across your stack into clear, actionable views." },
              { icon: <><path d="M4 4l-2 4 2 4M12 4l2 4-2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 3L7 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "API-first systems", desc: "Clean, documented APIs that connect your services, enable integrations, and future-proof your architecture." },
              { icon: <><path d="M8 2L13 5v3.5c0 3-2.5 5-5 5.5-2.5-.5-5-2.5-5-5.5V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M6 8.5l1.5 1.5L10 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></>, title: "Cloud-native architecture", desc: "Infrastructure designed for scale from day one, deployed on AWS, Azure, or GCP with CI/CD pipelines." },
            ].map((item, i) => (
              <div className="svc-offering" key={i}>
                <div className="svc-offering__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{item.icon}</svg>
                </div>
                <div>
                  <h4 className="svc-offering__title">{item.title}</h4>
                  <p className="svc-offering__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK — pinned scroll storytelling on desktop, normal stack on mobile */}
      <div id="svc-work">
        <PinnedSequence
          eyebrow="[ How we work ]"
          heading={<>From brief<br />to launch.</>}
          lead="A proven four-phase process that keeps projects lean, transparent, and on track. No surprises, no scope creep."
          steps={[
            { num: "01", title: "Discover", desc: "We listen, research, and define the problem. Stakeholder interviews, technical audits, and competitive analysis shape a clear brief." },
            { num: "02", title: "Design", desc: "Wireframes, prototypes, and design systems. We validate with real users before a single line of production code is written." },
            { num: "03", title: "Build", desc: "Agile sprints with weekly demos. Clean, tested code deployed to staging so you can see progress in real time." },
            { num: "04", title: "Launch", desc: "Performance tuning, security hardening, and go-live support. We stay on until the product is stable and your team is confident." },
          ]}
        />
      </div>

      {/* TECH STACK */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Tools we<br />build with.
              </h2>
            </div>
            <p className="section__lead reveal">
              We choose the right tools for each project. No vendor lock-in, no unnecessary complexity. Just solid, proven technology.
            </p>
          </div>

          <div className="svc-stack reveal-stagger">
            {[
              { name: "React", cat: "Frontend" },
              { name: "Next.js", cat: "Framework" },
              { name: "Node.js", cat: "Backend" },
              { name: "Python", cat: "Backend" },
              { name: "AWS", cat: "Cloud" },
              { name: "PostgreSQL", cat: "Database" },
            ].map((tech, i) => (
              <div className="svc-stack__item" key={i}>
                <span className="svc-stack__name">{tech.name}</span>
                <span className="svc-stack__cat">{tech.cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Common<br />questions.
              </h2>
            </div>
          </div>

          <div className="svc-faq reveal">
            {[
              { q: "How long do projects take?", a: "It depends on scope. A marketing site typically takes 4 to 6 weeks. A complex web application can take 3 to 6 months. We define timelines during the discovery phase and share a clear delivery roadmap before any build work starts." },
              { q: "Can you work with our internal team?", a: "Absolutely. We often embed alongside in-house developers, designers, and product managers. We adapt to your workflows, tools, and communication style, whether that means joining your standups or running our own sprints with shared visibility." },
              { q: "Do you support after launch?", a: "Yes. We offer ongoing support and maintenance packages that cover monitoring, bug fixes, performance optimisation, and feature updates. Most clients stay with us long after launch because the relationship works." },
            ].map((faq, i) => (
              <div className={`svc-faq__item${openFaq === i ? " is-open" : ""}`} key={i}>
                <button className="svc-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg className="svc-faq__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="svc-faq__a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-close" id="elc-contact">
        <div className="container">
          <div>
            <h2 className="cta-close__title" data-reveal-text>
              Ready to build<br />something <span className="accent">great?</span>
            </h2>
          </div>
          <div className="cta-close__row reveal">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Discuss Your Project
                <ArrowIcon size={14} />
              </Link>
              <Link className="btn btn--ghost" to="/" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>
                Back to Home
                <RightArrowIcon />
              </Link>
            </div>
            <div className="cta-close__meta">
              <span>info@elconekt.com</span>
              <span>&middot;</span>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
