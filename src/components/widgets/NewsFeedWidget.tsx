import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { NewsItem, NewsTab } from "../../types/dashboard";
import { NEWS_ITEMS } from "../../data/mockData";
import WidgetCard from "./WidgetCard";
import { Button, Card } from "antd";

const TABS: NewsTab[] = ["News", "State", "Wikipedia", "Files", "Music"];

const CATEGORY_BADGE: Record<
  NewsItem["category"],
  { bg: string; color: string }
> = {
  World: { bg: "#1a3a2a", color: "#4caf50" },
  Energy: { bg: "#2a1a0a", color: "#ff9800" },
  Politics: { bg: "#1a1a3a", color: "#7986cb" },
  Markets: { bg: "#1a2a1a", color: "#00c853" },
  Breaking: { bg: "#3a1a1a", color: "#ff3d3d" },
};

const NewsItemRow: React.FC<{ item: NewsItem }> = ({ item }) => {
  const badge = CATEGORY_BADGE[item.category];

  return (
    <div
      style={{
        padding: "9px 0",
        borderBottom: "1px solid #1a1a1a",
        cursor: "pointer",
      }}
      className="news-item"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#d4d4d4",
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {item.headline}
        </p>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}
      >
        <span style={{ fontSize: 9, color: "#555", fontWeight: 600 }}>
          {item.source}
        </span>
        <span style={{ fontSize: 9, color: "#3a3a3a" }}>·</span>
        <span style={{ fontSize: 9, color: "#555" }}>{item.time}</span>
        <span style={{ fontSize: 9, color: "#3a3a3a" }}>·</span>
        <span
          style={{
            display: "inline-block",
            padding: "1px 5px",
            borderRadius: 2,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: badge.bg,
            color: badge.color,
          }}
        >
          {item.category}
        </span>
      </div>
    </div>
  );
};

const NewsFeedWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NewsTab>("News");
  const [search, setSearch] = useState("");

  const filtered = NEWS_ITEMS.filter(
    (item) =>
      search === "" ||
      item.headline.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Card className="widget-drag-handle group">
      <Button
        className="opacity-0 group-hover:opacity-100"
        onClick={(e) => console.log("click")}
      >
        abc
      </Button>
    </Card>
  );
};

export default NewsFeedWidget;
