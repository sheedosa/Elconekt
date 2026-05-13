import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { supportsHeavyMotion } from "./env";

/**
 * Cursor
 * ------
 * Custom dot + ring cursor for desktop with fine pointers. Hidden on touch /
 * coarse pointers / reduced-motion. The ring "absorbs" into the dot when
 * hovering interactive elements (`a, button, [data-cursor="hover"]`).
 *
 * Implementation notes:
 *  - Uses `gsap.quickTo` for sub-frame interpolation — feels analog rather
 *    than steppy.
 *  - The dot follows the actual cursor 1:1 (no lag); the ring lags by ~10
 *    frames for a "trailing weight" feel.
 *  - We hide the native cursor only when our custom one is mounted (so
 *    fallback users keep theirs).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supportsHeavyMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("has-custom-cursor");

    // Sub-frame-interpolated setters — much smoother than direct style writes.
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setHover = (on: boolean) => {
      gsap.to(ring, { scale: on ? 1.8 : 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: on ? 0.3 : 1, duration: 0.35, ease: "power3.out" });
      ring.classList.toggle("is-hover", on);
    };

    // Use event delegation — cheaper than listening on every button.
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor="hover"], input, textarea, select, label')) {
        setHover(true);
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      const rel = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (
        t.closest('a, button, [data-cursor="hover"], input, textarea, select, label') &&
        !rel?.closest('a, button, [data-cursor="hover"], input, textarea, select, label')
      ) {
        setHover(false);
      }
    };

    const onLeave = () => { gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 }); };
    const onEnter = () => { gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 }); };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor cursor--ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor cursor--dot" aria-hidden="true" />
    </>
  );
}
