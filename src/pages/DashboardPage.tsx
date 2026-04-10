import React, { useState, useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout/legacy";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DailyBriefingWidget from "../components/widgets/DailyBriefingWidget";
import MarketsWidget from "../components/widgets/MarketsWidget";
import ConflictMonitorWidget from "../components/widgets/ConflictMonitorWidget";
import NewsFeedWidget from "../components/widgets/NewsFeedWidget";
import MarketMapWidget from "../components/widgets/MarketMapWidget";
import WidgetManagerDropdown from "../components/WidgetManagerDropdown";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_LAYOUTS: Partial<Record<string, Layout>> = {
  lg: [
    { i: "daily-briefing", x: 0, y: 0, w: 5, h: 10, minW: 3, minH: 5 },
    { i: "markets", x: 0, y: 10, w: 5, h: 9, minW: 3, minH: 5 },
    { i: "conflict", x: 5, y: 0, w: 7, h: 10, minW: 3, minH: 5 },
    { i: "market-map", x: 5, y: 10, w: 7, h: 9, minW: 3, minH: 5 },
    { i: "news", x: 12, y: 0, w: 8, h: 19, minW: 4, minH: 6 },
  ],
  md: [
    { i: "daily-briefing", x: 0, y: 0, w: 6, h: 10, minW: 3, minH: 5 },
    { i: "markets", x: 0, y: 10, w: 6, h: 9, minW: 3, minH: 5 },
    { i: "conflict", x: 6, y: 0, w: 6, h: 10, minW: 3, minH: 5 },
    { i: "market-map", x: 6, y: 10, w: 6, h: 9, minW: 3, minH: 5 },
    { i: "news", x: 0, y: 19, w: 12, h: 10, minW: 4, minH: 6 },
  ],
};

const WIDGET_COMPONENTS: Record<string, React.ReactNode> = {
  "daily-briefing": <DailyBriefingWidget />,
  markets: <MarketsWidget />,
  conflict: <ConflictMonitorWidget />,
  news: <NewsFeedWidget />,
  "market-map": <MarketMapWidget />,
};

const WIDGET_KEYS = Object.keys(WIDGET_COMPONENTS);

const DashboardPage: React.FC = () => {
  const [layouts, setLayouts] =
    useState<Partial<Record<string, Layout>>>(DEFAULT_LAYOUTS);

  const onLayoutChange = useCallback(
    (_: Layout, allLayouts: Partial<Record<string, Layout>>) => {
      setLayouts(allLayouts);
    },
    [],
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        padding: "6px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <WidgetManagerDropdown />
      {/* Top bar */}
      <div
        style={{
          height: 36,
          background: "#111",
          border: "1px solid #1e1e1e",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 12,
          justifyContent: "space-between",
          marginBottom: 6,
          borderRadius: 4,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              background: "#f0b90b",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 900,
              color: "#000",
              flexShrink: 0,
            }}
          >
            Ω
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#666",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Intelligence Dashboard
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, color: "#444" }}>
            {new Date().toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}
          </span>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00c853",
              boxShadow: "0 0 6px #00c853",
            }}
          />
          <span style={{ fontSize: 9, color: "#00c853", fontWeight: 600 }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Responsive Grid */}
      <div style={{ flex: 1 }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 768, sm: 0 }}
          cols={{ lg: 20, md: 12, sm: 6 }}
          rowHeight={32}
          onLayoutChange={onLayoutChange}
          draggableHandle=".widget-drag-handle"
          isDraggable
          isResizable
          margin={[6, 6]}
          containerPadding={[0, 0]}
          resizeHandles={["se"]}
          useCSSTransforms
        >
          {WIDGET_KEYS.map((key) => (
            <div
              key={key}
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {WIDGET_COMPONENTS[key]}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DashboardPage;
