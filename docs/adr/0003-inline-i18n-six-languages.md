---
title: "ADR 0003: Six-language i18n implemented inline in the single HTML file"
status: current
updated: 2026-05-20
owner: Founding Engineer
---

## Status

accepted

## Context

Skipi targets motorsport photographers across Europe. The markets prioritised at launch are German-speaking (DE), English-speaking (EN), French (FR), Italian (IT), Spanish (ES), and Portuguese/Brazilian (PT). Internationalisation support was therefore required from an early stage.

Options considered:
1. A build-step i18n library (e.g. i18next) with separate locale JSON files and a bundler.
2. A server-side rendering approach that serves different HTML per locale.
3. A single-file, client-side approach: embed all translations in a JavaScript object (`T`) in the HTML file, and switch the active language at runtime by walking `data-i18n` attributes.

Given the decision to use a single HTML file with no bundler (see ADR 0001), options 1 and 2 would have required introducing significant new tooling.

## Decision

Embed all translations for all six languages directly in the `public/index.html` file as a JavaScript object (`T`). Language switching is handled client-side: the `applyLang()` function iterates over all elements with `data-i18n` attributes and sets their text content from `T[lang][key]`. The active language is detected from the browser's `navigator.language`, with a fallback to DE, and the user's choice is persisted in `localStorage`.

A dedicated script (`check-i18n.js`) verifies translation completeness (both directions: HTML ↔ T object, and all languages against DE) and is required to pass before every commit.

## Consequences

**Positive:**
- No build step, no external dependencies at runtime.
- All translations are in a single file — easy to audit and update.
- `check-i18n.js` enforces consistency and catches missing translations before they reach production.
- Language switching is instant (no network round-trip).

**Negative / trade-offs:**
- The `T` object grows with every new string. As of v1.3.75 there are 118+ translated elements; the HTML file is correspondingly large.
- The `T` object cannot be lazily loaded per language — all six languages are sent to every user regardless of their locale.
- An unescaped character in any translation string can silently break the entire i18n system (this happened in v1.3.37: an unescaped apostrophe in the French translation crashed the `T` object parse). The `check-i18n.js` script runs a `new Function()` syntax check to catch this class of error.
