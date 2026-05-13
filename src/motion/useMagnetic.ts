import { useEffect } from "react";
import { gsap } from "gsap";
import { supportsHeavyMotion } from "./env";

/**
 * useMagnetic
 * -----------
 * Attaches "magnetic" hover behavior to any element matching `[data-magnetic]`.
 * The element softly translates toward the cursor while it's within the
 * element's bounding box (+ a small overshoot zone).
 *
 *   <a data-magnetic>Click me</a>
 *   <a data-magnetic="0.4">Stronger pull</a>   // strength override 0..1
 *
 * Disabled on touch / reduced-motion.
 */
export function useMagnetic(deps: unknown[] = []) {
  useEffect(() => {
    if (!supportsHeavyMotion()) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    if (!els.length) return;

    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "") || 0.28;
      const setX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
      const setY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setX((e.clientX - cx) * strength);
        setY((e.clientY - cy) * strength);
      };

      const onLeave = () => { setX(0); setY(0); };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.set(el, { clearProps: "transform" });
      });
    });

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
