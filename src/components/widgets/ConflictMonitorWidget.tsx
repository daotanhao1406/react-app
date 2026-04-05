import React, { useState } from "react";
import { AlertOutlined } from "@ant-design/icons";
import WidgetCard from "./WidgetCard";

interface ConflictEvent {
  id: string;
  region: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  time: string;
  coordinates?: string;
  type: "airstrike" | "naval" | "ground" | "cyber" | "diplomatic";
}

const CONFLICT_EVENTS: ConflictEvent[] = [
  {
    id: "1",
    region: "Persian Gulf",
    severity: "critical",
    description:
      "US F-35C and F/A-18 Hornet downed over Iranian airspace — SAR mission active",
    time: "14m ago",
    coordinates: "27.4°N 56.2°E",
    type: "airstrike",
  },
  {
    id: "2",
    region: "Kuwait — Camp Arifjan",
    severity: "critical",
    description:
      "CH-47 Chinook struck by Iranian drone at US Army installation",
    time: "31m ago",
    coordinates: "29.1°N 48.1°E",
    type: "airstrike",
  },
  {
    id: "3",
    region: "Strait of Hormuz",
    severity: "high",
    description:
      "USS Carl Vinson CSG repositioning to Gulf of Oman — EMCON Alpha active",
    time: "1h 12m ago",
    type: "naval",
  },
  {
    id: "4",
    region: "Eastern Ukraine",
    severity: "high",
    description:
      "Russian Kalibr cruise missiles targeted Zaporizhzhia energy grid — 4 KIA confirmed",
    time: "26m ago",
    type: "ground",
  },
  {
    id: "5",
    region: "Red Sea",
    severity: "medium",
    description:
      "Houthi maritime drone intercept: MV Nordic Spirit — crew evacuated",
    time: "2h 44m ago",
    type: "naval",
  },
];

const SEVERITY_CONFIG = {
  critical: {
    color: "#ff3d3d",
    bg: "#2a1010",
    label: "CRITICAL",
    dot: "#ff3d3d",
  },
  high: { color: "#ff9800", bg: "#2a1c0a", label: "HIGH", dot: "#ff9800" },
  medium: { color: "#f0b90b", bg: "#2a2210", label: "MEDIUM", dot: "#f0b90b" },
  low: { color: "#4caf50", bg: "#0f2a15", label: "LOW", dot: "#4caf50" },
};

const TYPE_ICONS: Record<ConflictEvent["type"], string> = {
  airstrike: "✈",
  naval: "⚓",
  ground: "⚔",
  cyber: "⚡",
  diplomatic: "🤝",
};

const ConflictEventRow: React.FC<{ event: ConflictEvent }> = ({ event }) => {
  const cfg = SEVERITY_CONFIG[event.severity];
  return (
    <div
      style={{
        padding: "8px 10px",
        borderBottom: "1px solid #1a1a1a",
        borderLeft: `2px solid ${cfg.color}`,
        background: cfg.bg,
        marginBottom: 3,
        borderRadius: "0 3px 3px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11 }}>{TYPE_ICONS[event.type]}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: cfg.color,
              letterSpacing: "0.08em",
            }}
          >
            {cfg.label}
          </span>
          <span style={{ fontSize: 10, color: "#777", fontWeight: 600 }}>
            {event.region}
          </span>
        </div>
        <span style={{ fontSize: 9, color: "#555" }}>{event.time}</span>
      </div>
      <p style={{ margin: 0, fontSize: 11, color: "#bbb", lineHeight: 1.5 }}>
        {event.description}
      </p>
      {event.coordinates && (
        <div
          style={{
            fontSize: 9,
            color: "#555",
            marginTop: 3,
            fontFamily: "monospace",
          }}
        >
          {event.coordinates}
        </div>
      )}
    </div>
  );
};

const ConflictMonitorWidget: React.FC = () => {
  const [activeCount] = useState(5);
  const criticalCount = CONFLICT_EVENTS.filter(
    (e) => e.severity === "critical",
  ).length;

  return (
    <WidgetCard
      widgetId="conflict"
      title="Conflict Monitor"
      timestamp="3m ago"
      actions={
        criticalCount > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              background: "#2a1010",
              border: "1px solid #ff3d3d44",
              borderRadius: 2,
              padding: "2px 6px",
              marginRight: 4,
            }}
          >
            <AlertOutlined style={{ fontSize: 9, color: "#ff3d3d" }} />
            <span style={{ fontSize: 9, color: "#ff3d3d", fontWeight: 700 }}>
              {criticalCount} CRITICAL
            </span>
          </div>
        ) : null
      }
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 8,
          paddingBottom: 8,
          borderBottom: "1px solid #1e1e1e",
          flexShrink: 0,
        }}
      >
        {Object.entries(SEVERITY_CONFIG).map(([sev, cfg]) => {
          const count = CONFLICT_EVENTS.filter(
            (e) => e.severity === sev,
          ).length;
          return (
            <div
              key={sev}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 6px",
                background: cfg.bg,
                borderRadius: 2,
                border: `1px solid ${cfg.color}33`,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: cfg.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 9, color: cfg.color, fontWeight: 600 }}>
                {count} {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        {CONFLICT_EVENTS.map((event) => (
          <ConflictEventRow key={event.id} event={event} />
        ))}
      </div>

      <div
        style={{
          paddingTop: 8,
          borderTop: "1px solid #1e1e1e",
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 9, color: "#555" }}>
          {activeCount} active incidents tracked
        </span>
        <span style={{ fontSize: 9, color: "#f0b90b", fontWeight: 600 }}>
          LIVE ●
        </span>
      </div>
    </WidgetCard>
  );
};

export default ConflictMonitorWidget;
