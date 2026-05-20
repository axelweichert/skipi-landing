---
title: Operations Runbook — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This runbook provides operational procedures for `skipi-landing`. It is aimed at the operator on call who needs to monitor, diagnose, or recover the service.

## Monitoring

### Cloudflare dashboard

- Worker metrics (requests, errors, CPU time): Cloudflare dashboard → Workers & Pages → `skipi-landing` → Metrics.
- Invocation logs: Cloudflare dashboard → Workers & Pages → `skipi-landing` → Logs (requires Observability to be enabled — it is).
- Traces: Cloudflare dashboard → Workers & Pages → `skipi-landing` → Traces.

### Tail consumer

All Worker events are streamed to the `skipi-tail` Worker service via the configured tail consumer. Centralised log queries should be run against `skipi-tail`'s output.

## Alerts

There are no automated alert rules configured in this repository. Alerts should be configured in the Cloudflare dashboard or in the `skipi-tail` service.

## Common failure scenarios

### Contact form returns 500

1. Check `RESEND_API_KEY` secret is set: Cloudflare dashboard → Workers & Pages → `skipi-landing` → Settings → Variables & Secrets.
2. Check Resend API status at https://status.resend.com/.
3. Check Worker error logs in the Cloudflare dashboard.

### Landing page not loading / assets returning 404

1. Verify the latest deploy succeeded in `.github/workflows/deploy.yml` (GitHub Actions tab).
2. Check `wrangler.toml` `assets.directory` points to `./public`.
3. Run a manual deploy: `npx wrangler deploy` and check for errors.

### Deploy failing in CI

1. Check `CLOUDFLARE_API_TOKEN` is set in the GitHub repository secrets.
2. Ensure the token has Workers deploy permissions for account `6b9b3fa0e9f6be87faf7ca1b212641a3`.
3. Check Cloudflare API status at https://www.cloudflarestatus.com/.

## Rollback procedure

1. Open Cloudflare dashboard → Workers & Pages → `skipi-landing` → Deployments.
2. Identify the last known-good deployment.
3. Click **Rollback** on that deployment.

Or revert the relevant commit in `main` and push — CI will redeploy automatically.

## Secret rotation

To rotate `RESEND_API_KEY`:

```bash
npx wrangler secret put RESEND_API_KEY
# Enter the new key at the prompt
```

The new value takes effect on the next Worker invocation (no redeploy required).

## Updating the Worker

Any change to `src/worker.js` or `public/` requires a new deploy. Changes merged to `main` are deployed automatically via CI. See [deployment.md](./deployment.md).
