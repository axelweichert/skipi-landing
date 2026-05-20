---
title: "ADR 0001: Single-file landing page deployed on Cloudflare Workers with Assets binding"
status: current
updated: 2026-05-20
owner: Founding Engineer
---

## Status

accepted

## Context

The Skipi marketing landing page needed to be fast, globally distributed, and cheap to operate. The page is entirely static HTML with embedded CSS and JavaScript — there is no server-rendered content, no user accounts, and no dynamic data beyond the contact form. The only server-side logic required is the `/api/contact` POST handler that proxies form submissions to the Resend email API.

Cloudflare Workers with the Assets binding (`wrangler.toml`: `[assets]`) allows serving static files from the edge at zero cold-start cost, with a single Worker entry point that can also handle the dynamic contact route. An alternative was Cloudflare Pages, which also serves static assets but does not share the same deployment model as the rest of the owlOS stack (which uses Workers throughout).

## Decision

Deliver the entire landing page as a single HTML file (`public/index.html`) with all CSS and JavaScript inlined. Deploy via Cloudflare Workers using the Assets binding for static file serving, with `src/worker.js` handling the `/api/contact` route and falling back to `env.ASSETS.fetch(request)` for all other paths.

## Consequences

**Positive:**
- Zero infrastructure overhead beyond the Worker and its asset bundle.
- Global edge distribution with no origin server.
- Single deployment artifact; no CDN configuration, no separate static hosting.
- The contact-form API and the landing page are deployed atomically.
- No cold starts for static file serving (Assets binding serves directly from Cloudflare's cache layer).

**Negative / trade-offs:**
- A single large HTML file becomes harder to maintain as content grows. The i18n translation object (`T`) and all styles are embedded in `index.html`, which increases file size over time.
- Changing any content requires a full Worker redeploy (not just a cache invalidation).
- Splitting content into components or using a build step would require introducing a bundler — currently there is none.
