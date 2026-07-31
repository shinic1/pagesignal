# Voice Lab

Voice Lab is an independent product concept for turning a digital publication
into a grounded, conversational experience—and turning reader questions into
measurable product learning.

The prototype connects three experiences:

1. **Reader** — ask a synthetic publication a question by text or voice, inspect
   page-level citations, navigate to the source, and approve simulated actions.
2. **Experiments** — compare recorded model candidates across groundedness,
   citation precision, tool accuracy, latency, and estimated cost.
3. **Reader signals** — cluster reader intent, expose unanswered questions, and
   convert content gaps into an editorial backlog.

All publication content, people, analytics, and benchmark results are synthetic.
The project is not affiliated with or endorsed by Joomag.

## Product principles

- **Evidence before fluency.** Every supported answer links back to a source
  page.
- **Abstention is a product behavior.** Missing information becomes a visible
  content gap instead of an invented response.
- **Approval before mutation.** Email, registration, and other state-changing
  actions require explicit confirmation.
- **Route on guardrails.** A candidate only becomes the default when it clears
  product-specific thresholds—not because it has the largest aggregate score.
- **A useful demo without credentials.** The public experience runs a
  deterministic scenario and recorded benchmark when provider keys are absent.

## Stack

- React 19, Next.js-compatible App Router, TypeScript, and vinext
- Cloudflare Workers runtime
- Vapi Web SDK for the production real-time voice path
- Browser speech recognition as a credential-free preview
- Deterministic, citation-bearing scenario engine
- Vitest product-behavior evaluations

The production architecture provides a server-side Vapi tool boundary at
`POST /api/vapi/tools`. A configured Vapi assistant calls
`answer_publication_question`; the server validates the request, retrieves the
grounded scenario result, and returns structured citations and safe actions.

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
