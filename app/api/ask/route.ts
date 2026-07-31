import { answerPublicationQuestion } from "@/src/domain/assistant";

type AskPayload = {
  query?: unknown;
};

export async function POST(request: Request) {
  let payload: AskPayload;

  try {
    payload = (await request.json()) as AskPayload;
  } catch {
    return Response.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (typeof payload.query !== "string") {
    return Response.json(
      { error: "The query field must be a string." },
      { status: 400 },
    );
  }

  const query = payload.query.trim();
  if (!query || query.length > 500) {
    return Response.json(
      { error: "Query must contain between 1 and 500 characters." },
      { status: 400 },
    );
  }

  return Response.json(answerPublicationQuestion(query), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
