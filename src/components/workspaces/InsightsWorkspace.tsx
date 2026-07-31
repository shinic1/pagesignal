"use client";

import { useState } from "react";

import { Icon } from "@/src/components/Icon";

const clusters = [
  {
    label: "Agenda planning",
    count: 38,
    change: "+12%",
    color: "#6d5dfc",
    example: "Which AI sessions don’t overlap?",
  },
  {
    label: "Session logistics",
    count: 27,
    change: "+4%",
    color: "#298dbd",
    example: "Where is the voice workshop?",
  },
  {
    label: "Registration",
    count: 21,
    change: "+9%",
    color: "#f36f56",
    example: "Can you reserve my seat?",
  },
  {
    label: "Accessibility",
    count: 14,
    change: "0%",
    color: "#d29a31",
    example: "Are captions available?",
  },
  {
    label: "Meals & dietary",
    count: 11,
    change: "New",
    color: "#24a787",
    example: "Is there a vegetarian lunch?",
  },
];

const recentSignals = [
  {
    time: "10:22",
    type: "Action",
    title: "AI afternoon agenda created",
    detail: "Pages 5, 6, and 8 · 3 citations",
    icon: "layers" as const,
  },
  {
    time: "10:18",
    type: "Gap",
    title: "Meal information unavailable",
    detail: "Question safely abstained · editor follow-up suggested",
    icon: "insights" as const,
  },
  {
    time: "10:11",
    type: "Intent",
    title: "High interest in Voice AI",
    detail: "7 reader turns · 3 reservation requests",
    icon: "target" as const,
  },
  {
    time: "09:58",
    type: "Navigation",
    title: "Responsible personalization opened",
    detail: "Voice navigation · page 5",
    icon: "book" as const,
  },
];

export function InsightsWorkspace() {
  const [gapResolved, setGapResolved] = useState(false);
  const [range, setRange] = useState("Today");

  return (
    <section className="insights-workspace">
      <div className="workspace-intro insights-intro">
        <div>
          <span className="section-kicker">Reader intelligence</span>
          <h2>Turn questions into content decisions.</h2>
          <p>
            See what readers are trying to accomplish, where the publication
            helps, and where it needs to improve.
          </p>
        </div>
        <label className="range-picker">
          <Icon name="clock" size={14} />
          <select value={range} onChange={(event) => setRange(event.target.value)}>
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </label>
      </div>

      <div className="insight-metrics">
        <article>
          <span className="metric-icon violet">
            <Icon name="activity" size={17} />
          </span>
          <div>
            <small>Reader turns</small>
            <strong>126</strong>
            <span className="metric-change positive">↑ 18% from baseline</span>
          </div>
          <svg viewBox="0 0 120 44" aria-hidden="true">
            <path d="M2 37 C18 36 19 26 34 29 S51 35 62 20 82 29 91 14 105 12 118 4" />
          </svg>
        </article>
        <article>
          <span className="metric-icon blue">
            <Icon name="target" size={17} />
          </span>
          <div>
            <small>Grounded answer rate</small>
            <strong>94.4%</strong>
            <span className="metric-change">119 cited answers</span>
          </div>
          <div className="donut" style={{ "--value": "94.4%" } as React.CSSProperties}>
            <span>94</span>
          </div>
        </article>
        <article>
          <span className="metric-icon coral">
            <Icon name="route" size={17} />
          </span>
          <div>
            <small>Approved actions</small>
            <strong>31</strong>
            <span className="metric-change positive">24.6% of turns</span>
          </div>
          <div className="mini-bars" aria-hidden="true">
            {[20, 32, 28, 42, 37, 55, 68].map((height, index) => (
              <i key={index} style={{ height }} />
            ))}
          </div>
        </article>
        <article>
          <span className="metric-icon lime">
            <Icon name="insights" size={17} />
          </span>
          <div>
            <small>Content gaps</small>
            <strong>{gapResolved ? 3 : 4}</strong>
            <span className="metric-change warning">
              {gapResolved ? "1 resolved today" : "1 needs attention"}
            </span>
          </div>
          <span className="gap-badge">{gapResolved ? "3" : "4"}</span>
        </article>
      </div>

      <div className="insights-grid">
        <article className="question-clusters panel-card">
          <header className="panel-card-header">
            <div>
              <span className="section-kicker">Intent clusters</span>
              <h3>What readers are asking</h3>
            </div>
            <span className="sample-label">Synthetic sample · n=111</span>
          </header>
          <div className="cluster-list">
            {clusters.map((cluster) => (
              <button type="button" key={cluster.label}>
                <span
                  className="cluster-dot"
                  style={{ background: cluster.color }}
                />
                <span className="cluster-name">
                  <strong>{cluster.label}</strong>
                  <small>“{cluster.example}”</small>
                </span>
                <span className="cluster-bar">
                  <i
                    style={{
                      background: cluster.color,
                      width: `${(cluster.count / 38) * 100}%`,
                    }}
                  />
                </span>
                <strong className="cluster-count">{cluster.count}</strong>
                <small className="cluster-change">{cluster.change}</small>
                <Icon name="chevron" size={14} />
              </button>
            ))}
          </div>
        </article>

        <aside
          className={`content-gap-card panel-card ${gapResolved ? "resolved" : ""}`}
        >
          <header className="panel-card-header compact">
            <div>
              <span className="section-kicker">Priority content gap</span>
              <h3>{gapResolved ? "Marked for next issue" : "Meals & dietary needs"}</h3>
            </div>
            <span className="gap-priority">
              {gapResolved ? (
                <Icon name="check" size={13} />
              ) : (
                <Icon name="activity" size={13} />
              )}
              {gapResolved ? "Queued" : "High"}
            </span>
          </header>
          <div className="gap-question">
            <span>11</span>
            <div>
              <strong>unanswered reader turns</strong>
              <p>“Do they serve vegetarian lunch?”</p>
            </div>
          </div>
          <div className="gap-evidence">
            <div>
              <span>
                <Icon name="search" size={13} />
              </span>
              <p>
                No meal, lunch, dietary, or allergy information appears in the
                nine-page source.
              </p>
            </div>
            <div>
              <span>
                <Icon name="shield" size={13} />
              </span>
              <p>
                The assistant abstained on all 11 turns. No unsupported answer
                was shown.
              </p>
            </div>
          </div>
          <div className="suggested-edit">
            <span>Suggested next step</span>
            <p>
              Add a “Meals & dietary accommodations” block to page 9 with a
              support contact and response deadline.
            </p>
          </div>
          <button
            className="queue-edit"
            type="button"
            onClick={() => setGapResolved((current) => !current)}
          >
            <Icon name={gapResolved ? "refresh" : "check"} size={14} />
            {gapResolved ? "Undo queue" : "Queue for next issue"}
          </button>
        </aside>
      </div>

      <article className="signal-stream panel-card">
        <header className="panel-card-header">
          <div>
            <span className="section-kicker">Audit trail</span>
            <h3>Recent reader signals</h3>
          </div>
          <button type="button">
            View all events
            <Icon name="arrow" size={14} />
          </button>
        </header>
        <div className="signal-list">
          {recentSignals.map((signal) => (
            <div key={`${signal.time}-${signal.title}`}>
              <span className="signal-time">{signal.time}</span>
              <span className={`signal-icon signal-${signal.type.toLowerCase()}`}>
                <Icon name={signal.icon} size={15} />
              </span>
              <span className="signal-type">{signal.type}</span>
              <span className="signal-content">
                <strong>{signal.title}</strong>
                <small>{signal.detail}</small>
              </span>
              <button type="button" aria-label={`Inspect ${signal.title}`}>
                <Icon name="chevron" size={15} />
              </button>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
