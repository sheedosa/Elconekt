// Motion environment helpers — runtime feature detection
// Used by every animation primitive to gate behavior on capability + user preference.

export const isBrowser = typeof window !== "undefined";

export const prefersReducedMotion = (): boolean => {
  if (!isBrowser) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Touch / pointer detection — distinct because some hybrid devices have both.
export const isTouchPrimary = (): boolean => {
  if (!isBrowser) return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
};

// Mobile breakpoint matches our CSS — keep these in sync.
export const isMobileViewport = (): boolean => {
  if (!isBrowser) return false;
  return window.matchMedia("(max-width: 768px)").matches;
};

// Combined gate: when true, we render the static fallback for an effect.
export const shouldReduceMotion = (): boolean =>
  prefersReducedMotion();

// Heavy effects (WebGL, custom cursor, smooth scroll) are gated more aggressively.
export const supportsHeavyMotion = (): boolean =>
  isBrowser && !prefersReducedMotion() && !isTouchPrimary();
