import type { PublicationPage } from "@/src/types";

export const publicationPages: PublicationPage[] = [
  {
    page: 1,
    section: "Cover",
    eyebrow: "Northstar member summit · 2026",
    title: "Build member loyalty.",
    deck: "Spend two days learning how to recognize member needs and respond with useful service.",
    body: [
      "A synthetic conference publication created for the Voice Lab product exercise.",
    ],
    accent: "violet",
    meta: ["October 15–16", "Harbor House · Chicago"],
  },
  {
    page: 2,
    section: "Welcome",
    eyebrow: "A note from the program chair",
    title: "Use the signal behind each metric.",
    deck: "The program focuses on the signals that help teams recognize member needs.",
    body: [
      "Strategists, operators, and product teams will use behavioral signals to build useful member experiences that respect privacy.",
      "Each session gives you a decision, template, or test to use at work.",
    ],
    accent: "coral",
  },
  {
    page: 3,
    section: "Morning keynote",
    eyebrow: "9:00 AM · Studio A",
    title: "Read the signals behind member behavior",
    deck: "Mara Bell · Chief Experience Officer, Common Thread",
    body: [
      "Move beyond static member personas. Mara maps the small signals that reveal momentum, hesitation, and unmet needs across a member journey.",
      "The keynote includes a practical signal inventory and a framework for deciding which behaviors deserve action.",
    ],
    meta: ["Strategy", "All levels", "45 minutes"],
    stat: { value: "09:00", label: "Doors open at 8:40" },
    accent: "gold",
  },
  {
    page: 4,
    section: "Morning workshop",
    eyebrow: "11:00 AM · The Foundry",
    title: "Run a practical retention program",
    deck: "A hands-on lifecycle mapping workshop with Imani Ross.",
    body: [
      "Map one renewal journey from first signal to human follow-up. Participants will leave with an operating cadence, owner map, and test backlog.",
      "Capacity is limited to 24 participants. Advance registration is required at the attendee desk or in the summit app.",
    ],
    meta: ["Operations", "Workshop", "24 seats"],
    accent: "blue",
  },
  {
    page: 5,
    section: "Afternoon panel",
    eyebrow: "1:30 PM · Studio A",
    title: "Responsible personalization",
    deck: "Set clear limits for consent, data use, and personalized outreach.",
    body: [
      "Three association leaders examine consent, explainability, and data minimization in AI-assisted member experiences.",
      "The panel closes with a review checklist for content, recommendation, and outreach workflows.",
    ],
    meta: ["AI", "Governance", "60 minutes"],
    accent: "coral",
  },
  {
    page: 6,
    section: "Afternoon lab",
    eyebrow: "2:45 PM · Room 204",
    title: "Voice as a member channel",
    deck: "Design a grounded voice concierge with Nico Bourel.",
    body: [
      "Build the conversation around member intent, then connect retrieval, citations, and approved actions without allowing the model to invent policy.",
      "The lab includes a live evaluation of interruption handling, source grounding, and tool-selection accuracy. Bring a laptop; no prior voice experience is required.",
    ],
    meta: ["Voice AI", "Hands-on", "75 minutes"],
    accent: "violet",
  },
  {
    page: 7,
    section: "Afternoon clinic",
    eyebrow: "2:45 PM · The Foundry",
    title: "First-party data clinic",
    deck: "Build a measurement plan from scattered engagement events.",
    body: [
      "Bring one unresolved analytics question. Facilitators will help identify the minimum viable event model, consent boundary, and reporting view.",
      "This clinic runs at the same time as the Voice as a member channel lab.",
    ],
    meta: ["Analytics", "Clinic", "75 minutes"],
    accent: "lime",
  },
  {
    page: 8,
    section: "Closing session",
    eyebrow: "4:15 PM · Studio A",
    title: "Run the next responsible experiment",
    deck: "Use a field guide to test one member outcome.",
    body: [
      "Close the day by linking one hypothesis to an observable member outcome.",
      "The session covers test design, evidence thresholds, and the decision to scale, revise, or stop.",
    ],
    meta: ["Experimentation", "All levels", "45 minutes"],
    accent: "blue",
  },
  {
    page: 9,
    section: "Plan your visit",
    eyebrow: "Practical details",
    title: "Plan your summit day.",
    deck: "Registration, accessibility, transit, and support.",
    body: [
      "The attendee desk opens at 8:00 AM in the Harbor House atrium. Workshop changes can be made until 30 minutes before a session, subject to capacity.",
      "Live captions are available in Studio A. Step-free access is available for every room. For additional accommodations, visit the attendee desk.",
    ],
    meta: ["Attendee desk · Atrium", "Support · Level 1"],
    accent: "gold",
  },
];

export const demoPrompts = [
  "Build my AI-focused afternoon",
  "Where is the voice workshop?",
  "Reserve the voice workshop",
  "Do they serve vegetarian lunch?",
];

export const agendaItems = [
  {
    time: "1:30 PM",
    title: "Responsible personalization",
    page: 5,
  },
  {
    time: "2:45 PM",
    title: "Voice as a member channel",
    page: 6,
  },
  {
    time: "4:15 PM",
    title: "Run the next responsible experiment",
    page: 8,
  },
];
