import {
  eventTypes,
  persistProductEvent,
  type EventType,
} from "@/src/server/event-store";

type EventPayload = {
  eventType?: unknown;
  page?: unknown;
  properties?: unknown;
};

function isEventType(value: unknown): value is EventType {
  return (
    typeof value === "string" &&
    eventTypes.includes(value as EventType)
  );
}

function safeProperties(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const safe: Record<string, string | number | boolean> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (
      key.length <= 60 &&
      (typeof entry === "string" ||
        typeof entry === "number" ||
        typeof entry === "boolean")
    ) {
      safe[key] = typeof entry === "string" ? entry.slice(0, 200) : entry;
    }
  }
  return safe;
}

export async function POST(request: Request) {
  let payload: EventPayload;
  try {
    payload = (await request.json()) as EventPayload;
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!isEventType(payload.eventType)) {
    return Response.json({ error: "Unknown event type." }, { status: 400 });
  }

  const page =
    typeof payload.page === "number" &&
    Number.isInteger(payload.page) &&
    payload.page >= 1 &&
    payload.page <= 9
      ? payload.page
      : undefined;

  try {
    const result = await persistProductEvent({
      eventType: payload.eventType,
      page,
      properties: safeProperties(payload.properties),
    });

    return Response.json(
      {
        accepted: true,
        persisted: result.persisted,
      },
      { status: 202 },
    );
  } catch {
    return Response.json(
      { error: "Event persistence is temporarily unavailable." },
      { status: 503 },
    );
  }
}
