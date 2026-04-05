import React, { useState } from "react";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { DAILY_BRIEFING } from "../../data/mockData";
import WidgetCard from "./WidgetCard";

const DailyBriefingWidget: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const briefing = DAILY_BRIEFING;

  return (
    <WidgetCard
      widgetId="daily-briefing"
      title="Daily Briefing"
      actions={
        <div className="flex items-center gap-1">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LeftOutlined style={{ fontSize: 10 }} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RightOutlined style={{ fontSize: 10 }} />
          </button>
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 0",
            borderBottom: "1px solid #222",
          }}
        >
          <CalendarOutlined style={{ color: "#f0b90b", fontSize: 11 }} />
          <span
            style={{
              fontSize: 11,
              color: "#aaa",
              fontWeight: 500,
            }}
          >
            {briefing.date}
          </span>
        </div>

        {/* Summary label */}
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#f0b90b",
            textTransform: "uppercase",
          }}
        >
          Summary
        </div>

        {/* Content */}
        <div
          style={{
            fontSize: 12,
            color: "#ccc",
            lineHeight: 1.7,
            overflow: "auto",
            flex: 1,
          }}
        >
          <p style={{ margin: 0 }}>
            {expanded
              ? briefing.summary
              : briefing.summary.length > 420
                ? briefing.summary.slice(0, 420) + "..."
                : briefing.summary}
          </p>
          {briefing.summary.length > 420 && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                border: "none",
                color: "#f0b90b",
                cursor: "pointer",
                fontSize: 11,
                padding: "4px 0",
              }}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTop: "1px solid #1e1e1e",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 9, color: "#444" }}>
            ⚡ Generated {briefing.generatedAt}
          </span>
          <span
            style={{
              fontSize: 9,
              color: "#f0b90b",
              fontWeight: 600,
            }}
          >
            {briefing.sources} sources
          </span>
        </div>
      </div>
    </WidgetCard>
  );
};

export default DailyBriefingWidget;
