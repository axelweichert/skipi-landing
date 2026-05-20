---
title: Security — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document describes the security posture of `skipi-landing`. It is aimed at developers, security reviewers, and compliance stakeholders who need to assess risk and controls.

## Secrets management

All runtime secrets are stored exclusively in Cloudflare Workers secret storage. They are never committed to the repository.

| Secret | Storage location |
|---|---|
| `RESEND_API_KEY` | Cloudflare Workers secrets |
| `CLOUDFLARE_API_TOKEN` | GitHub repository secrets (CI only) |

The `.dev.vars` file used for local development must never be committed. It is listed in `.gitignore`.

## Attack surface

The Worker exposes one dynamic endpoint: `POST /api/contact`. All other paths serve static files with no server-side logic beyond the ASSETS fetch.

### Input validation on /api/contact

The Worker performs basic server-side validation before calling Resend:
- All three fields (`name`, `email`, `message`) must be non-empty.
- `email` must contain `@`.

There is no rate limiting configured at the Worker level. Cloudflare's bot-management and DDoS mitigation layers provide the first line of defence.

### HTML injection risk

The `name`, `email`, and `message` values are embedded directly into an HTML email template using template literals. There is no HTML encoding applied before insertion. This does not affect the landing page itself (the HTML is sent to Resend, not rendered by the Worker), but crafted inputs could produce unexpected HTML in the delivered email. This is a low-severity, operator-only impact risk (the email is received by `axel@weichert.at` only).

## CORS policy

The `/api/contact` endpoint returns:

```
Access-Control-Allow-Origin: *
```

This is intentional: the endpoint is a public contact form. The wildcard CORS policy allows the form to be submitted from any origin, including the CDN-fronted `www.skipi.cloud` domain.

## Transport security

All traffic is served over HTTPS. TLS termination is handled by Cloudflare's edge network. HTTP requests are automatically upgraded to HTTPS by Cloudflare's Always Use HTTPS setting (configured at the Cloudflare zone level, outside this repository).

## GDPR / DSGVO

Contact-form submissions collect personal data (`name`, `email`, `message`). Processing is covered by the Skipi privacy policy at `/datenschutz.html`. Resend is used as a data processor for email delivery.

## Dependency surface

Runtime dependencies: none (the Worker has no `dependencies` in `package.json`).

Dev dependencies: `wrangler ^4`. Wrangler is used only at build/deploy time; it is not part of the deployed Worker bundle.

## Cloudflare infrastructure security

The landing page benefits from Cloudflare's global network protections including DDoS mitigation, WAF (if enabled at the zone level), and rate limiting. These controls are configured at the Cloudflare account/zone level and are outside the scope of this repository.
