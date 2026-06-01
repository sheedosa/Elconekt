import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../motion/SmoothScroll";
import { prefersReducedMotion } from "../motion/env";

const ArrowIcon = ({ size = 12 }: { size?: number }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export { ArrowIcon };

export const RightArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Scroll: only the nav backdrop-state toggle remains — the top progress
  // bar has been retired in favour of a calmer reading experience.
  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const close = () => setServicesOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [servicesOpen]);

  const scrollTo = (id: string) => {
    if (isHome) {
      if (prefersReducedMotion()) {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      } else {
        smoothScrollTo("#" + id, -20);
      }
    } else {
      navigate("/#" + id);
    }
  };

  return (
    <div className="elconekt">
      {/* NAV */}
      <nav className="nav" ref={navRef} aria-label="Primary">
        <Link
          className="nav__brand"
          to="/"
          aria-label="Elconekt — back to home"
          onClick={() => { setMenuOpen(false); setServicesOpen(false); }}
        >
          <img src="/elconekt-logo.png" alt="Elconekt" className="nav__logo" />
        </Link>
        <ul className={`nav__menu${menuOpen ? " is-open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li className="nav__dropdown-wrap">
            <button
              className="nav__dropdown-trigger"
              onClick={(e) => { e.stopPropagation(); setServicesOpen(!servicesOpen); }}
            >
              Services
              <svg className={`nav__chevron${servicesOpen ? " is-open" : ""}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`nav__dropdown${servicesOpen ? " is-open" : ""}`}>
              <Link to="/services/full-stack-development" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                <span className="nav__dropdown-num">01</span>
                Full Stack Development
              </Link>
              <Link to="/services/ai-intelligent-systems" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                <span className="nav__dropdown-num">02</span>
                AI &amp; Intelligent Systems
              </Link>
              <Link to="/services/cybersecurity" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                <span className="nav__dropdown-num">03</span>
                Cybersecurity
              </Link>
            </div>
          </li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
        <button className="nav__burger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`nav__burger-line${menuOpen ? " is-open" : ""}`} />
          <span className={`nav__burger-line${menuOpen ? " is-open" : ""}`} />
          <span className={`nav__burger-line${menuOpen ? " is-open" : ""}`} />
        </button>
        <Link className="nav__cta" to="/contact" data-magnetic="0.25">
          Talk to Us
          <ArrowIcon />
        </Link>
      </nav>
      {menuOpen && <div className="nav__overlay" onClick={() => setMenuOpen(false)} />}

      {children}

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
                <li><Link to="/about">About</Link></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-services"); }}>Services</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("elc-industries"); }}>Industries</a></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Capabilities</h5>
              <ul>
                <li><Link to="/services/full-stack-development">Full Stack Development</Link></li>
                <li><Link to="/services/ai-intelligent-systems">AI &amp; Intelligent Systems</Link></li>
                <li><Link to="/services/cybersecurity">Cybersecurity</Link></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Contact</h5>
              <ul>
                <li><a href="mailto:info@elconekt.com">info@elconekt.com</a></li>
                <li><span>London, United Kingdom</span></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>&copy; 2026 Elconekt Ltd. All rights reserved.</span>
            <nav className="footer__legal" aria-label="Legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
            </nav>
            <div className="footer__socials">
              {/* TODO: replace href="#" with the live profile URLs when ready */}
              <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zm7.5 0H12v2.18h.07c.63-1.18 2.17-2.42 4.46-2.42 4.77 0 5.65 3.14 5.65 7.23V24h-5v-7.62c0-1.82-.03-4.17-2.54-4.17-2.55 0-2.94 1.99-2.94 4.04V24h-5z" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
