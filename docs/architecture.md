---
title: Architecture — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document describes the system architecture of `skipi-landing`. It is aimed at developers and platform engineers who need to understand how the site is structured and which Cloudflare platform components are in use.

## High-level overview

The landing page is a single-file static HTML document (`public/index.html`) served by a Cloudflare Worker. The Worker also handles a single dynamic API route (`/api/contact`) that proxies contact-form submissions to the Resend email API. There is no database, no session state, and no client-side framework.

```
Browser
  │
  ▼
Cloudflare Edge (Workers runtime)
  │
  ├── GET / (and all static paths)  →  ASSETS binding  →  public/index.html
  ├── GET /favicon.ico              →  301 redirect to skipi-logo-dark.svg
  └── POST /api/contact             →  Worker logic  →  Resend API  →  axel@weichert.at
```

## Source files

| File | Role |
|---|---|
| `src/worker.js` | Cloudflare Worker entry point (ES module) |
| `public/index.html` | Single-file landing page (HTML + CSS + JS inline) |
| `public/*.svg`, `*.jpg`, `*.png` | Static assets served by the Assets binding |
| `public/robots.txt`, `sitemap.xml` | SEO/GEO files |
| `public/llms.txt`, `llms-full.txt` | AI-crawler guidance files |
| `public/impressum.html`, `datenschutz.html` | Legal pages |

## Cloudflare edge components

### Workers

**Used.** The Worker (`src/worker.js`) is the sole compute unit. It is an ES-module Worker with a single `fetch` handler. Responsibilities:

- Route `POST /api/contact` to the contact-form handler.
- Redirect `/favicon.ico` to the SVG logo URL (301).
- Forward all other requests to the `ASSETS` binding for static file serving.

Config reference: `wrangler.toml`, `main = "src/worker.js"`, `compatibility_date = "2024-09-23"`.

### Workers Assets

**Used.** Binding name: `ASSETS`. Directory: `./public`. All static files in `./public` are uploaded as an Assets bundle and served directly from the Cloudflare edge via `env.ASSETS.fetch(request)`. This binding replaces the need for Cloudflare Pages.

### Tail Consumers

**Used.** A tail consumer is wired to the `skipi-tail` Worker service (`wrangler.toml`: `[[tail_consumers]]`, `service = "skipi-tail"`). All Worker invocation events (request logs, errors) are streamed to `skipi-tail` for centralised log processing.

### Observability

**Used.** Cloudflare Observability is enabled:

- `[observability.logs]` — `enabled = true`, `invocation_logs = true`
- `[observability.traces]` — `enabled = true`

Traces and logs are accessible in the Cloudflare dashboard under the `skipi-landing` Worker.

### Pages

**Not used.** The site is deployed as a Worker with Assets binding, not as a Cloudflare Pages project.

### D1 (SQL database)

**Not used.** No relational data store.

### KV (key-value store)

**Not used.** No KV namespaces are bound.

### R2 (object storage)

**Not used.** No R2 buckets are bound.

### Queues

**Not used.** No Queues bindings.

### Durable Objects

**Not used.** No Durable Objects.

### Workers AI

**Not used.** AI inference runs in the Skipi application, not on the landing page.

### Vectorize

**Not used.**
