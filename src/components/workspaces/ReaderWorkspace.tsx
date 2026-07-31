"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

import { Icon } from "@/src/components/Icon";
import {
  agendaItems,
  demoPrompts,
  publicationPages,
} from "@/src/data/publication";
import { answerPublicationQuestion } from "@/src/domain/assistant";
import type {
  AssistantAction,
  AssistantResponse,
  ConversationMessage,
  PublicationPage as PublicationPageType,
} from "@/src/types";

type RecognitionEvent = {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
};

type RecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type RecognitionConstructor = new () => RecognitionInstance;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

const initialMessages: ConversationMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "I’m grounded in this summit guide. Ask me to plan your afternoon, find a session, or explain a schedule conflict.",
  },
];

function PublicationPage({ page }: { page: PublicationPageType }) {
  if (page.page === 1) {
    return (
      <article className="publication-page cover-page">
        <div className="cover-grid" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="cover-orbit orbit-one" />
        <div className="cover-orbit orbit-two" />
        <div className="cover-brand">
          <span>Northstar</span>
          <small>Member summit</small>
        </div>
        <div className="cover-copy">
          <span className="page-eyebrow">{page.eyebrow}</span>
          <h2>{page.title}</h2>
          <p>{page.deck}</p>
        </div>
        <div className="cover-meta">
          {page.meta?.map((item) => <span key={item}>{item}</span>)}
        </div>
        <span className="page-number">01</span>
      </article>
    );
  }

  return (
    <article className={`publication-page content-page accent-${page.accent}`}>
      <header className="publication-header">
        <span>Northstar / 2026</span>
        <span>{page.section}</span>
      </header>
      <div className="page-accent-shape" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="page-story">
        <span className="page-eyebrow">{page.eyebrow}</span>
        <h2>{page.title}</h2>
        <p className="page-deck">{page.deck}</p>
        <div className="page-rule" />
        {page.body.map((paragraph) => (
          <p className="page-body-copy" key={paragraph}>
            {paragraph}
          </p>
        ))}
        {page.quote ? (
          <blockquote>
            <span>“</span>
            {page.quote}
          </blockquote>
        ) : null}
        {page.stat ? (
          <div className="page-stat">
            <strong>{page.stat.value}</strong>
            <span>{page.stat.label}</span>
          </div>
        ) : null}
      </div>
      <footer className="publication-footer">
        <div>
          {page.meta?.map((item) => <span key={item}>{item}</span>)}
        </div>
        <span className="page-number">{String(page.page).padStart(2, "0")}</span>
      </footer>
    </article>
  );
}

export function ReaderWorkspace() {
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] =
    useState<ConversationMessage[]>(initialMessages);
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(true);
  const [voiceTransport, setVoiceTransport] = useState<"vapi" | "browser">(
    "browser",
  );
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [agendaSaved, setAgendaSaved] = useState(false);
  const [activeAction, setActiveAction] = useState<AssistantAction | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const askRef = useRef<(text: string) => Promise<void>>(async () => undefined);
  const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const vapiAssistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const vapiConfigured = Boolean(vapiPublicKey && vapiAssistantId);

  const visiblePages = useMemo(() => {
    if (currentPage >= publicationPages.length) {
      return [publicationPages[publicationPages.length - 1]];
    }

    return publicationPages.slice(currentPage - 1, currentPage + 1);
  }, [currentPage]);

  const moveToPage = (page: number) => {
    setCurrentPage(
      Math.max(1, Math.min(publicationPages.length, Math.floor(page))),
    );
  };

  useEffect(() => {
    if (!vapiPublicKey || !vapiAssistantId) return;

    const vapi = new Vapi(vapiPublicKey);
    const handleStart = () => {
      setVoiceTransport("vapi");
      setIsListening(true);
      setVoiceError(null);
    };
    const handleEnd = () => setIsListening(false);
    const handleError = () => {
      setVoiceError("The live voice session could not start.");
      setIsListening(false);
    };
    const handleMessage = (message: unknown) => {
      if (!isRecord(message)) return;

      if (
        message.type === "transcript" &&
        message.transcriptType === "final" &&
        message.role === "user" &&
        typeof message.transcript === "string"
      ) {
        const transcript = message.transcript.trim();
        if (transcript) void askRef.current(transcript);
      }

      if (message.type !== "tool-calls" || !Array.isArray(message.toolCallList)) {
        return;
      }

      for (const value of message.toolCallList) {
        if (!isRecord(value)) continue;
        const functionValue = isRecord(value.function)
          ? value.function
          : undefined;
        const name =
          typeof value.name === "string"
            ? value.name
            : typeof functionValue?.name === "string"
              ? functionValue.name
              : "";
        if (name !== "navigate_to_page") continue;

        const rawArguments =
          value.arguments ?? functionValue?.arguments ?? value.parameters;
        let parameters: Record<string, unknown> = {};
        if (typeof rawArguments === "string") {
          try {
            const parsed = JSON.parse(rawArguments) as unknown;
            if (isRecord(parsed)) parameters = parsed;
          } catch {
            parameters = {};
          }
        } else if (isRecord(rawArguments)) {
          parameters = rawArguments;
        }

        if (typeof parameters.page === "number") {
          setCurrentPage(
            Math.max(
              1,
              Math.min(publicationPages.length, Math.floor(parameters.page)),
            ),
          );
        }
      }
    };

    vapi.on("call-start", handleStart);
    vapi.on("call-end", handleEnd);
    vapi.on("error", handleError);
    vapi.on("message", handleMessage);
    vapiRef.current = vapi;
    setVoiceTransport("vapi");

    return () => {
      vapi.removeAllListeners();
      void vapi.stop();
      vapiRef.current = null;
    };
  }, [vapiAssistantId, vapiPublicKey]);

  const appendResponse = (text: string, response: AssistantResponse) => {
    const timestamp = Date.now();
    setMessages((current) => [
      ...current,
      {
        id: `reader-${timestamp}`,
        role: "reader",
        text,
      },
      {
        id: `assistant-${timestamp}`,
        role: "assistant",
        text: response.answer,
        citations: response.citations,
        action: response.action,
      },
    ]);

    if (response.navigateTo) {
      moveToPage(response.navigateTo);
    }
    if (response.action?.name === "create_agenda") {
      setAgendaSaved(true);
    }
    setActiveAction(
      response.action?.status === "needs_confirmation"
        ? response.action
        : null,
    );
    window.setTimeout(() => {
      transcriptRef.current?.scrollTo({
        top: transcriptRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const ask = async (text: string) => {
    const clean = text.trim();
    if (!clean || isThinking) return;

    setQuery("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: clean }),
      });

      if (!response.ok) {
        throw new Error("Scenario endpoint unavailable");
      }

      const answer = (await response.json()) as AssistantResponse;
      window.setTimeout(() => {
        appendResponse(clean, answer);
        setIsThinking(false);
      }, 520);
    } catch {
      const fallback = answerPublicationQuestion(clean);
      appendResponse(clean, fallback);
      setIsThinking(false);
    }
  };
  askRef.current = ask;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(query);
  };

  const startVoice = () => {
    if (isListening) {
      if (voiceTransport === "vapi") {
        void vapiRef.current?.stop();
      }
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (vapiConfigured && vapiRef.current && vapiAssistantId) {
      setVoiceError(null);
      setIsListening(true);
      void vapiRef.current.start(vapiAssistantId).catch(() => {
        setVoiceError("The live voice session could not start.");
        setIsListening(false);
      });
      return;
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: RecognitionConstructor;
      webkitSpeechRecognition?: RecognitionConstructor;
    };
    const Recognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setVoiceAvailable(false);
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setQuery(transcript);
        void ask(transcript);
      }
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const speakLastAnswer = () => {
    if (!("speechSynthesis" in window)) return;
    const last = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!last) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(last.text);
    utterance.rate = 1.03;
    window.speechSynthesis.speak(utterance);
  };

  const confirmAction = () => {
    if (!activeAction) return;
    const confirmed = {
      ...activeAction,
      status: "complete" as const,
      label:
        activeAction.name === "send_agenda"
          ? "Demo email queued"
          : "Reservation request saved",
      detail:
        activeAction.name === "send_agenda"
          ? "No external email was sent."
          : "Synthetic inventory only—no real reservation was made.",
    };

    setMessages((current) => [
      ...current,
      {
        id: `action-${Date.now()}`,
        role: "assistant",
        text:
          activeAction.name === "send_agenda"
            ? "Done. The demo email event is in the audit trail; no external message was sent."
            : "Your demo reservation request is saved. No real inventory was changed.",
        action: confirmed,
      },
    ]);
    setActiveAction(null);
  };

  return (
    <section className="reader-workspace">
      <div className="publication-panel">
        <div className="publication-toolbar">
          <div className="publication-title">
            <span className="publication-cover-mini" aria-hidden="true">
              N
            </span>
            <div>
              <strong>Belonging is a system.</strong>
              <span>Northstar Member Summit · 9 pages</span>
            </div>
          </div>
          <div className="page-controls">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => moveToPage(currentPage - 1)}
            >
              <Icon name="chevron" size={15} className="flip-icon" />
            </button>
            <span>
              {currentPage}–{Math.min(currentPage + 1, publicationPages.length)}
              <small> / {publicationPages.length}</small>
            </span>
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage >= publicationPages.length}
              onClick={() => moveToPage(currentPage + 1)}
            >
              <Icon name="chevron" size={15} />
            </button>
          </div>
          <div className="publication-actions">
            <button type="button" aria-label="Search publication">
              <Icon name="search" size={16} />
            </button>
            <button type="button" aria-label="Copy publication link">
              <Icon name="copy" size={16} />
            </button>
          </div>
        </div>

        <div className="publication-stage">
          <div className="thumbnail-rail" aria-label="Publication pages">
            {publicationPages.map((page) => (
              <button
                className={
                  visiblePages.some((visible) => visible.page === page.page)
                    ? "active"
                    : ""
                }
                key={page.page}
                type="button"
                aria-label={`Open page ${page.page}: ${page.title}`}
                onClick={() => moveToPage(page.page)}
              >
                <span className={`thumb-preview thumb-${page.accent}`}>
                  <small>{page.page}</small>
                  <i />
                  <i />
                  <i />
                </span>
                <span>{page.page}</span>
              </button>
            ))}
          </div>
          <div className="page-spread">
            {visiblePages.map((page) => (
              <PublicationPage page={page} key={page.page} />
            ))}
          </div>
        </div>

        <div className="publication-bottom-bar">
          <span>
            <span className="live-dot" />
            Reader preview
          </span>
          <div>
            <button type="button" onClick={() => moveToPage(1)}>
              <Icon name="book" size={14} />
              Contents
            </button>
            <button type="button" onClick={speakLastAnswer}>
              <Icon name="speaker" size={14} />
              Read answer
            </button>
          </div>
        </div>
      </div>

      <aside className="copilot-panel">
        <header className="copilot-header">
          <div>
            <span className="assistant-avatar">
              <Icon name="spark" size={17} />
            </span>
            <div>
              <strong>Ask Northstar</strong>
              <span>
                <i />
                Grounded in 9 pages
              </span>
            </div>
          </div>
          <span
            className={`scenario-pill ${vapiConfigured ? "vapi-ready" : ""}`}
          >
            {vapiConfigured
              ? isListening
                ? "Vapi live"
                : "Vapi ready"
              : "Scenario mode"}
          </span>
        </header>

        <div className="copilot-transcript" ref={transcriptRef}>
          <div className="assistant-boundary">
            <Icon name="shield" size={14} />
            <span>
              I answer from this publication and show my sources. I won’t
              invent missing details.
            </span>
          </div>

          {messages.map((message) => (
            <div className={`message ${message.role}`} key={message.id}>
              {message.role === "assistant" ? (
                <span className="message-avatar">
                  <Icon name="spark" size={13} />
                </span>
              ) : null}
              <div>
                <p>{message.text}</p>
                {message.citations?.length ? (
                  <div className="citation-list">
                    {message.citations.map((source) => (
                      <button
                        key={`${message.id}-${source.page}`}
                        type="button"
                        onClick={() => moveToPage(source.page)}
                      >
                        <span>p. {source.page}</span>
                        <strong>{source.label}</strong>
                        <small>{source.quote}</small>
                        <Icon name="arrow" size={13} />
                      </button>
                    ))}
                  </div>
                ) : null}
                {message.action ? (
                  <div
                    className={`tool-event ${message.action.status === "complete" ? "complete" : ""}`}
                  >
                    <span>
                      <Icon
                        name={
                          message.action.name === "record_content_gap"
                            ? "insights"
                            : message.action.name === "send_agenda"
                              ? "mail"
                              : "terminal"
                        }
                        size={14}
                      />
                    </span>
                    <div>
                      <strong>{message.action.label}</strong>
                      <small>{message.action.detail}</small>
                    </div>
                    {message.action.status === "complete" ? (
                      <Icon name="check" size={15} />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ))}

          {isThinking ? (
            <div className="message assistant thinking-message">
              <span className="message-avatar">
                <Icon name="spark" size={13} />
              </span>
              <div className="thinking-dots">
                <i />
                <i />
                <i />
              </div>
            </div>
          ) : null}

          {activeAction ? (
            <div className="confirmation-card">
              <div>
                <span>
                  <Icon name="shield" size={15} />
                </span>
                <div>
                  <strong>Approval required</strong>
                  <p>{activeAction.detail}</p>
                </div>
              </div>
              <div className="confirmation-actions">
                <button type="button" onClick={() => setActiveAction(null)}>
                  Cancel
                </button>
                <button type="button" onClick={confirmAction}>
                  <Icon name="check" size={14} />
                  Confirm
                </button>
              </div>
            </div>
          ) : null}

          {agendaSaved ? (
            <div className="saved-agenda">
              <div className="saved-agenda-title">
                <span>
                  <Icon name="layers" size={14} />
                </span>
                <div>
                  <strong>Your AI afternoon</strong>
                  <small>3 sessions · no conflicts</small>
                </div>
                <Icon name="check" size={14} />
              </div>
              {agendaItems.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => moveToPage(item.page)}
                >
                  <span>{item.time}</span>
                  <strong>{item.title}</strong>
                  <small>p. {item.page}</small>
                </button>
              ))}
              <button
                className="email-agenda"
                type="button"
                onClick={() => void ask("Email me this agenda")}
              >
                <Icon name="mail" size={14} />
                Email this agenda
              </button>
            </div>
          ) : null}
        </div>

        <div className="prompt-suggestions">
          {voiceError ? (
            <span className="voice-error">
              <Icon name="activity" size={12} />
              {voiceError}
            </span>
          ) : null}
          {demoPrompts.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => void ask(prompt)}
              disabled={isThinking}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form className="copilot-input" onSubmit={handleSubmit}>
          <button
            className={`voice-button ${isListening ? "listening" : ""}`}
            type="button"
            aria-label={isListening ? "Stop listening" : "Ask by voice"}
            onClick={startVoice}
          >
            <Icon name={isListening ? "pause" : "mic"} size={18} />
            {isListening ? <span className="voice-ring" /> : null}
          </button>
          <input
            aria-label="Ask about this publication"
            placeholder={
              voiceAvailable
                ? "Ask about this publication…"
                : "Voice isn’t available—type instead"
            }
            value={query}
            maxLength={500}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="send-button"
            type="submit"
            aria-label="Send question"
            disabled={!query.trim() || isThinking}
          >
            <Icon name="send" size={17} />
          </button>
        </form>
        <div className="copilot-footer">
          <span>
            <Icon name="mic" size={11} />
            {vapiConfigured ? "Vapi real-time voice" : "Browser voice preview"}
          </span>
          <span>Actions are simulated</span>
        </div>
      </aside>
    </section>
  );
}
