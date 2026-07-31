import { agendaItems, publicationPages } from "@/src/data/publication";
import type {
  AssistantResponse,
  Citation,
  PublicationPage,
} from "@/src/types";

function citation(page: number, quote: string): Citation {
  const source = publicationPages.find((item) => item.page === page);

  return {
    page,
    label: source?.section ?? `Page ${page}`,
    quote,
  };
}

function containsAny(input: string, terms: string[]) {
  return terms.some((term) => input.includes(term));
}

function searchableText(page: PublicationPage) {
  return [
    page.section,
    page.eyebrow,
    page.title,
    page.deck,
    ...page.body,
    ...(page.meta ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function fallbackSearch(query: string): AssistantResponse {
  const terms = query
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 3);

  const ranked = publicationPages
    .map((page) => ({
      page,
      score: terms.reduce(
        (sum, term) => sum + (searchableText(page).includes(term) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  if (!top || top.score === 0) {
    return {
      answer:
        "The publication doesn’t cover that. I added the question to Reader signals for the editor.",
      citations: [],
      action: {
        name: "record_content_gap",
        label: "Content gap recorded",
        status: "complete",
        detail: "The editor will see this question in Reader signals.",
      },
      mode: "scenario",
    };
  }

  return {
    answer: `${top.page.title} is the closest match I found. ${top.page.deck}`,
    citations: [
      citation(top.page.page, top.page.body[0] ?? top.page.deck),
    ],
    navigateTo: top.page.page,
    action: {
      name: "navigate_to_page",
      label: `Open page ${top.page.page}`,
      status: "ready",
      detail: top.page.title,
      targetPage: top.page.page,
    },
    mode: "scenario",
  };
}

export function answerPublicationQuestion(rawQuery: string): AssistantResponse {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      answer: "Ask me about the schedule, speakers, or practical details.",
      citations: [],
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["vegetarian", "lunch", "food", "dietary", "allerg"])
  ) {
    return {
      answer:
        "The publication doesn’t include meal or dietary information. I recorded the question for the editor.",
      citations: [],
      action: {
        name: "record_content_gap",
        label: "Content gap recorded",
        status: "complete",
        detail: "Missing topic: meals and dietary accommodations.",
      },
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["agenda", "afternoon", "ai-focused", "ai focused"])
  ) {
    const agenda = agendaItems
      .map((item) => `${item.time} ${item.title}`)
      .join(", ");

    return {
      answer: `Your AI afternoon includes ${agenda}. The 2:45 PM data clinic conflicts with the voice lab, so the agenda excludes it.`,
      citations: [
        citation(
          5,
          "The panel examines consent, explainability, and data minimization in AI-assisted member experiences.",
        ),
        citation(
          6,
          "The lab includes a live evaluation of interruption handling, source grounding, and tool-selection accuracy.",
        ),
        citation(
          8,
          "The session covers test design, evidence thresholds, and the decision to scale, revise, or stop.",
        ),
      ],
      navigateTo: 5,
      action: {
        name: "create_agenda",
        label: "AI afternoon saved",
        status: "complete",
        detail: "3 sessions · 1:30 PM–5:00 PM",
      },
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["voice workshop", "voice lab", "where is voice"]) &&
    !containsAny(query, [
      "reserve",
      "register",
      "book",
      "save me",
      "data clinic",
      "both",
      "conflict",
    ])
  ) {
    return {
      answer:
        "Voice as a member channel starts at 2:45 PM in Room 204. It’s a 75-minute hands-on lab, and attendees should bring a laptop.",
      citations: [
        citation(
          6,
          "2:45 PM · Room 204. Voice as a member channel.",
        ),
      ],
      navigateTo: 6,
      action: {
        name: "navigate_to_page",
        label: "Opened page 6",
        status: "complete",
        detail: "Voice as a member channel",
        targetPage: 6,
      },
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["reserve", "register", "book", "save me"]) &&
    containsAny(query, ["voice", "workshop", "lab"])
  ) {
    return {
      answer:
        "The voice lab starts at 2:45 PM in Room 204. Confirm the request and I’ll add it to this demo attendee profile.",
      citations: [
        citation(
          6,
          "The voice lab starts at 2:45 PM in Room 204 and runs for 75 minutes.",
        ),
        citation(
          9,
          "Workshop changes can be made until 30 minutes before a session, subject to capacity.",
        ),
      ],
      navigateTo: 6,
      action: {
        name: "reserve_workshop",
        label: "Confirm reservation request",
        status: "needs_confirmation",
        detail: "Voice as a member channel · Demo profile",
      },
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["email", "send"]) &&
    containsAny(query, ["agenda", "schedule", "plan"])
  ) {
    return {
      answer:
        "Your three-session AI agenda is ready. I can send it to alex@northstar.demo after you confirm.",
      citations: [
        citation(5, "Responsible personalization · 1:30 PM"),
        citation(6, "Voice as a member channel · 2:45 PM"),
        citation(8, "Run the next responsible experiment · 4:15 PM"),
      ],
      action: {
        name: "send_agenda",
        label: "Confirm email",
        status: "needs_confirmation",
        detail: "To alex@northstar.demo · Synthetic demo only",
      },
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["captions", "accessible", "accessibility", "step-free"])
  ) {
    return {
      answer:
        "Studio A has live captions. You can reach each room without stairs. The responsible personalization panel meets in Studio A.",
      citations: [
        citation(5, "Responsible personalization · 1:30 PM · Studio A"),
        citation(
          9,
          "Live captions are available in Studio A. Step-free access is available for every room.",
        ),
      ],
      navigateTo: 9,
      mode: "scenario",
    };
  }

  if (
    containsAny(query, ["conflict", "both", "voice and", "data clinic"])
  ) {
    return {
      answer:
        "You’ll need to choose between the voice lab and the first-party data clinic: both begin at 2:45 PM and run for 75 minutes.",
      citations: [
        citation(6, "Voice as a member channel · 2:45 PM · Room 204"),
        citation(7, "First-party data clinic · 2:45 PM · The Foundry"),
      ],
      navigateTo: 6,
      mode: "scenario",
    };
  }

  return fallbackSearch(query);
}
