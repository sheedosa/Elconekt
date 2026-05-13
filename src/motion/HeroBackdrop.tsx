import { lazy, Suspense, useEffect, useState } from "react";
import { supportsHeavyMotion } from "./env";

// Lazy-load the 3D scene so mobile/reduced-motion bundles never download Three.
const Hero3D = lazy(() => import("./Hero3D"));

interface Props {
  /** The 2D canvas fallback — already-built, just attach the ref. */
  fallback: React.ReactNode;
}

/**
 * HeroBackdrop
 * ------------
 * Decides at mount whether to render the WebGL hero (desktop + non-touch +
 * motion-OK) or the existing 2D canvas fallback (mobile, touch, reduced-motion).
 *
 * The check runs in a useEffect so SSR/initial render stays deterministic
 * and we don't hydrate-mismatch.
 */
export default function HeroBackdrop({ fallback }: Props) {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Defer the decision one tick to ensure media queries are evaluated
    // post-mount (some browsers report 0/0 initially).
    const id = requestAnimationFrame(() => setUse3D(supportsHeavyMotion()));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!use3D) return <>{fallback}</>;

  return (
    <Suspense fallback={fallback}>
      <Hero3D />
    </Suspense>
  );
}
