import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger);

/**
 * useReveal
 * ---------
 * Drop-in replacement for the previous IntersectionObserver approach.
 * Scans the document for `.reveal` (single element fade-up) and
 * `.reveal-stagger > *` (children stagger) and animates them in with
 * GSAP ScrollTrigger — which lets us share the timeline with Lenis.
 *
 * Behavior:
 *  - Respects prefers-reduced-motion (elements just appear).
 *  - Uses `once: true` so we don't replay on scroll-up — premium feel,
 *    not a flickering portfolio.
 *  - `start: "top 85%"` — triggers slightly before fully in view so the
 *    motion is anticipatory, not reactive.
 *  - Mobile: same timing, but distance reduced to feel less laggy on
 *    smaller momentum scrolls.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger > *")
        .forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const distance = isMobile ? 24 : 40;

    const ctx = gsap.context(() => {
      // Single reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: distance, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      // Staggered children
      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((parent) => {
        const children = parent.children;
        if (!children.length) return;
        gsap.fromTo(
          children,
          { y: distance, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: isMobile ? 0.06 : 0.09,
            scrollTrigger: {
              trigger: parent,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      // Refresh once everything is registered.
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
