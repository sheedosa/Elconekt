import { Link } from "react-router-dom";
import { ArrowIcon, RightArrowIcon } from "../components/Layout";
import { useReveal } from "../motion/useReveal";
import { useMagnetic } from "../motion/useMagnetic";
import { useTextReveal } from "../motion/useTextReveal";
import HeroNodeBackground from "../motion/HeroNodeBackground";
import { usePageMeta } from "../motion/usePageMeta";

export default function NotFound() {
  useReveal();
  useMagnetic();
  useTextReveal();
  usePageMeta(
    "Page not found",
    "The page you were looking for doesn't exist. Head back home or explore what Elconekt does.",
  );

  return (
    <header className="svc-hero svc-hero--404">
      <HeroNodeBackground />
      <div className="container">
        <div className="svc-hero__inner">
          <div className="svc-hero__breadcrumb reveal">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>404</span>
          </div>
          <span className="eyebrow reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Error 404</span>
          <h1 className="svc-hero__title" data-reveal-text>
            This page<br />went <span className="accent">missing.</span>
          </h1>
          <p className="svc-hero__sub reveal">
            The link may be broken or the page may have moved. Let&apos;s get you back on track.
          </p>
          <div className="svc-hero__ctas reveal">
            <Link className="btn btn--primary" to="/" data-magnetic="0.3">
              Back to home
              <ArrowIcon size={14} />
            </Link>
            <Link className="btn btn--ghost" to="/contact" data-magnetic="0.3">
              Contact us
              <RightArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
