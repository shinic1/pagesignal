import { createClient } from "@supabase/supabase-js";

export const eventTypes = [
  "reader.answer",
  "reader.action_confirmed",
  "reader.content_gap",
  "experiment.replayed",
] as const;

export type EventType = (typeof eventTypes)[number];

export type ProductEvent = {
  eventType: EventType;
  page?: number;
  properties: Record<string, string | number | boolean>;
};

export async function persistProductEvent(event: ProductEvent) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return { persisted: false, reason: "not_configured" as const };
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await supabase.from("reader_events").insert({
    event_type: event.eventType,
    publication_key: "northstar-2026",
    page_number: event.page ?? null,
    properties: event.properties,
  });

  if (error) {
    throw new Error("The event store rejected the event.");
  }

  return { persisted: true, reason: null };
}
