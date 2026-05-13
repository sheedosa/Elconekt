import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallax
 * -----------
 * Scans the DOM for `[data-parallax]` elements and assigns each a
 * scroll-linked Y translation. The `data-parallax` attribute value is the
 * speed multiplier — positive values move slower than scroll (background-like),
 * negative values move faster (foreground-like). Subtle by default.
 *
 *   <div data-parallax="0.3">…</div>
 *
 * Mobile + reduced-motion: no parallax (it eats CPU and feels worse than just
 * letting things scroll naturally).
 */
export function useParallax(deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      const triggers: ScrollTrigger[] = [];

      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        // Distance scales with viewport — bigger screens get a bit more drift.
        const distance = window.innerHeight * speed;

        const tween = gsap.fromTo(
          el,
          { y: -distance / 2 },
          {
            y: distance / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
