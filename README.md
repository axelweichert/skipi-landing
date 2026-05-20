# skipi-landing

Marketing landing page for Skipi — Smart KI Picture Indexer. Live at [www.skipi.cloud](https://www.skipi.cloud).

**Status:** active

## Quickstart

```bash
git clone https://github.com/axelweichert/skipi-landing.git
cd skipi-landing
npm install
npx wrangler dev
```

The Worker starts locally at `http://localhost:8787`. Static assets are served from `./public`; the `/api/contact` endpoint requires the `RESEND_API_KEY` secret (set via `wrangler secret put RESEND_API_KEY` or a `.dev.vars` file).

Before every commit:

```bash
node check-i18n.js
```

## Documentation

Full documentation: [docs/index.md](docs/index.md)

## Tech stack

| Layer | Component |
|---|---|
| Compute | Cloudflare Workers (ES module) |
| Static assets | Cloudflare Workers Assets binding (`ASSETS`, `./public`) |
| Observability | Cloudflare Observability — logs + traces enabled |
| Log routing | Tail consumer → `skipi-tail` Worker service |
| Email delivery | Resend API (`/api/contact`) |
