import { Link } from "react-router-dom";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import HeroNodeBackground from "../motion/HeroNodeBackground";
import { usePageMeta } from "../motion/usePageMeta";

export default function Terms() {
  useReveal();
  useMagnetic();
  useTextReveal();
  usePageMeta(
    "Terms of Use",
    "The terms governing your use of the Elconekt website, including intellectual property, disclaimers, and governing law.",
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
              <span>Terms of Use</span>
            </div>
            <h1 className="svc-hero__title" data-reveal-text>
              Terms<br />of <span className="accent">use.</span>
            </h1>
            <p className="svc-hero__sub reveal">
              The terms that govern your use of this website. Please read them carefully.
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
              These terms govern your access to and use of elconekt.com (the &ldquo;site&rdquo;), operated by Elconekt Ltd. By using the site you agree to these terms. If you do not agree, please do not use the site.
            </p>

            <h2 className="legal__h">1. Use of the site</h2>
            <p>You may use this site for lawful purposes only. You agree not to use it in any way that breaches applicable law, interferes with its operation or security, or attempts to gain unauthorised access to any part of it or its underlying systems.</p>

            <h2 className="legal__h">2. Intellectual property</h2>
            <p>All content on this site &mdash; including text, design, graphics, logos, code, and the Elconekt name and brand &mdash; is owned by or licensed to Elconekt Ltd and is protected by intellectual property laws. You may view and share links to the site, but you may not copy, reproduce, or repurpose its content without our prior written permission.</p>

            <h2 className="legal__h">3. No professional advice</h2>
            <p>The content on this site is provided for general information about our services. It does not constitute professional, technical, legal, or security advice, and should not be relied upon as such. Any engagement is governed by a separate written agreement.</p>

            <h2 className="legal__h">4. Disclaimers</h2>
            <p>The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. While we work to keep it accurate and available, we make no warranties that it will be uninterrupted, error-free, or free of harmful components. To the fullest extent permitted by law, we exclude all implied warranties.</p>

            <h2 className="legal__h">5. Limitation of liability</h2>
            <p>To the fullest extent permitted by law, Elconekt Ltd will not be liable for any indirect or consequential loss, or for any loss of profit, revenue, data, or goodwill, arising from your use of (or inability to use) this site. Nothing in these terms limits liability that cannot be limited under applicable law.</p>

            <h2 className="legal__h">6. External links</h2>
            <p>This site may link to third-party websites. We are not responsible for the content, policies, or practices of those sites; links are provided for convenience only.</p>

            <h2 className="legal__h">7. Privacy</h2>
            <p>Your use of the site is also governed by our <Link to="/privacy">Privacy Policy</Link>, which explains how we handle personal data.</p>

            <h2 className="legal__h">8. Changes to these terms</h2>
            <p>We may revise these terms from time to time. The &ldquo;last updated&rdquo; date above reflects the current version. Continued use of the site after changes constitutes acceptance of the revised terms.</p>

            <h2 className="legal__h">9. Governing law</h2>
            <p>These terms are governed by the laws of England and Wales, and any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

            <h2 className="legal__h">10. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:info@elconekt.com">info@elconekt.com</a> or use our <Link to="/contact">contact page</Link>.</p>
          </article>
        </div>
      </section>
    </>
  );
}
