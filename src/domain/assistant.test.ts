import { describe, expect, it } from "vitest";

import { answerPublicationQuestion } from "./assistant";

describe("answerPublicationQuestion", () => {
  it("builds a non-overlapping AI agenda with citations", () => {
    const result = answerPublicationQuestion("Build my AI-focused afternoon");

    expect(result.action?.name).toBe("create_agenda");
    expect(result.citations.map((item) => item.page)).toEqual([5, 6, 8]);
    expect(result.answer).toContain("left it out");
  });

  it("requires confirmation before a reservation action", () => {
    const result = answerPublicationQuestion("Reserve the voice workshop");

    expect(result.action?.name).toBe("reserve_workshop");
    expect(result.action?.status).toBe("needs_confirmation");
    expect(result.navigateTo).toBe(6);
  });

  it("abstains instead of inventing dietary details", () => {
    const result = answerPublicationQuestion(
      "Do they serve vegetarian lunch?",
    );

    expect(result.citations).toHaveLength(0);
    expect(result.action?.name).toBe("record_content_gap");
    expect(result.answer).toContain("doesn’t include");
  });

  it("explains the schedule conflict with both sources", () => {
    const result = answerPublicationQuestion(
      "Can I attend the voice lab and data clinic?",
    );

    expect(result.citations.map((item) => item.page)).toEqual([6, 7]);
    expect(result.answer).toContain("both begin at 2:45 PM");
  });
});
