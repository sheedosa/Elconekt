import { Link } from "react-router-dom";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import HeroNodeBackground from "../motion/HeroNodeBackground";
import { usePageMeta } from "../motion/usePageMeta";

export default function Privacy() {
  useReveal();
  useMagnetic();
  useTextReveal();
  usePageMeta(
    "Privacy Policy",
    "How Elconekt collects, uses, and protects your personal data, and the rights you have under UK GDPR.",
  );

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
              <span>Privacy Policy</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Privacy<br /><span className="accent">policy.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              How we collect, use, and protect your personal data &mdash; and the rights you have under UK GDPR.
            </p>
          </div>
        </div>
      </header>

      {/* BODY */}
      <section className="section">
        <div className="container">
          <article className="legal reveal">
            <p className="legal__meta">Last updated: 1 June 2026</p>

            <p className="legal__lead">
              Elconekt Ltd (&ldquo;Elconekt&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what personal data we collect when you use elconekt.com or contact us, how we use it, and the rights you have under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2 className="legal__h">1. Who we are</h2>
            <p>Elconekt Ltd is a technology consultancy registered in the United Kingdom. For any privacy matter, contact us at <a href="mailto:info@elconekt.com">info@elconekt.com</a>. We are the data controller for the personal data described in this policy.</p>

            <h2 className="legal__h">2. What we collect</h2>
            <ul className="legal__list">
              <li><strong>Information you give us.</strong> When you submit the contact form we collect your name, company, email address, phone number (optional), service interest, and the contents of your message.</li>
              <li><strong>Technical data.</strong> Our hosting provider records standard server logs (IP address, browser type, pages requested) for security and reliability.</li>
              <li><strong>Analytics.</strong> We use privacy-friendly, cookie-free analytics that measure aggregate page views without tracking you across sites or storing personal identifiers.</li>
            </ul>
            <p>We do not use advertising cookies, and we do not track you across other websites.</p>

            <h2 className="legal__h">3. How we use your data</h2>
            <ul className="legal__list">
              <li>To respond to your enquiry and provide the services you ask about.</li>
              <li>To maintain the security, performance, and reliability of our website.</li>
              <li>To understand, in aggregate, how our website is used so we can improve it.</li>
            </ul>

            <h2 className="legal__h">4. Legal basis</h2>
            <p>We process contact-form data on the basis of <strong>legitimate interest</strong> (responding to a business enquiry you initiated) and, where applicable, to take steps at your request before entering into a contract. Server logs and aggregate analytics are processed on the basis of legitimate interest in running a secure, functional website.</p>

            <h2 className="legal__h">5. Sharing your data</h2>
            <p>We never sell your personal data. We share it only with the service providers that help us operate &mdash; for example our email and website hosting providers &mdash; and only to the extent necessary. These providers act as processors under contract and may not use your data for their own purposes.</p>

            <h2 className="legal__h">6. Data retention</h2>
            <p>We keep enquiry data only for as long as needed to respond to you and, where a working relationship begins, for the duration of that relationship plus any period required by law. You can ask us to delete your data at any time.</p>

            <h2 className="legal__h">7. International transfers</h2>
            <p>Where data is processed outside the UK or EEA by our providers, we ensure appropriate safeguards (such as UK adequacy regulations or standard contractual clauses) are in place.</p>

            <h2 className="legal__h">8. Your rights</h2>
            <p>Under UK GDPR you have the right to access, correct, delete, restrict, or object to our processing of your personal data, and the right to data portability. To exercise any of these, email <a href="mailto:info@elconekt.com">info@elconekt.com</a>. You also have the right to complain to the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>

            <h2 className="legal__h">9. Security</h2>
            <p>We apply appropriate technical and organisational measures &mdash; including encryption in transit (HTTPS), access controls, and a strict content security policy &mdash; to protect your data against unauthorised access, loss, or disclosure.</p>

            <h2 className="legal__h">10. Changes to this policy</h2>
            <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above reflects the latest revision. Material changes will be highlighted on this page.</p>

            <h2 className="legal__h">11. Contact</h2>
            <p>Questions about this policy or your data? Email <a href="mailto:info@elconekt.com">info@elconekt.com</a> or use our <Link to="/contact">contact page</Link>.</p>
          </article>
        </div>
      </section>
    </>
  );
}
