---
title: Overview — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document describes the purpose, context, stakeholders, and current status of the `skipi-landing` repository. It is aimed at anyone joining the project who needs the big picture before reading the technical details.

## What is this?

`skipi-landing` is the public marketing landing page for **Skipi** (Smart KI Picture Indexer), an AI-powered photo-indexing product targeted at motorsport photographers. The page is served at [www.skipi.cloud](https://www.skipi.cloud) via Cloudflare Workers.

## Scope

This repository covers the landing page only. It is intentionally separate from the Skipi application itself. The landing page's sole dynamic function is a contact-form endpoint (`/api/contact`) that forwards submissions via the Resend email API.

## Key facts

| Property | Value |
|---|---|
| Version | 1.3.75 |
| Live URL | https://www.skipi.cloud |
| Repository | `skipi-landing` (private) |
| Status | active |
| Languages | DE, EN, FR, IT, ES, PT |
| UI features | Dark/light mode toggle, contact-form modal |

## Sections of the landing page (in order)

1. Hero
2. Differentiators
3. Features
4. Workflow comparison (manual vs. Skipi)
5. Cloud Native feature boxes
6. Supported motorsport series
7. Pricing (Tryout · Essentials · Advanced · Premier · Unlimited · Agency + Backup Add-on)
8. About (Axel Weichert, photo, biography)
9. Performance & Security (Cloudflare infrastructure)
10. FAQ
11. CTA
12. Footer (Impressum, Datenschutz)

## Stakeholders

| Role | Person/Team |
|---|---|
| Product owner & operator | Axel Weichert (axel@weichert.at) |
| Infrastructure | owlOS Founding Engineer |
| Contact form recipient | axel@weichert.at |
