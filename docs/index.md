---
title: Documentation Index — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This Map-of-Content is the entry point to all documentation for the `skipi-landing` repository. It is intended for developers, operators, and contributors who need to navigate the project's technical docs.

## Contents

| Document | Description |
|---|---|
| [overview.md](./overview.md) | Purpose, context, stakeholders, current status |
| [architecture.md](./architecture.md) | System design and Cloudflare edge component inventory |
| [local-dev.md](./local-dev.md) | Local development setup and workflow |
| [deployment.md](./deployment.md) | Deployment process, environments, rollback |
| [configuration.md](./configuration.md) | Environment variables and secrets reference |
| [api.md](./api.md) | API endpoints and integration reference |
| [data-model.md](./data-model.md) | Data handling and persistence model |
| [operations.md](./operations.md) | Operational runbook and monitoring |
| [security.md](./security.md) | Security posture and practices |
| [changelog.md](./changelog.md) | Change history pointer |
| [adr/index.md](./adr/index.md) | Architectural Decision Records |

## Maintenance rule (OWL-40 §6)

Every pull request that changes behaviour, API surface, configuration, data model, or deployment procedure **must** update the affected `/docs` file in the same PR. Update the `updated:` frontmatter field on every touch. Architecture or structural decisions must be recorded as a new ADR in `docs/adr/`.
