# Security and data handling

PageSignal is a synthetic product concept. It does not require real reader,
customer, or publication data.

## Secrets

- Never commit `.env` files, private Vapi keys, webhook secrets, or Supabase
  service role keys.
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is the only Vapi credential designed for the
  browser.
- `VAPI_WEBHOOK_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` remain server-side.

## Voice

- The public concept does not require call recording.
- Browser speech recognition is used only as a local input fallback.
- Vapi transcript events are routed through the same grounded answer endpoint
  used by typed questions.

## Actions

- Page navigation is read-only.
- Email and reservation actions are simulated.
- The interface requires explicit confirmation before recording either action.

## Events

- Raw questions, transcript audio, names, and email addresses are not written to
  the event endpoint.
- Event types and property value shapes are allowlisted.
- The included Supabase migration enables row-level security and defines no
  anonymous browser policies.

## Reporting

Do not report vulnerabilities with real secrets in a public issue. Revoke an
exposed credential first, then use a private channel to share reproduction
details.
