---
title: Local Development — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This guide walks a developer through setting up and running `skipi-landing` locally. It assumes Node.js 20+ and npm are installed.

## Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | 20 |
| npm | 9 |
| Wrangler | 4.x (installed via `devDependencies`) |

## Setup

```bash
git clone https://github.com/axelweichert/skipi-landing.git
cd skipi-landing
npm install
```

## Local secrets

The `/api/contact` endpoint requires `RESEND_API_KEY`. Create a `.dev.vars` file in the project root (this file is `.gitignore`d and must never be committed):

```
RESEND_API_KEY=<your-resend-api-key>
```

Wrangler loads `.dev.vars` automatically in `wrangler dev` mode.

## Running the dev server

```bash
npx wrangler dev
```

The Worker starts at `http://localhost:8787`. Static assets from `./public` are served through the local Assets emulation. The `/api/contact` endpoint is live and will call Resend if the key is set.

## i18n check

Before every commit, run the i18n consistency check:

```bash
node check-i18n.js
```

This script verifies:
1. All `data-i18n` attributes in `public/index.html` have a corresponding key in the `T` translation object.
2. All keys in `T` are wired to a `data-i18n` attribute (or listed in `jsOnlyKeys`).
3. Every language block (EN, FR, IT, ES, PT) is complete relative to DE.

A passing run prints `✅ i18n vollständig …` and exits `0`. Any failure exits `1` and must be fixed before pushing.

## Dev rules

1. Run `node check-i18n.js` before every commit.
2. Any new user-visible text must be translated into all 6 languages (DE/EN/FR/IT/ES/PT).
3. Do not use inline styles that override media queries — use CSS classes.
4. Increment the version in `package.json` with every commit.
5. Never push directly to `main` without review.
