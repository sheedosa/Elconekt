import { useEffect } from "react";

/**
 * usePageMeta
 * -----------
 * Sets <title> and <meta name="description"> per route so each page shows
 * up correctly in browser tabs, bookmarks, history, and search engine
 * results.  No state — just a side effect on mount + cleanup that
 * restores the previous values when the route unmounts (so a partially
 * navigated app never shows the wrong title for long).
 */
const SITE_SUFFIX = " — Elconekt";

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descEl?.content;

    document.title = title.endsWith(SITE_SUFFIX) ? title : `${title}${SITE_SUFFIX}`;
    if (description && descEl) descEl.content = description;

    return () => {
      document.title = previousTitle;
      if (description && descEl && previousDescription !== undefined) {
        descEl.content = previousDescription;
      }
    };
  }, [title, description]);
}
