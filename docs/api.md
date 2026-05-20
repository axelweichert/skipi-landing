---
title: API Reference — skipi-landing
status: current
updated: 2026-05-20
owner: Founding Engineer
---

This document describes the API surface of the `skipi-landing` Worker. It is aimed at frontend developers and integration testers who need to understand the available endpoints.

## Endpoints

### POST /api/contact

Receives a contact-form submission from the landing page and forwards it as an email via the Resend API.

**Request**

```
POST /api/contact
Content-Type: application/json
```

Request body (JSON):

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Full name of the sender |
| `email` | string | yes | Sender's email address (must contain `@`) |
| `message` | string | yes | Message body |

Example:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I have a question about Skipi."
}
```

**Responses**

| Status | Body | Meaning |
|---|---|---|
| 200 OK | `{"ok": true}` | Email delivered successfully via Resend |
| 400 Bad Request | `{"error": "Alle Felder erforderlich"}` | One or more required fields are missing |
| 400 Bad Request | `{"error": "Ungültige E-Mail"}` | `email` field does not contain `@` |
| 500 Internal Server Error | `{"error": "E-Mail konnte nicht gesendet werden"}` | Resend API returned a non-OK response |
| 500 Internal Server Error | `{"error": "Serverfehler"}` | Unexpected runtime error |

All responses include CORS headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**CORS preflight**

`OPTIONS /api/contact` returns `204 No Content` with the CORS headers above.

**Email routing**

Emails are sent from `noreply@skipi.cloud` (via Resend) to `axel@weichert.at`. The `reply_to` header is set to the sender's `email` value so replies go directly to the contact.

**Runtime secret required**

The handler uses `env.RESEND_API_KEY`. If this secret is absent the Resend call will fail with a 401 and the endpoint will return a 500. See [configuration.md](./configuration.md).

---

## Static asset serving

All paths not matched by the routes above are served from the `ASSETS` binding (the `./public` directory). This is not an API surface — it is standard static file serving.

### GET /favicon.ico

Returns a `301` redirect to `https://skipi.cloud/skipi-logo-dark.svg`.
