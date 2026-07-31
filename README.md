# PageSignal

PageSignal lets readers ask questions about a digital publication, check cited
pages, and approve follow-up actions. Publishers can review questions that the
source does not answer.

The prototype has three workspaces:

1. **Reader.** Ask a synthetic publication by text or voice, check page
   citations, and approve demo actions.
2. **Experiments.** Compare recorded model candidates across groundedness,
   citation precision, tool accuracy, latency, and estimated cost.
3. **Reader signals.** Review reader intent and add missing details to the
   editorial backlog.

All publication content, people, analytics, and benchmark results are synthetic.

## Live demo

[Open PageSignal](https://pagesignal.pages.dev). It runs on Cloudflare.

## Product principles

- **Cite supported answers.** Readers can open each source page.
- **Record missing details.** The assistant adds unanswered questions to the
  content backlog.
- **Confirm state changes.** Email and registration actions ask for approval.
- **Route with guardrails.** The team selects a model after it clears the
  citation, tool, and latency thresholds.
- **Support credential-free review.** The public demo uses deterministic
  responses and recorded benchmarks when provider keys are absent.

## Stack

- React 19, Next.js-compatible App Router, TypeScript, and vinext
- Cloudflare Workers runtime
- Vapi Web SDK for the production real-time voice path
- Supabase/Postgres event storage with a server-only service role boundary
- Browser speech recognition as a credential-free preview
- Deterministic, citation-bearing scenario engine
- Vitest product-behavior evaluations

The server exposes the Vapi tool boundary at
`POST /api/vapi/tools`. A configured Vapi assistant calls
`answer_publication_question`; the server validates the request, retrieves the
grounded scenario result, and returns structured citations and safe actions.
The client sends reader events to `POST /api/events`. A configured Supabase
store saves allowlisted event types without raw question text or reader
identifiers.

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Vapi is optional. Without its public key and assistant ID, the microphone button
uses supported browser speech APIs and routes the transcript through the local
grounded endpoint.

## Deploy to Cloudflare

The public Pages hostname forwards to the full-stack Worker through
`cloudflare-pages/_worker.js`. For the first release, create the Pages project
and configure its upstream:

```bash
npx wrangler pages project create pagesignal --production-branch main
npx wrangler pages secret put UPSTREAM_ORIGIN --project-name pagesignal
```

Then deploy both layers:

```bash
npm run deploy
```

## Validate

```bash
npm run validate
```

Or run checks separately:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Repository boundaries

- Never commit private Vapi or model-provider keys.
- The public Vapi key may be used client-side; the private API key must remain
  server-side.
- Vapi tool webhooks require `VAPI_WEBHOOK_SECRET`.
- No external email, reservation, CRM, or publication state changes occur in
  the public scenario.
- No call recording is required for this concept.
- The browser never receives a Supabase service role key.

## Documentation

- [Product brief](docs/product-brief.md)
- [Architecture](docs/architecture.md)
- [Vapi assistant specification](docs/vapi-assistant-prompt.md)
- [Security and data handling](SECURITY.md)
