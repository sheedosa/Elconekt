import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, RightArrowIcon } from "../components/Layout";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import HeroNodeBackground from "../motion/HeroNodeBackground";

export default function AIIntelligentSystems() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useReveal();
  useMagnetic();
  useTextReveal();

  const services = [
    { icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8h2l1.5-3 1.5 6 1-3h1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>, title: "AI Strategy & Advisory", desc: "Helping organisations understand where AI creates value, with clear roadmaps and pragmatic prioritisation." },
    { icon: <><path d="M4 4l-2 4 2 4M12 4l2 4-2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 3L7 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Intelligent Automation", desc: "Automating repetitive workflows and manual tasks so your team focuses on the work that needs them." },
    { icon: <><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="6" cy="7" r="0.8" fill="currentColor" /><circle cx="10" cy="7" r="0.8" fill="currentColor" /><path d="M5.5 10.5c0.8 0.8 1.6 1 2.5 1s1.7-0.2 2.5-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" /></>, title: "AI Assistants & Agents", desc: "Intelligent support systems for internal teams and external customers, integrated into your existing tools." },
    { icon: <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Custom AI Applications", desc: "Tailored AI-enabled software solutions designed around your data, your domain, and your users." },
    { icon: <><rect x="2" y="2" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" /><rect x="9" y="2" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" /><rect x="2" y="9" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" /><rect x="9" y="9" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" /><path d="M7 4.5h2M7 11.5h2M4.5 7v2M11.5 7v2" stroke="currentColor" strokeWidth="1.2" /></>, title: "Intelligent Systems", desc: "Connected smart environments powered by automation, sensors, and AI-driven coordination." },
    { icon: <><path d="M2 12V4M2 12h12M4.5 10V7M7 10V5M9.5 10V8M12 10V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "AI Infrastructure", desc: "Building future-ready digital foundations that scale with your data, models, and operational needs." },
  ];

  const stages = [
    { num: "01", title: "Manual", desc: "Work runs on people. Knowledge lives in heads and spreadsheets." },
    { num: "02", title: "Digital", desc: "Processes captured in software. Data structured and accessible." },
    { num: "03", title: "Automated", desc: "Repetitive work runs itself. Humans focus on judgement and exception cases." },
    { num: "04", title: "AI Assisted", desc: "Models augment human decisions with prediction, ranking, and recommendation." },
    { num: "05", title: "AI Driven", desc: "Autonomous systems act, learn, and adapt within clearly defined guardrails." },
  ];

  const valueAreas = [
    "Operations", "Customer service", "Internal workflows", "Decision support", "Analytics", "Smart environments",
  ];

  return (
    <>
      {/* HERO */}
      <header className="svc-hero">
        <HeroNodeBackground />
        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__breadcrumb reveal">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/#elc-services">Services</Link>
              <span>/</span>
              <span>AI &amp; Intelligent Systems</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Build smarter.<br />Operate better.<br />Scale <span className="accent">faster.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              Practical AI implementation and intelligent systems designed to improve operations, automate work, and create measurable business impact.
            </p>
            <div className="svc-hero__ctas reveal">
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Talk AI with Us
                <ArrowIcon size={14} />
              </Link>
              <a className="btn btn--ghost" href="#ai-what" data-magnetic="0.3">
                What we do
                <RightArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT WE DO */}
      <section className="section" id="ai-what">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                What<br />we do.
              </h2>
            </div>
            <p className="section__lead reveal">
              From advisory to implementation, we build the AI capability layer that organisations need to operate smarter without disrupting what already works.
            </p>
          </div>

          <div className="svc-offerings reveal-stagger">
            {services.map((s, i) => (
              <div className="svc-offering" key={i}>
                <div className="svc-offering__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{s.icon}</svg>
                </div>
                <div>
                  <h4 className="svc-offering__title">{s.title}</h4>
                  <p className="svc-offering__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION FRAMEWORK */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                The maturity<br />ladder.
              </h2>
            </div>
            <p className="section__lead reveal">
              We help organisations move at the right pace, without disruption. Most teams sit between digital and automated. We close that gap and open the next one.
            </p>
          </div>

          <ol className="ai-ladder reveal-stagger">
            {stages.map((s) => (
              <li className="ai-ladder__step" key={s.num}>
                <span className="ai-ladder__num">{s.num}</span>
                <div>
                  <h4 className="ai-ladder__title">{s.title}</h4>
                  <p className="ai-ladder__desc">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHERE AI CREATES VALUE */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Where AI<br />creates value.
              </h2>
            </div>
            <p className="section__lead reveal">
              Not every problem is an AI problem. These are the ones we see deliver real, measurable return when the implementation is right.
            </p>
          </div>

          <div className="svc-stack reveal-stagger">
            {valueAreas.map((area, i) => (
              <div className="svc-stack__item" key={i}>
                <span className="svc-stack__name">{area}</span>
                <span className="svc-stack__cat">Use case</span>
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
              { q: "Where should we start with AI?", a: "Almost always with a single, well-defined workflow that has clear inputs, outputs, and a measurable outcome. We run a short discovery to identify two or three candidates, then prove value on one before scaling." },
              { q: "Will AI replace our existing software?", a: "Rarely. We layer AI into the systems you already run, your CRM, your ticketing tool, your internal apps, so the change feels incremental to your team. The transformation framework above is designed exactly for that progression." },
              { q: "How do you handle data security and compliance?", a: "Every engagement starts with a data flow review. Where possible we keep models and inference within your environment. When external models are appropriate, we lock down data residency, retention, and audit trails up front." },
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
      <section className="cta-close">
        <div className="container">
          <div>
            <h2 className="cta-close__title" data-reveal-text>
              Start your<br /><span className="accent">AI journey.</span>
            </h2>
          </div>
          <div className="cta-close__row reveal">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Talk AI with Us
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
