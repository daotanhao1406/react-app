import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { NewsItem, NewsTab } from "../../types/dashboard";
import { NEWS_ITEMS } from "../../data/mockData";
import WidgetCard from "./WidgetCard";

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
    <WidgetCard widgetId="news" title="News Feed" timestamp="24m ago">
      {/* Tabs row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #222",
          paddingBottom: 8,
          marginBottom: 8,
          flexShrink: 0,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 2 }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? "#f0b90b" : "transparent",
                color: activeTab === tab ? "#000" : "#666",
                border: "none",
                borderRadius: 3,
                padding: "3px 8px",
                fontSize: 10,
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 3,
            padding: "3px 8px",
            gap: 6,
          }}
        >
          <SearchOutlined style={{ fontSize: 10, color: "#555" }} />
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "#ccc",
              fontSize: 11,
              width: 90,
            }}
          />
        </div>
      </div>

      {/* News list */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {activeTab === "News" ? (
          filtered.length > 0 ? (
            filtered.map((item) => <NewsItemRow key={item.id} item={item} />)
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "30px 0",
                color: "#444",
                fontSize: 12,
              }}
            >
              No results for "{search}"
            </div>
          )
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
              color: "#333",
              fontSize: 12,
            }}
          >
            {activeTab} content loading...
          </div>
        )}
      </div>

      {/* Add button */}
      <button
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#f0b90b",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#000",
          fontWeight: 700,
          boxShadow: "0 2px 8px rgba(240,185,11,0.4)",
          zIndex: 10,
        }}
        title="Add feed"
      >
        +
      </button>
    </WidgetCard>
  );
};

export default NewsFeedWidget;
