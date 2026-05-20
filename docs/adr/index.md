---
title: ADR Index — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This index lists all Architectural Decision Records (ADRs) for `skipi-landing`. It is aimed at developers and architects who need to understand why the system is built the way it is.

## Records

| ADR | Title | Status |
|---|---|---|
| [0001](./0001-single-file-landing-on-workers-assets.md) | Single-file landing page deployed on Cloudflare Workers with Assets binding | accepted |
| [0002](./0002-separate-repo-from-skipi-app.md) | Landing page maintained in a separate repository from the Skipi application | accepted |
| [0003](./0003-inline-i18n-six-languages.md) | Six-language i18n implemented inline in the single HTML file | accepted |

## ADR process

When a significant architectural or structural decision is made, create a new ADR file `docs/adr/NNNN-<short-title>.md` and add it to this index. Use the format established by the existing ADRs (title, status, context, decision, consequences).
