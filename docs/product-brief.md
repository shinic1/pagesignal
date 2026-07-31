# PageSignal product brief

## Outcome

Help a reader act on a publication without losing the editorial context, then
help the publisher understand which questions, actions, and missing details
matter.

## Problem

Most publication assistants stop at fluent question answering. That leaves
three product gaps:

- Readers cannot see why an answer should be trusted.
- Useful intent is lost after the conversation.
- Teams cannot compare model changes against product-specific behavior.

PageSignal connects the reader experience, the model experiment, and the
editorial learning loop.

## Primary workflows

### Reader

> Help me understand this publication and complete a relevant next step.

The reader can ask by text or voice, inspect a page citation, navigate to the
source, save an agenda, and approve a simulated action.

### AI product team

> Help me select the smallest model that meets our product guardrails.

The team compares recorded provider candidates across groundedness, citation
precision, tool accuracy, latency, cost, and representative failure cases.

### Publisher

> Show me what readers are trying to accomplish and what the issue does not
answer.

Question clusters and safe abstentions become a measurable editorial backlog.

## MVP boundaries

- One synthetic nine-page summit publication
- Deterministic scenario engine for a credential-free public demo
- Optional Vapi Web SDK and authenticated server tool
- Optional Supabase event persistence
- Recorded, explicitly labeled benchmark results
- Simulated email and reservation actions only

## Success criteria

- A new reader can build the AI-focused agenda and inspect all three sources in
  under two minutes.
- A missing-information question produces an abstention and visible content gap.
- Every state-changing action asks for confirmation.
- The experiment view explains why the champion clears the routing policy.
- The experience remains usable without Vapi, Supabase, or model credentials.

## Non-goals

- Publishing or editing a real customer publication
- Claiming the synthetic benchmarks represent provider-wide performance
- Sending email, changing real inventory, or writing to a CRM
- Storing raw voice recordings or direct reader identifiers
- Exposing private reasoning traces
