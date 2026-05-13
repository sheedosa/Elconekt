import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll
 * ------------
 * Single Lenis instance that drives the whole app and stays in sync with
 * GSAP ScrollTrigger. We keep it ON for both desktop and mobile because Lenis
 * gracefully degrades on touch (it uses native momentum), but we DISABLE it
 * for users who prefer reduced motion.
 *
 * Why one provider:
 *  - GSAP must use Lenis's scroll value as the source of truth, otherwise
 *    ScrollTrigger pinning and parallax desync.
 *  - Two Lenis instances would fight each other.
 *
 * Mobile note: Lenis's `syncTouch` is OFF — native momentum on mobile feels
 * better than forced smoothing, which can fight the OS gesture handler.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Mark the HTML element as motion-ready so CSS can safely apply
  // "initial hidden" state ONLY when JS is running. Without this flag,
  // `.reveal` opacity:0 would persist on broken/slow JS and the page
  // would look empty.
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    return () => document.documentElement.classList.remove("motion-ready");
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger stays in sync.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger that Lenis owns the scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Force a refresh once Lenis is attached so triggers that are already
    // in view fire correctly. Without this, elements above the fold can
    // get stuck in their initial hidden state.
    const refreshTimers = [
      window.setTimeout(() => ScrollTrigger.refresh(), 100),
      window.setTimeout(() => ScrollTrigger.refresh(), 600),
    ];

    return () => {
      refreshTimers.forEach(clearTimeout);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Expose imperative scrollTo for the rest of the app (nav links, CTAs).
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ target: string | number; offset?: number }>).detail;
      if (!detail) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(detail.target as string | number, { offset: detail.offset ?? 0 });
      } else {
        // Reduced-motion fallback
        if (typeof detail.target === "string") {
          const el = document.querySelector(detail.target);
          el?.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          window.scrollTo({ top: detail.target as number, behavior: "auto" });
        }
      }
    };
    window.addEventListener("lenis:scrollTo", handler);
    return () => window.removeEventListener("lenis:scrollTo", handler);
  }, []);

  return <>{children}</>;
}

// Public helper — dispatches a custom event so callers don't import Lenis directly.
export const smoothScrollTo = (target: string | number, offset = 0) => {
  window.dispatchEvent(
    new CustomEvent("lenis:scrollTo", { detail: { target, offset } }),
  );
};
