---
title: Configuration — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document lists all environment variables, secrets, and `wrangler.toml` settings for `skipi-landing`. It is aimed at developers and operators who need to configure or rotate credentials. **This file contains variable names and placeholders only — never real values or tokens.**

## Cloudflare Workers secrets

Secrets are stored in Cloudflare Workers secret storage and injected into the Worker via the `env` parameter at runtime. They are set with `npx wrangler secret put <NAME>` or via the Cloudflare dashboard.

| Secret name | Purpose |
|---|---|
| `RESEND_API_KEY` | API key for the Resend email delivery service. Used by the `/api/contact` handler to send contact-form submissions to the configured recipient. |

For local development, set secrets in a `.dev.vars` file (never commit this file):

```
RESEND_API_KEY=<placeholder>
```

## GitHub Actions secrets

The CI/CD pipeline requires one GitHub repository secret:

| Secret name | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers deploy permissions. Used by the `deploy.yml` workflow to authenticate `wrangler deploy`. |

## wrangler.toml settings

| Key | Value | Notes |
|---|---|---|
| `name` | `skipi-landing` | Worker name in Cloudflare |
| `main` | `src/worker.js` | Worker entry point |
| `compatibility_date` | `2024-09-23` | Workers runtime compatibility date |
| `account_id` | `6b9b3fa0e9f6be87faf7ca1b212641a3` | Cloudflare account (Weichert.at) |
| `assets.directory` | `./public` | Static assets source directory |
| `assets.binding` | `ASSETS` | Binding name for the Assets namespace |
| `observability.logs.enabled` | `true` | Enable invocation log collection |
| `observability.logs.invocation_logs` | `true` | Log every invocation |
| `observability.traces.enabled` | `true` | Enable distributed tracing |
| `tail_consumers[0].service` | `skipi-tail` | Worker service that receives tail events |

## No other bindings

There are no D1, KV, R2, Queues, or Durable Objects bindings. See [architecture.md](./architecture.md) for the full component inventory.
