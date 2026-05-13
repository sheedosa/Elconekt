import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  num: string;
  title: string;
  desc: string;
};

interface Props {
  /** Optional eyebrow + heading shown alongside the active step. */
  eyebrow?: string;
  heading?: React.ReactNode;
  lead?: string;
  steps: Step[];
}

/**
 * PinnedSequence
 * ---------------
 * Sticky two-column section. As the user scrolls, the section is pinned and
 * the right-side step content swaps with a soft crossfade. Each step has an
 * equal scroll "slot" of viewport-relative distance.
 *
 * Mobile: pinning is disabled (it fights mobile momentum scroll and feels
 * janky). Instead, steps render as a normal vertical stack with reveal-on-scroll.
 *
 * Reduced motion: same as mobile — static stack, no pinning.
 */
export default function PinnedSequence({ eyebrow, heading, lead, steps }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Desktop-only effect. We use matchMedia inside GSAP so it auto-cleans
    // when the breakpoint flips during resize.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".pinseq__panel", root);
      const indicators = gsap.utils.toArray<HTMLElement>(".pinseq__dot", root);
      if (!panels.length) return;

      // Initial state: only first panel visible
      gsap.set(panels, { autoAlpha: 0, y: 30 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      indicators[0]?.classList.add("is-active");

      // Each step gets one viewport of scroll distance.
      const totalScroll = (panels.length - 1) * window.innerHeight * 0.85;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1];
        tl.to(prev, { autoAlpha: 0, y: -30, duration: 1, ease: "power2.inOut" })
          .fromTo(panel, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut" }, "<")
          .call(() => {
            indicators.forEach((d, di) => d.classList.toggle("is-active", di === i));
          }, [], "<");
      });

      return () => {
        gsap.set(panels, { clearProps: "all" });
        indicators.forEach((d) => d.classList.remove("is-active"));
      };
    });

    return () => mm.revert();
  }, [steps.length]);

  if (prefersReducedMotion()) {
    // Static fallback that matches the standard `.svc-process` style.
    return (
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {heading && <h2 className="section__title" style={{ marginTop: 20 }}>{heading}</h2>}
            </div>
            {lead && <p className="section__lead">{lead}</p>}
          </div>
          <div className="svc-process">
            {steps.map((s) => (
              <div className="svc-process__step" key={s.num}>
                <span className="svc-process__num">{s.num}</span>
                <h3 className="svc-process__title">{s.title}</h3>
                <p className="svc-process__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--surface pinseq" ref={rootRef}>
      <div className="container pinseq__container">
        {/* LEFT: persistent label column */}
        <aside className="pinseq__left">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {heading && <h2 className="section__title pinseq__heading">{heading}</h2>}
          {lead && <p className="section__lead pinseq__lead">{lead}</p>}
          <ol className="pinseq__dots" aria-hidden="true">
            {steps.map((s, i) => (
              <li key={i} className="pinseq__dot">
                <span className="pinseq__dot-num">{s.num}</span>
                <span className="pinseq__dot-title">{s.title}</span>
              </li>
            ))}
          </ol>
        </aside>

        {/* RIGHT: cross-fading panels */}
        <div className="pinseq__right">
          {steps.map((s, i) => (
            <article className="pinseq__panel" key={i}>
              <span className="pinseq__panel-num">{s.num}</span>
              <h3 className="pinseq__panel-title">{s.title}</h3>
              <p className="pinseq__panel-desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Fallback flow on mobile (CSS-controlled by .pinseq__mobile) */}
      <div className="pinseq__mobile container" aria-hidden="false">
        <div className="svc-process">
          {steps.map((s) => (
            <div className="svc-process__step" key={s.num}>
              <span className="svc-process__num">{s.num}</span>
              <h3 className="svc-process__title">{s.title}</h3>
              <p className="svc-process__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
