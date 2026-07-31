"use client";

import { useEffect, useMemo, useState } from "react";

import { Icon } from "@/src/components/Icon";
import { evalCases, evalModels } from "@/src/data/evaluations";

function ScoreRing({
  value,
  color,
  size = 42,
}: {
  value: number;
  color: string;
  size?: number;
}) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <span className="score-ring" style={{ height: size, width: size }}>
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle className="score-ring-track" cx="20" cy="20" r={radius} />
        <circle
          className="score-ring-value"
          cx="20"
          cy="20"
          r={radius}
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <strong>{Math.round(value)}</strong>
    </span>
  );
}

export function ExperimentWorkspace() {
  const [selectedModel, setSelectedModel] = useState(evalModels[0].id);
  const [promptVersion, setPromptVersion] = useState("v7 · grounded-actions");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [lastRun, setLastRun] = useState("4 minutes ago");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 7);
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setIsRunning(false);
            setLastRun("just now");
          }, 280);
        }
        return next;
      });
    }, 120);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  const activeModel = useMemo(
    () =>
      evalModels.find((model) => model.id === selectedModel) ?? evalModels[0],
    [selectedModel],
  );

  const runEvaluation = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <section className="experiment-workspace">
      <div className="workspace-intro experiment-intro">
        <div>
          <span className="section-kicker">Experiment 018</span>
          <h2>Grounded reader actions</h2>
          <p>
            Choose the smallest model that clears every product guardrail—not
            simply the model with the highest aggregate score.
          </p>
        </div>
        <div className="experiment-actions">
          <label>
            <span>Prompt configuration</span>
            <select
              value={promptVersion}
              onChange={(event) => setPromptVersion(event.target.value)}
            >
              <option>v7 · grounded-actions</option>
              <option>v6 · citation-first</option>
              <option>v5 · baseline</option>
            </select>
          </label>
          <button
            className="run-evaluation"
            type="button"
            onClick={runEvaluation}
            disabled={isRunning}
          >
            <Icon name={isRunning ? "refresh" : "play"} size={15} />
            {isRunning ? `Replaying ${progress}%` : "Replay benchmark"}
          </button>
        </div>
      </div>

      <div className="benchmark-disclosure">
        <Icon name="shield" size={15} />
        <span>
          Recorded benchmark · 30 synthetic test turns · no live provider calls
        </span>
        <small>Last replay {lastRun}</small>
      </div>

      <div className="experiment-grid">
        <div className="model-comparison panel-card">
          <header className="panel-card-header">
            <div>
              <span className="section-kicker">Model candidates</span>
              <h3>Quality, latency, and cost</h3>
            </div>
            <button type="button" aria-label="Model comparison settings">
              <Icon name="settings" size={16} />
            </button>
          </header>

          <div className="model-table" role="table">
            <div className="model-table-head" role="row">
              <span>Candidate</span>
              <span>Pass rate</span>
              <span>Grounded</span>
              <span>Tools</span>
              <span>p95</span>
              <span>Cost / turn</span>
            </div>
            {evalModels.map((model) => (
              <button
                className={`model-row ${selectedModel === model.id ? "selected" : ""}`}
                key={model.id}
                type="button"
                role="row"
                onClick={() => setSelectedModel(model.id)}
              >
                <span className="model-identity">
                  <i style={{ background: model.color }}>
                    {model.provider.slice(0, 1)}
                  </i>
                  <span>
                    <strong>{model.provider}</strong>
                    <small>{model.profile}</small>
                  </span>
                  {model.status === "champion" ? (
                    <em>Champion</em>
                  ) : null}
                </span>
                <span>
                  <ScoreRing
                    value={model.passRate}
                    color={model.color}
                    size={40}
                  />
                </span>
                <span>
                  <strong>{model.groundedness.toFixed(1)}%</strong>
                  <small>answer support</small>
                </span>
                <span>
                  <strong>{model.toolAccuracy.toFixed(1)}%</strong>
                  <small>exact match</small>
                </span>
                <span>
                  <strong>{model.latency} ms</strong>
                  <small>recorded</small>
                </span>
                <span>
                  <strong>${model.cost.toFixed(4)}</strong>
                  <small>estimated</small>
                </span>
              </button>
            ))}
          </div>

          <div className="evaluation-progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <aside className="routing-panel panel-card">
          <header className="panel-card-header compact">
            <div>
              <span className="section-kicker">Routing decision</span>
              <h3>Current policy</h3>
            </div>
            <span className="policy-live">
              <i />
              Ready
            </span>
          </header>

          <div className="champion-card">
            <span
              className="champion-logo"
              style={{ background: activeModel.color }}
            >
              {activeModel.provider.slice(0, 1)}
            </span>
            <div>
              <small>Selected candidate</small>
              <strong>{activeModel.provider}</strong>
              <span>{activeModel.profile}</span>
            </div>
            <ScoreRing
              value={activeModel.passRate}
              color={activeModel.color}
              size={48}
            />
          </div>

          <div className="routing-logic">
            <span className="logic-node input-node">
              <Icon name="mic" size={14} />
              Reader turn
            </span>
            <i />
            <span className="logic-node">
              <Icon name="shield" size={14} />
              Retrieval confidence ≥ .82
            </span>
            <i />
            <div className="logic-split">
              <span>
                <small>yes</small>
                <strong>Fast route</strong>
                <em>OpenAI</em>
              </span>
              <span>
                <small>no</small>
                <strong>Abstain</strong>
                <em>Record gap</em>
              </span>
            </div>
          </div>

          <div className="guardrail-list">
            <div>
              <span>
                <Icon name="check" size={13} />
              </span>
              <div>
                <strong>Citation precision ≥ 95%</strong>
                <small>{activeModel.citationPrecision.toFixed(1)}% observed</small>
              </div>
            </div>
            <div>
              <span>
                <Icon name="check" size={13} />
              </span>
              <div>
                <strong>Mutation requires confirmation</strong>
                <small>8 / 8 adversarial turns passed</small>
              </div>
            </div>
            <div>
              <span>
                <Icon name="check" size={13} />
              </span>
              <div>
                <strong>Unsupported claims abstain</strong>
                <small>5 / 5 missing-content turns passed</small>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="eval-cases panel-card">
        <header className="panel-card-header">
          <div>
            <span className="section-kicker">Evaluation set</span>
            <h3>Representative product behavior</h3>
          </div>
          <div className="case-summary">
            <span>
              <i className="pass" />
              7 passed
            </span>
            <span>
              <i className="warning" />
              1 review
            </span>
          </div>
        </header>

        <div className="case-list">
          {evalCases.map((item) => (
            <button
              className={`case-row ${expandedCase === item.id ? "expanded" : ""}`}
              key={item.id}
              type="button"
              onClick={() =>
                setExpandedCase((current) =>
                  current === item.id ? null : item.id,
                )
              }
            >
              <span className={`case-status ${item.result}`}>
                <Icon
                  name={item.result === "pass" ? "check" : "activity"}
                  size={13}
                />
              </span>
              <span className="case-category">{item.category}</span>
              <span className="case-prompt">
                <strong>{item.prompt}</strong>
                {expandedCase === item.id ? (
                  <small>
                    Expected behavior: {item.expected}
                  </small>
                ) : null}
              </span>
              <span className="case-score">
                {(item.score * 100).toFixed(0)}%
              </span>
              <Icon name="chevron" size={15} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
