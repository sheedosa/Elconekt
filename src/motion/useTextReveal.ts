import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger);

/**
 * useTextReveal
 * -------------
 * Scans for `[data-reveal-text]` headings, splits them into word spans, and
 * animates each word rising from below a hidden "mask line" as the heading
 * scrolls into view. Premium editorial feel.
 *
 * Why words, not chars: char-by-char looks like a typewriter and reads less
 * cinematically. Words preserve rhythm and let users actually read.
 *
 * We DON'T touch elements that already have the legacy `.word` animation
 * (the hero h1) — they have their own bespoke entry.
 *
 * Mobile: same animation but lower distance + slightly faster.
 * Reduced motion: skip entirely, content shows as-is.
 */
export function useTextReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-text]"));
    if (!els.length) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Split — preserve existing inner HTML structure (so <br /> and <span class="accent">
    // survive). We walk text nodes and wrap each word in a mask span.
    const splitNode = (node: Node, mask: HTMLElement) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        const frag = document.createDocumentFragment();
        const parts = text.split(/(\s+)/);
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(p));
          } else {
            const word = document.createElement("span");
            word.className = "tr-word";
            const inner = document.createElement("span");
            inner.className = "tr-word__inner";
            inner.textContent = p;
            word.appendChild(inner);
            frag.appendChild(word);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recurse into children, but treat <br> as a line break
        Array.from(node.childNodes).forEach((child) => splitNode(child, mask));
      }
    };

    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      // Skip if already split (e.g. on hot reload)
      if (el.dataset.revealSplit === "1") return;
      el.dataset.revealSplit = "1";

      // Snapshot original HTML so we can restore on cleanup (for HMR).
      const original = el.innerHTML;
      cleanups.push(() => { el.innerHTML = original; el.dataset.revealSplit = ""; });

      Array.from(el.childNodes).forEach((c) => splitNode(c, el));

      const inners = el.querySelectorAll<HTMLElement>(".tr-word__inner");
      if (!inners.length) return;

      gsap.set(inners, { yPercent: 110 });

      const tween = gsap.to(inners, {
        yPercent: 0,
        duration: isMobile ? 0.85 : 1.05,
        ease: "power3.out",
        stagger: isMobile ? 0.04 : 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });

      if (tween.scrollTrigger) {
        cleanups.push(() => tween.scrollTrigger!.kill());
      }
    });

    // Re-measure after splits
    ScrollTrigger.refresh();

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
