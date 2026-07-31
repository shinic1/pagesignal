---
name: PageSignal
description: A conversation-first publication desk for grounded reader evidence.
colors:
  safety-orange: "#f04b23"
  cool-proof-stock: "#efefec"
  navigation-stock: "#f8f8f5"
  desk-panel: "#fafaf8"
  press-white: "#ffffff"
  publication-paper: "#fffefa"
  black-ink: "#171714"
  operator-muted: "#696963"
  quiet-muted: "#8a8a83"
  charcoal-rule: "#cecec8"
  soft-rule: "#e4e4df"
  press-rule: "#bdbdb7"
  proof-stage: "#e7e7e2"
  signal-wash: "#fff0eb"
  proof-coral: "#b85d43"
  evidence-teal: "#39797c"
  proof-lime: "#b9db6a"
  warning-gold: "#d29a31"
  grounded-green: "#24a787"
typography:
  display:
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(28px, 3vw, 42px)"
    fontWeight: 760
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Georgia, serif"
    fontSize: "clamp(19px, 2.35vw, 38px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "11px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  square: "0px"
  paper: "1px"
  control: "2px"
  utility: "3px"
  circle: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "18px"
  "6": "24px"
  "7": "30px"
components:
  button-primary:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.press-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#c93c1b"
    textColor: "{colors.press-white}"
    rounded: "{rounded.control}"
  button-ink:
    backgroundColor: "{colors.black-ink}"
    textColor: "{colors.press-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "44px"
  button-ghost:
    backgroundColor: "{colors.press-white}"
    textColor: "{colors.black-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 9px"
    height: "34px"
  conversation-field:
    backgroundColor: "{colors.press-white}"
    textColor: "{colors.black-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "5px 6px"
    height: "50px"
  production-sheet:
    backgroundColor: "{colors.desk-panel}"
    textColor: "{colors.black-ink}"
    rounded: "{rounded.square}"
    padding: "16px"
  citation-card:
    backgroundColor: "#fffaf7"
    textColor: "{colors.black-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "9px"
---

# Design System: PageSignal

## Overview

**Creative North Star: "The Press Desk"**

PageSignal feels like a calm publication-production room: cool proof stock, black ink, measured charcoal rules, and safety orange applied with the precision of an annotation pencil. The interface is dense enough for real operating evidence but never reads as a generic dashboard; its hierarchy comes from ruled work zones, typographic contrast, and adjacency rather than decorative containers.

Conversation and voice are treated as first-class editorial instruments. Reader intent, citations, approval states, the selected proof, and the nine-page flatplan form one evidence chain, so an operator can move from question to source to action without leaving the publication context.

The system explicitly rejects indigo or purple-led AI chrome, dark developer-tool navigation, sparkle branding, gradients, glass effects, and soft stacks of rounded SaaS cards.

**Key Characteristics:**

- Cool, lightly varied paper surfaces with black and charcoal structure.
- Safety orange reserved for active state, proof linkage, and consequential action.
- Ruled, exact, operational components with predominantly square corners.
- System sans typography for the workspace; editorial serif confined to publication content.
- Conversation, source proof, and flatplan kept visibly connected.

## Colors

The palette is mostly cool paper and ink, with one high-visibility orange signal and restrained secondary inks for proof content, status, and evidence categories.

### Primary

- **Safety Orange** (`safety-orange`): Marks selected navigation, citations, active proofs, primary actions, focus outlines, and live voice state.
- **Signal Wash** (`signal-wash`): Provides a pale annotation field for selected rows, suggestions, and orange-led supporting states.

### Secondary

- **Proof Coral** (`proof-coral`): Supports warnings and selected synthetic publication accents without competing with the primary signal.
- **Evidence Teal** (`evidence-teal`): Identifies secondary evidence and reader-signal categories.
- **Proof Lime** (`proof-lime`): Appears only inside publication artwork and compact proof markers.
- **Warning Gold** (`warning-gold`): Identifies review and confirmation states that need attention but are not errors.
- **Grounded Green** (`grounded-green`): Confirms completed, supported, ready, or approved states.

### Neutral

- **Black Ink** (`black-ink`): Primary text, black action controls, and the strongest conversational contrast.
- **Cool Proof Stock** (`cool-proof-stock`): The workspace canvas.
- **Navigation Stock** (`navigation-stock`): The light left rail and fixed production navigation.
- **Desk Panel** (`desk-panel`): Toolbars, headers, and production-sheet surfaces.
- **Press White** (`press-white`): Inputs, ghost controls, and small lifted paper elements.
- **Publication Paper** (`publication-paper`): The warmer sheet used only for the synthetic publication itself.
- **Operator Muted** (`operator-muted`): Secondary copy and metadata.
- **Quiet Muted** (`quiet-muted`): Tertiary labels, disabled context, and low-emphasis icons.
- **Charcoal Rule** (`charcoal-rule`): Default component and section rule.
- **Soft Rule** (`soft-rule`): Internal row and cell dividers.
- **Press Rule** (`press-rule`): Strong shell, toolbar, and work-zone boundaries.
- **Proof Stage** (`proof-stage`): The gray pasteboard behind the selected publication page.

### Named Rules

**The Safety Signal Rule.** Safety orange identifies interaction, evidence linkage, or consequence; it is not a decorative page fill.

**The Paper Before Color Rule.** Establish hierarchy with stock, ink, and rules first; secondary hues belong to proof content and operational status.

## Typography

**Display Font:** System UI sans (`ui-sans-serif` with native platform fallbacks)

**Body Font:** System UI sans (`ui-sans-serif` with native platform fallbacks)
**Publication Font:** Georgia (with the browser serif fallback)

**Character:** The interface uses a compact, workmanlike sans that remains legible at production density. Georgia introduces editorial authority only inside publication previews, keeping the application unmistakably operational.

### Hierarchy

- **Display** (760, fluid 28–42px, 1.08): Workspace introductions and major operating questions.
- **Headline** (400, fluid 19–38px, 1.02): Synthetic publication headlines and decks inside the proof.
- **Title** (700, 16px, 1.2): Topbar titles and primary local headings.
- **Body** (400, 12px, 1.6): Conversation, evidence explanations, and descriptive operational copy.
- **Label** (800, 11px, 0.1em when uppercase): Buttons, statuses, table headers, folios, and compact controls; routine labels omit tracking and uppercase when scan speed matters.

### Named Rules

**The Two Registers Rule.** Use the system sans for operating the publication and Georgia only for content that belongs to the publication.

**The Small Type Is Work Rule.** Text at 10–12px carries metadata or control meaning, so preserve contrast, line height, and clear grouping.

## Layout

The desktop shell uses a fixed light rail (196px) beside a fluid workspace. The Reader view is a production flatplan: conversation and voice occupy the leading work surface, the selected publication proof stays adjacent on the right, and a 176px horizontal strip exposes all nine pages below. The upper split balances a minimum 430px conversation desk against a minimum 500px proof area.

Ruled boundaries replace card gutters as the primary organizing device. Core spacing follows a compact 4px rhythm, with common gaps and insets at 8px, 12px, 16px, 18px, 24px, and 30px. Production sheets may be information-dense, but related evidence remains adjacent and columns keep a clear reading order.

At 1180px the rail and split tighten. At 920px the navigation becomes an off-canvas sheet, conversation stacks above the proof, and the flatplan remains horizontally scrollable. At 640px toolbars simplify, proof pages size to the viewport, and voice/send/action targets reach 44px without creating horizontal page overflow.

## Elevation & Depth

The workspace is flat and layered. Tonal paper shifts and 1px rules separate navigation, conversation, toolbars, tables, and metric sheets; ordinary panels do not cast shadows. Shadows are structural exceptions for a loose publication sheet on the pasteboard and for the off-canvas navigation while it sits above mobile content.

### Shadow Vocabulary

- **Loose Proof** (`0 14px 36px rgba(23, 23, 20, 0.14)`): Separates the selected publication page from the gray proof stage.
- **Proof Thumbnail** (`0 3px 8px rgba(23, 23, 20, 0.10)`): Gives flatplan thumbnails just enough paper presence to read as miniature sheets.
- **Mobile Navigation** (`18px 0 45px rgba(23, 23, 20, 0.16)`): Clarifies that the open rail temporarily overlays the workspace.

### Named Rules

**The Flat Production Rule.** Surfaces stay flat at rest; use rules and stock changes before introducing a shadow.

**The Loose Paper Exception.** Shadow belongs to physical proof sheets or temporary overlays, never to routine dashboard-style cards.

## Shapes

The form language is square, pressed, and economical. Large work zones and production sheets use square corners; buttons, fields, citations, badges, and evidence blocks use 1–3px corners. Thin gray or charcoal borders carry structure. Circles are reserved for people, assistant identities, status dots, and voice-state marks where the silhouette carries meaning.

Publication pages clip their own artwork and preserve a physical paper aspect ratio. Flatplan thumbnails remain rectangular and visibly page-like rather than becoming image tiles.

## Components

Components are ruled, exact, and operational. Their state changes should look like proof markup: a border strengthens, a paper tone changes, or safety orange establishes an explicit link.

### Buttons

- **Shape:** Square controls with a restrained 2px corner; icon-only utilities use the same geometry.
- **Primary:** Safety-orange field with white label, 44px touch height where it drives an action, and compact horizontal padding.
- **Hover / Focus:** Orange actions deepen on hover; all interactive elements receive a 3px translucent orange focus outline with 2px offset.
- **Ink / Ghost:** Black ink is used for decisive but neutral actions such as starting voice; ghost controls remain white or transparent with a charcoal rule.

### Chips

- **Style:** Compact 2px labels use a pale paper or status wash with ink colored to the state.
- **State:** Selected or consequential chips use orange; green communicates grounded or ready; gold communicates review; chips never become decorative pills.

### Cards / Containers

- **Corner Style:** Square production sheets (0px); small evidence blocks may use 2px.
- **Background:** Desk Panel for ruled sheets, Press White for nested controls, and Signal Wash only for orange-led state.
- **Shadow Strategy:** Flat by default; see the Loose Paper exception in Elevation & Depth.
- **Border:** 1px charcoal or press rule, with soft rules between rows.
- **Internal Padding:** Typically 12–18px, increasing to 24–30px around workspace-level content.

### Inputs / Fields

- **Style:** White field, 1px strong rule, 2px corners, and a 50px desktop working height.
- **Focus:** The conversation field strengthens to black ink without glow; individual focusable controls retain the shared orange outline.
- **Error / Disabled:** Error copy uses coral on a pale coral field; disabled controls keep their geometry and lower opacity to 46%.

### Navigation

The rail stays light. Each 49px item has a transparent 3px leading rule; hover adds a subtle gray stock, while active state adds the safety-orange rule and orange icon. At tablet width the full rail becomes a temporary off-canvas sheet behind a scrim.

### Citation Cards

A citation is a compact paper annotation with a pale warm field, orange rule, 2px corners, a page folio, source title, quote, and directional affordance. Hover shifts the field toward Signal Wash, and activating it moves the adjacent proof to the cited page.

### Voice Control Strip

Voice receives its own ruled strip rather than hiding inside the text composer. The idle strip is gray proof stock with a black 44px action; live state changes the stock and top rule to orange, then changes the action itself to orange.

### Flatplan

The flatplan is a horizontal series of miniature pages with folios and titles. A selected page uses a pale orange stock, an orange proof border, and a 3px orange baseline; the strip scrolls horizontally rather than wrapping or dropping pages.

## Do's and Don'ts

### Do:

- **Do** keep conversation, citations, the selected proof, and the flatplan visibly connected as one evidence chain.
- **Do** establish hierarchy with paper tone, ink, 1px rules, and spacing before adding color.
- **Do** reserve safety orange for active state, proof linkage, focus, and consequential action.
- **Do** use 0–3px corners for routine workspace components and 44px touch targets on compact mobile actions.
- **Do** keep synthetic-data and recorded-scenario disclosures visually explicit.

### Don't:

- **Don't** introduce indigo or purple-led AI branding, sparkle motifs, gradients, or glass effects.
- **Don't** turn the light publication rail into dark developer-tool chrome.
- **Don't** restyle production sheets as floating rounded SaaS cards.
- **Don't** use editorial serif for application controls, metadata, or operational tables.
- **Don't** use a shadow where a rule or stock change can express the same hierarchy.
