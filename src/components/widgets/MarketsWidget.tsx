import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import WidgetCard from "./WidgetCard";
import { MARKET_INDICES } from "../../data/mockData";
import { MarketIndex } from "../../types/dashboard";
import { Typography } from "antd";

const MarketRow: React.FC<{ index: MarketIndex }> = ({ index }) => {
  const isPositive = index.changePercent >= 0;
  const color = isPositive ? "#00c853" : "#ff3d3d";
  const prefix = isPositive ? "+" : "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 0",
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography.Text strong style={{ letterSpacing: 0.4 }}>
          {index.ticker}
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 9 }}>
          {index.name}
        </Typography.Text>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#e0e0e0",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {index.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          minWidth: 70,
          justifyContent: "flex-end",
        }}
      >
        {isPositive ? (
          <ArrowUpOutlined style={{ fontSize: 9, color }} />
        ) : (
          <ArrowDownOutlined style={{ fontSize: 9, color }} />
        )}
        <span
          style={{
            fontSize: 11,
            color,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {prefix}
          {index.changePercent.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

const MarketsWidget: React.FC = () => {
  return (
    <WidgetCard widgetId="markets" title="Markets" timestamp="2m ago">
      <div
        style={{
          marginBottom: 8,
          paddingBottom: 6,
          borderBottom: "1px solid #222",
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Indices
        </span>
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        {MARKET_INDICES.map((index) => (
          <MarketRow key={index.id} index={index} />
        ))}
      </div>
    </WidgetCard>
  );
};

export default MarketsWidget;
