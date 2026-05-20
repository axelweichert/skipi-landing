---
title: Data Model — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document describes the data handling characteristics of `skipi-landing`. It is aimed at developers and compliance reviewers who need to understand what data the system holds and how it flows.

## No persistent data store

`skipi-landing` has no persistent storage layer. There is no D1 database, no KV namespace, no R2 bucket, no Durable Objects, and no Queues binding. The Worker does not write to or read from any storage at runtime.

## Contact-form submissions

When a user submits the contact form, the following happens:

1. The browser `POST`s a JSON payload (`name`, `email`, `message`) to `/api/contact`.
2. The Worker reads the payload from the request body — it is held in memory for the duration of the request only.
3. The Worker makes a single outbound HTTPS call to `https://api.resend.com/emails`, embedding the payload in an HTML email.
4. Resend delivers the email to `axel@weichert.at`.
5. The request completes. No data is retained in the Worker, on the Cloudflare platform, or in any database owned by this service.

The persistence of the email after delivery is governed by the email recipient's mailbox, not by this repository.

## Personal data note

The contact form collects `name`, `email address`, and `message text`. These are personal data under GDPR (DSGVO). They are transmitted to Resend (a third-party processor) and then to the recipient mailbox. The landing page's Datenschutzerklärung (`/datenschutz.html`) covers this processing.

## Static assets

The `./public` directory contains only static files (HTML, CSS/JS embedded in HTML, images, SVGs, text files). None of these files contain user data or secrets.
