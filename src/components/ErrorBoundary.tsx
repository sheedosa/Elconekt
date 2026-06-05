import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /**
   * Optional replacement UI shown when a child throws. When provided, the
   * branded full-page fallback is skipped and this is rendered instead —
   * used to degrade a single feature (e.g. the WebGL hero) to a fallback
   * rather than taking over the whole screen.
   */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary
 * -------------
 * Catches render/lifecycle errors in its subtree so a single throwing
 * component never white-screens the site. Two uses:
 *   1. Wrapping the whole app (App.tsx) — shows a branded recovery screen.
 *   2. Wrapping the WebGL hero (HeroBackdrop) with a `fallback` — silently
 *      degrades to the 2D canvas if Three.js / WebGL fails.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface in the console for debugging; no third-party reporting.
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;

      return (
        <div className="elconekt">
          <main className="error-screen">
            <div className="container error-screen__inner">
              <span className="eyebrow">Something went wrong</span>
              <h1 className="error-screen__title">
                We hit an<br /><span className="accent">unexpected error.</span>
              </h1>
              <p className="error-screen__sub">
                Sorry about that. Reloading usually fixes it. If it keeps happening,
                email <a href="mailto:info@elconekt.com">info@elconekt.com</a> and we&apos;ll sort it out.
              </p>
              <div className="error-screen__ctas">
                <button className="btn btn--primary" onClick={() => window.location.reload()}>
                  Reload the page
                </button>
                <a className="btn btn--ghost" href="/">Back to home</a>
              </div>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
