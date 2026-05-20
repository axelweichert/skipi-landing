---
title: Deployment — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document describes how `skipi-landing` is deployed to Cloudflare Workers. It is aimed at developers and operators who need to ship or roll back a change.

## Environments

There is a single production environment. There is no separate staging environment for this repo.

| Property | Value |
|---|---|
| Worker name | `skipi-landing` |
| Account | Cloudflare account `6b9b3fa0e9f6be87faf7ca1b212641a3` (Weichert.at) |
| Production URL | https://www.skipi.cloud |
| Branch | `main` |

## Automatic deployment (CI)

Every push to `main` triggers the GitHub Actions workflow defined in `.github/workflows/deploy.yml`. The workflow:

1. Checks out the repository.
2. Sets up Node.js 20.
3. Runs `npm ci`.
4. Runs `npx wrangler deploy` with the `CLOUDFLARE_API_TOKEN` secret from the GitHub repository settings.

No manual step is required for a production deploy after merging to `main`.

## Manual deployment

To deploy manually from a local machine:

```bash
npm install
npx wrangler deploy
```

Wrangler uses the credentials configured via `wrangler login` or the `CLOUDFLARE_API_TOKEN` environment variable.

## Pre-deploy checklist

- [ ] `node check-i18n.js` passes with exit code 0.
- [ ] Version in `package.json` has been incremented.
- [ ] No `.dev.vars` or secret values are staged.
- [ ] PR reviewed (do not push directly to `main`).

## Rollback

Cloudflare Workers keeps previous deployment versions. To roll back:

1. Open the Cloudflare dashboard → Workers & Pages → `skipi-landing` → Deployments.
2. Select the previous deployment and click **Rollback**.

Alternatively, revert the commit in Git and push to `main` to trigger a new deploy via CI.

## Secrets management

Secrets are stored in Cloudflare Workers secrets (not in the repository). To add or rotate a secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

See [configuration.md](./configuration.md) for the full list of secrets.
