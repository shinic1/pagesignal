export type WorkspaceView = "reader" | "experiments" | "insights";

export type PublicationPage = {
  page: number;
  section: string;
  eyebrow: string;
  title: string;
  deck: string;
  body: string[];
  meta?: string[];
  accent: "orange" | "coral" | "blue" | "lime" | "gold";
  quote?: string;
  stat?: {
    value: string;
    label: string;
  };
};

export type Citation = {
  page: number;
  label: string;
  quote: string;
};

export type AssistantAction = {
  name:
    | "create_agenda"
    | "navigate_to_page"
    | "send_agenda"
    | "reserve_workshop"
    | "record_content_gap";
  label: string;
  status: "ready" | "needs_confirmation" | "complete";
  detail: string;
  targetPage?: number;
};

export type AssistantResponse = {
  answer: string;
  citations: Citation[];
  navigateTo?: number;
  action?: AssistantAction;
  mode: "scenario";
};

export type ConversationMessage = {
  id: string;
  role: "assistant" | "reader";
  text: string;
  citations?: Citation[];
  action?: AssistantAction;
};

export type EvalModel = {
  id: string;
  provider: string;
  profile: string;
  groundedness: number;
  toolAccuracy: number;
  citationPrecision: number;
  latency: number;
  cost: number;
  passRate: number;
  status: "champion" | "candidate" | "rejected";
  color: string;
};

export type EvalCase = {
  id: string;
  category: string;
  prompt: string;
  expected: string;
  result: "pass" | "fail" | "warning";
  score: number;
};
