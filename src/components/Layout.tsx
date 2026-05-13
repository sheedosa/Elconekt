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
        <Link className="nav__brand" to="/">
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
