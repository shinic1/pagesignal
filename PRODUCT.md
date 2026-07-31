# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Publication and product teams evaluating how a publication can become a conversational, measurable reader experience.

## Product Purpose

PageSignal lets a team preview a publication with a grounded reader assistant, compare model behavior against evaluation guardrails, and review reader questions as product signals.

## Positioning

The product connects the reader-facing conversation to the operating workflow behind it: cited answers, approved actions, model evaluation, and content-gap evidence live in one workspace.

## Operating Context

Teams work across a publication preview, a conversational assistant, model benchmark results, routing rules, and aggregated reader signals. The current Northstar Summit content and analytics are synthetic and must remain labeled as such.

## Capabilities and Constraints

- Preserve the Reader, Experiments, and Reader Signals workspaces.
- Preserve grounded citations, publication navigation, confirmation before sensitive actions, and the existing API behavior.
- Preserve the optional Vapi voice-agent integration and browser voice fallback.
- Preserve the React, Node.js, Supabase/Postgres-ready, and Cloudflare deployment architecture.
- Do not add unsupported commercial claims, customers, benchmarks, or production data.

## Brand Commitments

- The product name is PageSignal.
- The interface must not use an indigo or purple-led palette, a dark developer-tool sidebar, sparkle-led AI branding, or generic rounded SaaS dashboard cards.
- The interface should read as a purpose-built publication operations product, not a coding tool or AI demo.

## Evidence on Hand

- A working synthetic publication and reader-assistant flow in `src/components/workspaces/ReaderWorkspace.tsx`.
- Recorded model evaluation cases and results in `src/data/evaluations.ts`.
- Synthetic reader-signal data in `src/components/workspaces/InsightsWorkspace.tsx`.
- Optional Vapi integration in the Reader workspace.

## Product Principles

- Show the mechanism, not an abstract AI claim.
- Keep source evidence and reader intent adjacent to the decisions they inform.
- Make synthetic data and recorded scenarios unmistakable.
- Keep risky actions explicit and confirmable.
- Favor operational clarity over decorative dashboard chrome.

## Accessibility & Inclusion

Maintain keyboard focus, semantic labels, readable operational text, responsive layouts without horizontal page overflow, and usable touch targets on mobile.
