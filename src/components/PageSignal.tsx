"use client";

import { useEffect, useRef, useState } from "react";

import { ExperimentWorkspace } from "./workspaces/ExperimentWorkspace";
import { InsightsWorkspace } from "./workspaces/InsightsWorkspace";
import { ReaderWorkspace } from "./workspaces/ReaderWorkspace";
import { Icon, type IconName } from "./Icon";
import type { WorkspaceView } from "@/src/types";

const navItems: {
  id: WorkspaceView;
  label: string;
  description: string;
  icon: IconName;
}[] = [
  {
    id: "reader",
    label: "Reader",
    description: "Conversation preview",
    icon: "book",
  },
  {
    id: "experiments",
    label: "Experiments",
    description: "Evaluate and route",
    icon: "activity",
  },
  {
    id: "insights",
    label: "Reader signals",
    description: "Review reader questions",
    icon: "insights",
  },
];

export function PageSignal() {
  const [view, setView] = useState<WorkspaceView>("reader");
  const [navOpen, setNavOpen] = useState(false);
  const [now, setNow] = useState("10:24");
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const updateClock = () => {
      const date = new Date();
      setNow(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const current = navItems.find((item) => item.id === view) ?? navItems[0];

  return (
    <div className="lab-shell">
      <aside className={`lab-sidebar ${navOpen ? "is-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <strong>PageSignal</strong>
            <span>Conversational publications</span>
          </div>
          <button
            className="mobile-close"
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          >
            <Icon name="x" size={19} />
          </button>
        </div>

        <div className="sidebar-context">
          <span className="context-label">Workspace</span>
          <button type="button">
            <span className="context-icon">
              <Icon name="spark" size={15} />
            </span>
            <span>
              <strong>Northstar Summit</strong>
              <small>Prototype publication</small>
            </span>
            <Icon name="chevron" size={14} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Product areas">
          <span className="nav-section-label">Build and learn</span>
          {navItems.map((item) => (
            <button
              className={view === item.id ? "active" : ""}
              key={item.id}
              type="button"
              onClick={() => {
                setView(item.id);
                setNavOpen(false);
              }}
            >
              <span className="nav-icon">
                <Icon name={item.icon} size={18} />
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
              {item.id === "insights" ? (
                <span className="nav-count">4</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="guardrail-card">
          <span className="guardrail-icon">
            <Icon name="shield" size={17} />
          </span>
          <div>
            <strong>Citations and approval</strong>
            <p>Answers cite pages. Email and registration require approval.</p>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="profile-avatar">NB</div>
          <div>
            <strong>Nico Bourel</strong>
            <span>Product owner</span>
          </div>
          <button type="button" aria-label="Workspace settings">
            <Icon name="settings" size={17} />
          </button>
        </div>
      </aside>

      {navOpen ? (
        <button
          className="sidebar-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <main className="lab-main">
        <header className="lab-topbar">
          <div className="topbar-title">
            <button
              className="mobile-menu"
              type="button"
              aria-label="Open navigation"
              onClick={() => setNavOpen(true)}
            >
              <Icon name="menu" size={19} />
            </button>
            <div>
              <h1>{current.label}</h1>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="scenario-badge">
              Recorded scenario
            </div>
            <div className="topbar-clock">
              <Icon name="clock" size={14} />
              <span suppressHydrationWarning>{mounted.current ? now : "10:24"}</span>
            </div>
            <a
              className="source-link"
              href="https://github.com/shinic1/pagesignal"
              target="_blank"
              rel="noreferrer"
            >
              Source
              <Icon name="external" size={13} />
            </a>
          </div>
        </header>

        <div className="standalone-notice">
          <Icon name="spark" size={14} />
          <span>
            Independent product concept. Publication content, people, analytics,
            and benchmarks are synthetic.
          </span>
        </div>

        {view === "reader" ? <ReaderWorkspace /> : null}
        {view === "experiments" ? <ExperimentWorkspace /> : null}
        {view === "insights" ? <InsightsWorkspace /> : null}
      </main>
    </div>
  );
}
