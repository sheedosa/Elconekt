import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, RightArrowIcon } from "../components/Layout";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import PinnedSequence from "../motion/PinnedSequence";

export default function Cybersecurity() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useReveal();
  useMagnetic();
  useTextReveal();

  const services = [
    { icon: <><path d="M2 4l6-2 6 2v5c0 3.5-2.5 5.5-6 6.5-3.5-1-6-3-6-6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5.5 8l2 2L11 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>, title: "Penetration testing", desc: "Authorised offensive testing of your applications, infrastructure, and cloud surface to surface real exploitable risk." },
    { icon: <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5 6h6M5 9h4M5 11h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>, title: "Application security", desc: "Secure design review, code-level threat analysis, and CI-integrated scanning across your software lifecycle." },
    { icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" /></>, title: "Network security", desc: "Segmentation, perimeter hardening, and zero-trust architecture for hybrid and remote-first environments." },
    { icon: <><path d="M3 6c2-3 8-3 10 0v3c0 2.5-2.5 4.5-5 5-2.5-0.5-5-2.5-5-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M6 8v-1a2 2 0 1 1 4 0v1M5 8h6v3H5z" stroke="currentColor" strokeWidth="1.2" /></>, title: "Cloud security", desc: "AWS, Azure, GCP posture review, identity hardening, and continuous compliance monitoring." },
    { icon: <><path d="M8 1.5v4M8 10.5v4M1.5 8h4M10.5 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" /></>, title: "Vulnerability management", desc: "Continuous scanning, prioritisation, and remediation tracking, tuned to your risk appetite and stack." },
    { icon: <><path d="M8 2L13 5v3.5c0 3-2.5 5-5 5.5-2.5-.5-5-2.5-5-5.5V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><circle cx="8" cy="8" r="2" fill="currentColor" /></>, title: "Security consulting", desc: "Strategic advisory, board-level reporting, and security programme design for regulated and high-stakes environments." },
    { icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8h2l1.5-3 1.5 6 1-3h1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>, title: "Managed security services", desc: "24/7 monitoring, detection, and response, delivered as an extension of your team." },
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
              <Link to="/#elc-services">Services</Link>
              <span>/</span>
              <span>Cybersecurity</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Secure what<br />matters <span className="accent">most.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              Cybersecurity built for organisations that cannot afford disruption.
            </p>
            <div className="svc-hero__ctas reveal">
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Talk to Our Security Team
                <ArrowIcon size={14} />
              </Link>
              <a className="btn btn--ghost" href="#sec-framework" data-magnetic="0.3">
                Our framework
                <RightArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* FRAMEWORK — pinned scroll storytelling */}
      <div id="sec-framework">
        <PinnedSequence
          eyebrow="[ Security framework ]"
          heading={<>Protect.<br />Detect.<br />Comply. <span className="accent">Respond.</span></>}
          lead="A four-pillar operating model that aligns to NIST CSF and ISO 27001. We meet you where you are and build out from there."
          steps={[
            { num: "01", title: "Protect", desc: "Zero-trust architecture, infrastructure hardening, and cloud-native security baselines designed to shrink attack surface." },
            { num: "02", title: "Detect", desc: "Continuous monitoring, behavioural analytics, and managed threat detection across endpoints, identity, and cloud." },
            { num: "03", title: "Comply", desc: "Governance, risk, and compliance programmes mapped to ISO 27001, SOC 2, NIS2, GDPR, and sector-specific frameworks." },
            { num: "04", title: "Respond", desc: "Incident readiness, tabletop exercises, and on-call response so a breach becomes a managed event rather than a crisis." },
          ]}
        />
      </div>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                What<br />we offer.
              </h2>
            </div>
            <p className="section__lead reveal">
              A full security capability stack, delivered by senior practitioners. No bench warmers, no offshoring, no surprises.
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

      {/* BUILT ON REAL EXPERIENCE */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                Built on real<br /><span className="accent">experience.</span>
              </h2>
            </div>
            <p className="section__lead reveal">
              Our cybersecurity practice is founded on over a decade of principal-level engineering experience across enterprise and critical environments — including delivery at:
            </p>
          </div>

          <div className="svc-stack reveal-stagger">
            {[
              { name: "Cisco", cat: "Network &amp; security" },
              { name: "KPMG", cat: "Advisory &amp; audit" },
              { name: "Goldman Sachs", cat: "Investment banking" },
              { name: "J.P. Morgan", cat: "Investment banking" },
            ].map((org, i) => (
              <div className="svc-stack__item" key={i}>
                <span className="svc-stack__name">{org.name}</span>
                <span className="svc-stack__cat" dangerouslySetInnerHTML={{ __html: org.cat }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
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
              { q: "Do you work with regulated industries?", a: "Yes. A meaningful portion of our work is in finance, healthcare, and critical infrastructure. We're comfortable with the audit, evidence, and segregation-of-duties requirements that come with regulated environments." },
              { q: "Can you co-deliver with our existing security team?", a: "Often the best engagements are joint. We embed alongside in-house security, IT, and engineering, supplementing capability rather than replacing it. We're explicit about scope, ownership, and hand-back from day one." },
              { q: "What's the difference between an assessment and a penetration test?", a: "An assessment reviews controls, configuration, and policy against a framework — it tells you whether you're set up to be secure. A penetration test actively attempts to exploit your systems — it tells you what an attacker would actually achieve. We deliver both and the right balance depends on your maturity." },
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
              Strengthen your<br /><span className="accent">security posture.</span>
            </h2>
          </div>
          <div className="cta-close__row reveal">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact" data-magnetic="0.3">
                Talk to Our Security Team
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
