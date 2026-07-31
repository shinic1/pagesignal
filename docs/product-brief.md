# PageSignal product brief

## Outcome

Help readers act on a publication while they can still check its source pages.
Show publishers the questions and missing details readers encounter.

## Problem

Many publication assistants answer questions without showing their evidence.
Publishers then face three gaps:

- Readers cannot see why an answer should be trusted.
- Useful intent is lost after the conversation.
- Teams cannot compare model changes against product-specific behavior.

PageSignal gives readers cited answers. It gives product teams a model test
bench and publishers a list of missing details.

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

> Show me readers’ goals and the details missing from this issue.

Editors use question clusters and assistant refusals to plan the next issue.

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
- State-changing actions ask for confirmation.
- The experiment view shows the champion’s guardrail results.
- Readers can use the demo without Vapi, Supabase, or model credentials.

## Non-goals

- Publishing or editing a real customer publication
- Claiming the synthetic benchmarks represent provider-wide performance
- Sending email, changing real inventory, or writing to a CRM
- Storing raw voice recordings or direct reader identifiers
- Exposing private reasoning traces
