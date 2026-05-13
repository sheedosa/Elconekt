import { Link } from "react-router-dom";
import { ArrowIcon, RightArrowIcon } from "../components/Layout";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";

export default function About() {
  useReveal();
  useMagnetic();
  useTextReveal();

  const principles = [
    { num: "01", title: "Engineering-led", desc: "Senior expertise. Real accountability." },
    { num: "02", title: "AI-enabled", desc: "Intelligence embedded across every solution." },
    { num: "03", title: "Security-first", desc: "Protection built in from day one." },
    { num: "04", title: "Vendor-neutral", desc: "Technology chosen around your needs." },
    { num: "05", title: "End-to-end", desc: "From strategy through long-term support." },
    { num: "06", title: "Global delivery", desc: "Built to international standards." },
  ];

  return (
    <>
      {/* HERO */}
      <header className="svc-hero">
        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__breadcrumb reveal">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>About</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Built on<br />engineering <span className="accent">excellence.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              Elconekt helps organisations modernise with confidence through secure digital systems, practical AI, and enterprise-grade cybersecurity.
            </p>
            <div className="svc-hero__ctas reveal">
              <a className="btn btn--primary" href="mailto:info@elconekt.com" data-magnetic="0.3">
                Talk to Us
                <ArrowIcon size={14} />
              </a>
              <a className="btn btn--ghost" href="#about-principles" data-magnetic="0.3">
                Our Principles
                <RightArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* WHO WE ARE */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Who<br />we are.
              </h2>
            </div>
            <div className="about-prose reveal">
              <p>Elconekt is an AI-enabled systems integrator and technology consultancy.</p>
              <p>We design, build, and secure intelligent digital infrastructure for governments, enterprises, and growing businesses.</p>
              <p>Built on engineering excellence and shaped by real-world delivery experience, we partner with leadership teams to solve complex technology challenges through software, intelligent systems, and cyber resilience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Why<br />we exist.
              </h2>
            </div>
            <div className="about-prose reveal">
              <p>Modern organisations face increasingly complex technology challenges.</p>
              <p className="about-prose__list">
                <span>Different vendors.</span>
                <span>Disconnected systems.</span>
                <span>Growing security risks.</span>
              </p>
              <p><strong>Elconekt was built to solve that.</strong></p>
              <p>We provide one trusted technology partner capable of helping organisations build, transform, and protect their operations through connected, end-to-end delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section" id="about-principles">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Our<br />principles.
              </h2>
            </div>
            <p className="section__lead reveal">
              Six commitments that shape how we design, build, and protect everything we deliver.
            </p>
          </div>

          <div className="principles reveal-stagger">
            {principles.map((p) => (
              <div className="principle" key={p.num}>
                <span className="principle__num">{p.num}</span>
                <h3 className="principle__title">{p.title}</h3>
                <p className="principle__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Our<br />story.
              </h2>
            </div>
            <div className="about-prose reveal">
              <p>Founded in the UK in 2022, Elconekt was created to bridge software engineering, intelligent systems, and cybersecurity under one delivery model.</p>
              <p>Today, we support organisations across sectors with technology designed for long-term operational success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-close">
        <div className="container">
          <div>
            <h2 className="cta-close__title" data-reveal-text>
              Let's build<br />something <span className="accent">smarter</span>—<br />and <span className="accent">safer.</span>
            </h2>
          </div>
          <div className="cta-close__row reveal">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Talk to Us
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
