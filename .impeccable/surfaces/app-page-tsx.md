---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["src/components/PageSignal.tsx","src/components/workspaces/ReaderWorkspace.tsx","src/components/workspaces/ExperimentWorkspace.tsx","src/components/workspaces/InsightsWorkspace.tsx"]
---

# PageSignal workspace

## Scope and mode

- Target: `app/page.tsx` and its shared workspace components
- Mode: Operate
- Primary user: publication and product teams reviewing a conversational publication
- Primary task: ask or replay a reader question, inspect the cited page, and understand the operating evidence behind the answer

## Chosen direction

Conversation-first editorial desk, approved from `.impeccable/mocks/conversation-first.png`.

The workspace borrows from a contemporary print production room: cool white proof stock, black ink, ruled work zones, registration marks, and safety orange for active state and proof annotations. It explicitly rejects indigo, dark developer-tool navigation, sparkle branding, rounded SaaS cards, and decorative AI chrome.

## Composition

- Light utility navigation at the left edge.
- Conversation, citations, voice state, and approval are the primary left work surface.
- The selected publication proof remains visible on the right.
- A horizontal nine-page flatplan spans the bottom of the Reader workspace.
- Experiments and Reader Signals inherit the same ruled production-sheet grammar.

## Fidelity inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Navigation | Light rail, wordmark, orange active rule, no filled icon tiles | Semantic React + CSS |
| Conversation desk | Dense transcript, citation annotations, voice and approval states | Existing semantic React + CSS |
| Publication proof | One selected page, large enough to inspect, editorial serif retained | Existing semantic React + CSS |
| Evidence link | Orange citation/page annotation language | React + CSS |
| Flatplan | Nine horizontal proof thumbnails with folios and titles | React + CSS |
| Controls | Square or 2–4px corners, black primary action, orange active state | CSS |
| Type | Workhorse system sans for UI; Georgia remains inside the synthetic publication | CSS |
| Rules and registration marks | 1px charcoal/gray rules; small exact geometric marks | CSS/SVG |
| Imagery | Existing synthetic publication artwork only | Existing code |

## Responsive behavior

- Desktop keeps the conversation/proof split and bottom flatplan.
- Tablet stacks conversation above proof and keeps flatplan horizontally scrollable.
- Mobile shows conversation first, then proof, with a horizontally scrollable flatplan and no document overflow.

## Constraints

- Preserve Reader, Experiments, Reader Signals, citations, confirmation, APIs, and Vapi/browser voice behavior.
- Preserve synthetic-data disclosure.
- Do not literalize text or imagery invented by the approved comp.
