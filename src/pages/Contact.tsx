import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../components/Layout";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import HeroNodeBackground from "../motion/HeroNodeBackground";

export default function Contact() {
  useReveal();
  useMagnetic();
  useTextReveal();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback — works without a backend.  Easy to swap for a real
    // form endpoint (Formspree, Netlify Forms, etc.) once provisioned.
    const subject = encodeURIComponent(`Enquiry — ${form.interest || "General"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company: ${form.company}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Service: ${form.interest}`,
        "",
        form.message,
      ].join("\n"),
    );
    window.location.href = `mailto:info@elconekt.com?subject=${subject}&body=${body}`;
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

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
              <span>Contact</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Start a<br /><span className="accent">conversation.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              Whether you&apos;re planning a project, exploring AI, or strengthening security — we&apos;d be happy to help.
            </p>
          </div>
        </div>
      </header>

      {/* CONTACT FORM */}
      <section className="section">
        <div className="container">
          <div className="contact__layout">
            <form className="contact__form reveal" onSubmit={handleSubmit}>
              <div className="contact__row">
                <label className="contact__field">
                  <span>Full name</span>
                  <input type="text" required value={form.name} onChange={set("name")} placeholder="Jane Doe" />
                </label>
                <label className="contact__field">
                  <span>Company</span>
                  <input type="text" value={form.company} onChange={set("company")} placeholder="Acme Inc." />
                </label>
              </div>
              <div className="contact__row">
                <label className="contact__field">
                  <span>Email</span>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" />
                </label>
                <label className="contact__field">
                  <span>Phone</span>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="Optional" />
                </label>
              </div>
              <label className="contact__field">
                <span>Service interest</span>
                <select value={form.interest} onChange={set("interest")}>
                  <option value="">Select a service</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="AI &amp; Intelligent Systems">AI &amp; Intelligent Systems</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="General">General enquiry</option>
                </select>
              </label>
              <label className="contact__field">
                <span>Message</span>
                <textarea rows={6} required value={form.message} onChange={set("message")} placeholder="Tell us a bit about your project, timeline, and where you'd like our help." />
              </label>
              <button className="btn btn--primary contact__submit" type="submit" data-magnetic="0.3">
                Send Enquiry
                <ArrowIcon size={14} />
              </button>
            </form>

            <aside className="contact__aside reveal">
              <div className="contact__block">
                <h4>Prefer email?</h4>
                <a className="contact__email" href="mailto:info@elconekt.com">info@elconekt.com</a>
                <p className="contact__meta">We typically reply within 24 hours.</p>
              </div>
              <div className="contact__block">
                <h4>Global delivery</h4>
                <p>Remote-first. International delivery from the United Kingdom.</p>
              </div>
              <div className="contact__block">
                <h4>Looking for something specific?</h4>
                <ul className="contact__links">
                  <li><Link to="/services/full-stack-development">Full Stack Development</Link></li>
                  <li><Link to="/services/ai-intelligent-systems">AI &amp; Intelligent Systems</Link></li>
                  <li><Link to="/services/cybersecurity">Cybersecurity</Link></li>
                  <li><Link to="/about">About Elconekt</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="section section--surface">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title" data-reveal-text>
                What<br />happens next.
              </h2>
            </div>
            <p className="section__lead reveal">
              No automated sales funnels. No 14-day chase emails. Just a direct path from this form to a senior engineer who can actually help.
            </p>
          </div>

          <ol className="next-steps reveal-stagger">
            <li className="next-step">
              <div className="next-step__num">01</div>
              <div className="next-step__body">
                <h3 className="next-step__title">We reply within 24 hours</h3>
                <p className="next-step__desc">Your enquiry lands directly in front of a principal engineer &mdash; not a junior gatekeeper. Most weekdays you&apos;ll hear back the same day.</p>
              </div>
            </li>
            <li className="next-step">
              <div className="next-step__num">02</div>
              <div className="next-step__body">
                <h3 className="next-step__title">A 30-minute discovery call</h3>
                <p className="next-step__desc">We listen first. We&apos;ll ask about your context, constraints, and what success looks like &mdash; not pitch you a packaged offering.</p>
              </div>
            </li>
            <li className="next-step">
              <div className="next-step__num">03</div>
              <div className="next-step__body">
                <h3 className="next-step__title">A clear proposal &amp; next steps</h3>
                <p className="next-step__desc">A short written brief with scope, milestones, team, timeline, and a fixed quote &mdash; usually within five working days of the discovery call.</p>
              </div>
            </li>
            <li className="next-step">
              <div className="next-step__num">04</div>
              <div className="next-step__body">
                <h3 className="next-step__title">Engagement &amp; delivery</h3>
                <p className="next-step__desc">If you say go, we start. Weekly demos, shared visibility, and accountable senior delivery from kick-off to launch.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
