import { answerPublicationQuestion } from "@/src/domain/assistant";

type ToolCall = {
  id?: string;
  name?: string;
  arguments?: unknown;
  parameters?: unknown;
  function?: {
    name?: string;
    arguments?: unknown;
    parameters?: unknown;
  };
};

type VapiPayload = {
  message?: {
    type?: string;
    toolCallList?: ToolCall[];
  };
};

function parseObject(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function argumentsFor(toolCall: ToolCall): Record<string, unknown> {
  return parseObject(
    toolCall.arguments ??
      toolCall.parameters ??
      toolCall.function?.arguments ??
      toolCall.function?.parameters,
  );
}

async function secretsMatch(provided: string, expected: string) {
  const encoder = new TextEncoder();
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const first = new Uint8Array(providedHash);
  const second = new Uint8Array(expectedHash);
  let difference = 0;
  for (let index = 0; index < first.length; index += 1) {
    difference |= first[index] ^ second[index];
  }
  return difference === 0;
}

function toolError(toolCallId: string, error: string) {
  return { toolCallId, error };
}

export async function POST(request: Request) {
  const expectedSecret = process.env.VAPI_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return Response.json(
      { error: "Voice tools are not configured." },
      { status: 503 },
    );
  }

  const authorization = request.headers.get("authorization") ?? "";
  const bearerSecret = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";
  const providedSecret =
    bearerSecret || request.headers.get("x-vapi-secret") || "";

  if (
    !providedSecret ||
    !(await secretsMatch(providedSecret, expectedSecret))
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: VapiPayload;
  try {
    payload = (await request.json()) as VapiPayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    payload.message?.type !== "tool-calls" ||
    !payload.message.toolCallList?.length
  ) {
    return Response.json({ received: true });
  }

  const results = payload.message.toolCallList.map((toolCall) => {
    const toolCallId = String(toolCall.id ?? "unknown");
    const toolName = toolCall.name ?? toolCall.function?.name;

    if (toolName !== "answer_publication_question") {
      return toolError(toolCallId, "Unknown tool requested.");
    }

    const args = argumentsFor(toolCall);
    const query = typeof args.query === "string" ? args.query.trim() : "";

    if (!query || query.length > 500) {
      return toolError(
        toolCallId,
        "The reader question was empty or too long. Ask a shorter question.",
      );
    }

    return {
      toolCallId,
      result: JSON.stringify(answerPublicationQuestion(query)),
    };
  });

  return Response.json({ results });
}
