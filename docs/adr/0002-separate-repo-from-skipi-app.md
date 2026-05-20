---
title: "ADR 0002: Landing page maintained in a separate repository from the Skipi application"
status: current
updated: 2026-05-20
owner: Founding Engineer
---

## Status

accepted

## Context

Skipi consists of multiple services: the core application (image indexing, AI processing), an API backend, and the public marketing landing page. A monorepo approach would bundle all of these under one root; a polyrepo approach keeps them in separate repositories.

The landing page changes at a very different cadence and has a different risk profile from the application. Marketing copy, pricing, i18n translations, and SEO tweaks ship multiple times per day; application code ships on a different schedule and goes through deeper review. Coupling the two would either slow down landing page iterations or create noise in the application release pipeline.

## Decision

Maintain `skipi-landing` as a standalone repository, deployed independently from the Skipi application repositories. The landing page has its own `wrangler.toml`, its own CI workflow, and its own versioning (`package.json`).

## Consequences

**Positive:**
- Landing page changes can be shipped and rolled back without touching the application.
- Small, focused repository with a clear single responsibility.
- Independent versioning and changelog.
- Separate Cloudflare Worker name and deployment lifecycle.

**Negative / trade-offs:**
- Shared design tokens (colours, typography) cannot be imported from a shared package without introducing a build step. Currently, CSS variables are duplicated between the landing page and any other owlOS front ends.
- Cross-repo coordination is required if the landing page needs to reference API contracts that change in the application repo.
