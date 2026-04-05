import React from "react";
import WidgetCard from "./WidgetCard";

interface HeatCell {
  symbol: string;
  name: string;
  change: number;
  size: number;
}

const HEAT_DATA: HeatCell[] = [
  { symbol: "NVDA", name: "NVIDIA", change: 4.21, size: 4 },
  { symbol: "AAPL", name: "Apple", change: 1.87, size: 4 },
  { symbol: "MSFT", name: "Microsoft", change: 0.95, size: 3 },
  { symbol: "AMZN", name: "Amazon", change: 2.34, size: 3 },
  { symbol: "GOOG", name: "Alphabet", change: 1.12, size: 3 },
  { symbol: "META", name: "Meta", change: 3.56, size: 2 },
  { symbol: "TSLA", name: "Tesla", change: -2.44, size: 2 },
  { symbol: "BRK", name: "Berkshire", change: -0.31, size: 2 },
  { symbol: "JPM", name: "JPMorgan", change: 0.77, size: 2 },
  { symbol: "XOM", name: "Exxon", change: -1.22, size: 2 },
  { symbol: "JNJ", name: "J&J", change: -0.45, size: 2 },
  { symbol: "V", name: "Visa", change: 0.88, size: 1 },
  { symbol: "WMT", name: "Walmart", change: 0.31, size: 1 },
  { symbol: "PG", name: "P&G", change: -0.12, size: 1 },
  { symbol: "HD", name: "Home Depot", change: 1.05, size: 1 },
];

const getColor = (change: number): string => {
  if (change > 3) return "#00b341";
  if (change > 1.5) return "#009e3a";
  if (change > 0) return "#1a6b2f";
  if (change > -1.5) return "#6b1a1a";
  if (change > -3) return "#a01c1c";
  return "#c81e1e";
};

const HeatCell: React.FC<{ cell: HeatCell }> = ({ cell }) => {
  const bg = getColor(cell.change);
  const isPos = cell.change >= 0;
  const isLarge = cell.size >= 3;

  return (
    <div
      title={`${cell.name}: ${cell.change > 0 ? "+" : ""}${cell.change.toFixed(2)}%`}
      style={{
        background: bg,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        cursor: "pointer",
        border: "1px solid rgba(0,0,0,0.2)",
        gridColumn: `span ${cell.size}`,
        gridRow: `span ${Math.max(1, Math.floor(cell.size * 0.7))}`,
        minHeight: cell.size >= 3 ? 50 : 34,
        transition: "filter 0.15s",
      }}
    >
      <span
        style={{
          fontSize: isLarge ? 12 : 10,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {cell.symbol}
      </span>
      {isLarge && (
        <span
          style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 1 }}
        >
          {cell.name}
        </span>
      )}
      <span
        style={{
          fontSize: isLarge ? 11 : 9,
          color: isPos ? "#a5f3c0" : "#fca5a5",
          fontWeight: 600,
          marginTop: 1,
        }}
      >
        {isPos ? "+" : ""}
        {cell.change.toFixed(2)}%
      </span>
    </div>
  );
};

const MarketMapWidget: React.FC = () => {
  return (
    <WidgetCard widgetId="market-map" title="Market Map" timestamp="5m ago">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridAutoRows: "minmax(34px, auto)",
          gap: 2,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {HEAT_DATA.map((cell) => (
          <HeatCell key={cell.symbol} cell={cell} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          paddingTop: 6,
          flexShrink: 0,
        }}
      >
        {[
          { label: "> +3%", color: "#00b341" },
          { label: "0-3%", color: "#1a6b2f" },
          { label: "0 to -3%", color: "#6b1a1a" },
          { label: "< -3%", color: "#c81e1e" },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "center", gap: 3 }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 1,
                background: item.color,
              }}
            />
            <span style={{ fontSize: 9, color: "#555" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};

export default MarketMapWidget;
