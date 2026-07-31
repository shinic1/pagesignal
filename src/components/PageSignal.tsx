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
  icon: IconName;
}[] = [
  {
    id: "reader",
    label: "Reader",
    icon: "book",
  },
  {
    id: "experiments",
    label: "Experiments",
    icon: "activity",
  },
  {
    id: "insights",
    label: "Reader signals",
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
          <strong>PageSignal</strong>
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
          <button type="button">
            <span>
              <strong>Northstar Summit</strong>
              <small>9-page proof</small>
            </span>
            <Icon name="chevron" size={14} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Product areas">
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
              </span>
              {item.id === "insights" ? (
                <span className="nav-count">4</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

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
              <span className="topbar-publication">Northstar Member Summit</span>
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
          <Icon name="shield" size={14} />
          <span>
            Synthetic workspace · publication content, people, analytics, and
            benchmarks are illustrative.
          </span>
        </div>

        {view === "reader" ? <ReaderWorkspace /> : null}
        {view === "experiments" ? <ExperimentWorkspace /> : null}
        {view === "insights" ? <InsightsWorkspace /> : null}
      </main>
    </div>
  );
}
