# Architecture

```text
                         ┌────────────────────────┐
                         │       PageSignal       │
                         │   React reader + lab   │
                         └───────────┬────────────┘
                                     │
                   ┌─────────────────┼──────────────────┐
                   │                 │                  │
            text / fallback       Vapi Web SDK      experiment replay
                   │                 │                  │
                   ▼                 ▼                  ▼
             POST /api/ask    real-time voice     recorded candidates
                   │                 │                  │
                   │          answer_publication_      │
                   │             question tool         │
                   │                 │                  │
                   └────────┬────────┘                  │
                            ▼                           │
                  deterministic grounded engine        │
                  citations · actions · abstention     │
                            │                           │
                            └────────────┬──────────────┘
                                         ▼
                                  POST /api/events
                                         │
                             ┌───────────┴───────────┐
                             │ configured           │ absent
                             ▼                      ▼
                      Supabase/Postgres      accepted, not stored
```

## Trust boundaries

### Browser

- May receive a Vapi public key and assistant ID.
- Never receives private Vapi credentials or a Supabase service role key.
- Executes only presentation-safe client tools such as page navigation.

### Server

- Validates Vapi webhooks with a constant-time secret comparison.
- Restricts tools to `answer_publication_question`.
- Restricts product events to an allowlist and removes unsupported property
  values.
- Uses a server-only Supabase service role when configured.

### Model

- Retrieves facts through the grounded server tool.
- Does not control policy for missing information or mutation consent.
- May request a UI navigation tool, but cannot silently send email or change
  inventory.

## Demo resilience

The public demo uses deterministic responses when credentials are absent.
Reviewers can repeat the same interaction and inspect each result. Environment
variables enable the provider integrations.
