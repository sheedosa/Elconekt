/**
 * Static prerender for GitHub Pages
 * ----------------------------------
 * Turns the SPA shell at `dist/index.html` into proper per-route HTML files:
 *
 *   dist/about/index.html
 *   dist/services/full-stack-development/index.html
 *   dist/services/ai-intelligent-systems/index.html
 *   dist/services/cybersecurity/index.html
 *   dist/contact/index.html
 *
 * Each file is the same React shell (so React Router still owns the runtime
 * routing once JS loads), but the <title>, <meta name="description">, the
 * canonical link, and the Open Graph / Twitter cards are rewritten to match
 * the route. That gives us:
 *
 *  1.  HTTP 200 on every direct URL (crawlers happy, no SPA 404 hack).
 *  2.  Real, per-route share previews on LinkedIn / Slack / iMessage etc.
 *      without requiring those crawlers to execute JS.
 *  3.  Per-page tab titles in initial HTML (no flash of "Elconekt —
 *      Engineering Smarter, Safer Systems" before usePageMeta runs).
 *
 * Zero new runtime dependencies, zero source-code changes.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const SITE = "https://elconekt.com";
const SUFFIX = " — Elconekt";

/** @typedef {{ path: string; title: string; description: string }} Route */

/** @type {Route[]} */
const routes = [
  {
    path: "/about",
    title: "About" + SUFFIX,
    description:
      "Elconekt is an AI-enabled systems integrator and technology consultancy. We design, build, and secure intelligent digital infrastructure for governments, enterprises, and growing businesses.",
  },
  {
    path: "/services/full-stack-development",
    title: "Full Stack Development" + SUFFIX,
    description:
      "Modern websites, applications and digital platforms built to scale. Engineered for performance, usability, and long-term growth.",
  },
  {
    path: "/services/ai-intelligent-systems",
    title: "AI & Intelligent Systems" + SUFFIX,
    description:
      "Practical AI implementation and intelligent systems designed to improve operations, automate work, and create measurable business impact.",
  },
  {
    path: "/services/cybersecurity",
    title: "Cybersecurity & Digital Resilience" + SUFFIX,
    description:
      "Enterprise-grade cybersecurity built for organisations that cannot afford disruption. Protect, detect, comply, respond.",
  },
  {
    path: "/contact",
    title: "Contact" + SUFFIX,
    description:
      "Start a conversation with Elconekt. Whether you're planning a project, exploring AI, or strengthening security — we'd be happy to help.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy" + SUFFIX,
    description:
      "How Elconekt collects, uses, and protects your personal data, and the rights you have under UK GDPR.",
  },
  {
    path: "/terms",
    title: "Terms of Use" + SUFFIX,
    description:
      "The terms governing your use of the Elconekt website, including intellectual property, disclaimers, and governing law.",
  },
];

/**
 * Replace the value of an attribute on a single tag matching a CSS-ish selector.
 * Uses literal string replacement — we keep this dumb and predictable rather
 * than parsing HTML, because the shell index.html is fully under our control.
 */
function replaceMeta(html, find, replaceValue) {
  if (!find.test(html)) return html;
  return html.replace(find, replaceValue);
}

/**
 * Escape user-supplied text before injecting into an attribute value.
 * (All copy here is internal so this is belt-and-braces.)
 */
function attr(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function rewriteForRoute(shellHtml, route) {
  const url = `${SITE}${route.path}`;
  const t = attr(route.title);
  const d = attr(route.description);
  let html = shellHtml;

  // <title>
  html = replaceMeta(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`);

  // Primary description
  html = replaceMeta(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${d}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="title"\s+content="[^"]*"\s*\/>/,
    `<meta name="title" content="${t}" />`,
  );

  // Canonical
  html = replaceMeta(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );

  // Open Graph
  html = replaceMeta(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${t}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${d}" />`,
  );

  // Twitter
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:url" content="${url}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${t}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${d}" />`,
  );

  return html;
}

async function main() {
  const shell = await readFile(join(DIST, "index.html"), "utf-8");

  for (const route of routes) {
    const outDir = join(DIST, ...route.path.split("/").filter(Boolean));
    await mkdir(outDir, { recursive: true });
    const outFile = join(outDir, "index.html");
    const html = await rewriteForRoute(shell, route);
    await writeFile(outFile, html, "utf-8");
    console.log(`  ✓  ${route.path.padEnd(46)}  →  ${outFile.replace(DIST + "/", "dist/")}`);
  }

  console.log(`\nPrerendered ${routes.length} routes.`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
