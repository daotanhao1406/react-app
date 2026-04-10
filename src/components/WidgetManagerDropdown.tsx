import { useState, useRef } from "react";
import {
  ConfigProvider,
  Button,
  Dropdown,
  Input,
  Tabs,
  Tag,
  theme,
} from "antd";
import {
  SearchOutlined,
  CheckSquareOutlined,
  BorderOutlined,
  StarOutlined,
  CloseOutlined,
  PlusOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  RocketOutlined,
  AlertOutlined,
  HeartOutlined,
  ScissorOutlined,
  BankOutlined,
  LineChartOutlined,
  GlobalOutlined,
  EyeOutlined,
  RadarChartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  active: boolean;
  updateInterval: string;
  feeds: number;
  starred: boolean;
}

const WIDGETS: Widget[] = [
  {
    id: "world-map",
    name: "World Map",
    description: "Interactive map with 24 overlay layers across...",
    category: "Core",
    icon: <GlobalOutlined />,
    active: true,
    updateInterval: "5min",
    feeds: 14,
    starred: false,
  },
  {
    id: "country-map",
    name: "Country Map",
    description: "Focused map view of a single country with all...",
    category: "Core",
    icon: <EnvironmentOutlined />,
    active: false,
    updateInterval: "5min",
    feeds: 14,
    starred: false,
  },
  {
    id: "market-overview",
    name: "Market Overview",
    description: "Live indices, commodities, crypto, and currencies",
    category: "Markets & Finance",
    icon: <LineChartOutlined />,
    active: true,
    updateInterval: "3min",
    feeds: 0,
    starred: false,
  },
  {
    id: "market-analytics",
    name: "Market Analytics",
    description: "Market breadth indicators, earnings calendar, circu...",
    category: "Markets & Finance",
    icon: <RadarChartOutlined />,
    active: false,
    updateInterval: "5min",
    feeds: 8,
    starred: false,
  },
  {
    id: "federal-finance",
    name: "Federal Finance",
    description: "Federal contract awards from USASpending.gov...",
    category: "Markets & Finance",
    icon: <BankOutlined />,
    active: false,
    updateInterval: "6hr",
    feeds: 2,
    starred: false,
  },
  {
    id: "global-central-banks",
    name: "Global Central Banks",
    description: "ECB, BOJ, and PBOC balance sheets — assets...",
    category: "Markets & Finance",
    icon: <DatabaseOutlined />,
    active: false,
    updateInterval: "6hr",
    feeds: 3,
    starred: false,
  },
  {
    id: "prediction-markets",
    name: "Prediction Markets",
    description: "Real-time odds from Polymarket and Kalshi...",
    category: "Markets & Finance",
    icon: <EyeOutlined />,
    active: false,
    updateInterval: "5min",
    feeds: 2,
    starred: false,
  },
  {
    id: "national-debt-clock",
    name: "National Debt Clock",
    description: "Real-time interpolated national debt for 200+...",
    category: "Markets & Finance",
    icon: <AlertOutlined />,
    active: false,
    updateInterval: "1d",
    feeds: 0,
    starred: false,
  },
  {
    id: "breaking-news",
    name: "Breaking News",
    description: "Real-time news from BBC, CNBC, Al Jazeera, state...",
    category: "Geopolitical",
    icon: <RocketOutlined />,
    active: true,
    updateInterval: "5min",
    feeds: 5,
    starred: false,
  },
  {
    id: "political-intelligence",
    name: "Political Intelligence",
    description: "UN Security Council sessions, global election...",
    category: "Geopolitical",
    icon: <AppstoreOutlined />,
    active: false,
    updateInterval: "30min",
    feeds: 5,
    starred: false,
  },
  {
    id: "press-freedom",
    name: "Press Freedom",
    description: "RSF World Press Freedom Index rankings and CPU...",
    category: "Geopolitical",
    icon: <ScissorOutlined />,
    active: false,
    updateInterval: "4hr",
    feeds: 2,
    starred: false,
  },
  {
    id: "legal-regulatory",
    name: "Legal & Regulatory",
    description: "Regulatory filings, court decisions, and legal...",
    category: "Geopolitical",
    icon: <BankOutlined />,
    active: false,
    updateInterval: "1hr",
    feeds: 4,
    starred: false,
  },
  {
    id: "sanctions-trade",
    name: "Sanctions & Trade",
    description: "OFAC, EU, UN sanctions lists and trade restrictions...",
    category: "Geopolitical",
    icon: <AlertOutlined />,
    active: false,
    updateInterval: "6hr",
    feeds: 3,
    starred: false,
  },
  {
    id: "global-news-browser",
    name: "Global News Browser",
    description: "Browse news sources from 190+ countries...",
    category: "Geopolitical",
    icon: <GlobalOutlined />,
    active: false,
    updateInterval: "15min",
    feeds: 12,
    starred: false,
  },
  {
    id: "nuclear-tracker",
    name: "Nuclear Tracker",
    description: "Global nuclear arsenal status and test history...",
    category: "Military & Defense",
    icon: <AlertOutlined />,
    active: false,
    updateInterval: "1d",
    feeds: 2,
    starred: false,
  },
  {
    id: "conflict-zones",
    name: "Conflict Zones",
    description: "Active conflict tracking from ACLED and UCDP...",
    category: "Military & Defense",
    icon: <RadarChartOutlined />,
    active: false,
    updateInterval: "1hr",
    feeds: 5,
    starred: false,
  },
  {
    id: "cbrn-alert",
    name: "CBRN Alert",
    description: "Chemical, biological, radiological, and nuclear...",
    category: "CBRN & WMD",
    icon: <AlertOutlined />,
    active: false,
    updateInterval: "2hr",
    feeds: 3,
    starred: false,
  },
  {
    id: "humanitarian-aid",
    name: "Humanitarian Aid",
    description: "OCHA, UNHCR, WFP humanitarian operations...",
    category: "Humanitarian",
    icon: <HeartOutlined />,
    active: false,
    updateInterval: "6hr",
    feeds: 4,
    starred: false,
  },
];

const CATEGORIES = [
  "All",
  "Core",
  "Markets & Finance",
  "Geopolitical",
  "Military & Defense",
  "CBRN & WMD",
  "Humanitarian",
];

function getCategoryCount(category: string, widgets: Widget[]): number {
  if (category === "All") return widgets.length;
  return widgets.filter((w) => w.category === category).length;
}

function WidgetCard({
  widget,
  onToggle,
  onStar,
  onRemove,
}: {
  widget: Widget;
  onToggle: (id: string) => void;
  onStar: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const isActive = widget.active;

  return (
    <div
      style={{
        background: isActive ? "#1a1a00" : "#1c1c1c",
        border: isActive ? "1px solid #3a3a00" : "1px solid #2a2a2a",
        borderRadius: 6,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "#2a2000",
            border: "1px solid #4a3800",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5a623",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {widget.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 2,
            }}
          >
            <span
              style={{
                color: "#e0e0e0",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {widget.name}
            </span>
            {isActive && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  background: "#1a3300",
                  border: "1px solid #2a5500",
                  borderRadius: 3,
                  padding: "1px 5px",
                  fontSize: 10,
                  color: "#5a9e3a",
                }}
              >
                <CheckOutlined style={{ fontSize: 9 }} />
                active
              </span>
            )}
          </div>
          <p
            style={{
              color: "#888",
              fontSize: 11,
              margin: 0,
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {widget.description}
          </p>
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {isActive ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(widget.id);
              }}
              type="text"
              size="small"
              icon={<CloseOutlined />}
            />
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(widget.id);
              }}
              type="primary"
              size="small"
              icon={<PlusOutlined />}
            />
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Tag color="default">{widget.category}</Tag>
      </div>
    </div>
  );
}

function WidgetManagerContent() {
  const [widgets, setWidgets] = useState<Widget[]>(WIDGETS);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const activeCount = widgets.filter((w) => w.active).length;
  const totalCount = widgets.length;

  const filteredWidgets = widgets.filter((w) => {
    const matchesSearch =
      !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || w.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedWidgets: Record<string, Widget[]> = {};
  filteredWidgets.forEach((w) => {
    if (!groupedWidgets[w.category]) groupedWidgets[w.category] = [];
    groupedWidgets[w.category].push(w);
  });

  const handleToggle = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w)),
    );
  };

  const handleStar = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, starred: !w.starred } : w)),
    );
  };

  const handleRemove = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: false } : w)),
    );
  };

  const handleSelectAll = () => {
    setWidgets((prev) => prev.map((w) => ({ ...w, active: true })));
  };

  const handleClearAll = () => {
    setWidgets((prev) => prev.map((w) => ({ ...w, active: false })));
  };

  const tabItems = CATEGORIES.map((cat) => ({
    key: cat,
    label: (
      <span style={{ fontSize: 12 }}>
        {cat === "All" ? "All" : cat}{" "}
        <span style={{ opacity: 0.6 }}>({getCategoryCount(cat, widgets)})</span>
      </span>
    ),
  }));

  return (
    <div
      style={{
        width: 1000,
        background: "#141414",
        border: "1px solid #2a2a2a",
        borderRadius: 8,
        overflow: "hidden",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid #222",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#c0c0c0",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Widget Manager
          </div>
          <div style={{ color: "#666", fontSize: 11, marginTop: 1 }}>
            {activeCount} of {totalCount} widgets active
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            onClick={handleSelectAll}
            icon={<CheckSquareOutlined />}
          >
            Select All
          </Button>
          <Button
            size="small"
            onClick={handleClearAll}
            icon={<BorderOutlined />}
          >
            Clear All
          </Button>
        </div>
      </div>

      <div style={{ padding: "12px 18px" }}>
        <Input
          placeholder="Search widgets..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ borderBottom: "1px solid #222" }}>
        <Tabs
          activeKey={activeCategory}
          onChange={setActiveCategory}
          items={tabItems}
          style={{ paddingLeft: 14, paddingRight: 14 }}
          tabBarStyle={{ marginBottom: 0 }}
        />
      </div>

      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: 460,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {Object.entries(groupedWidgets).map(([category, catWidgets]) => (
          <div key={category}>
            <div
              style={{
                color: "#666",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {category} ({catWidgets.length})
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {catWidgets.map((widget) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                  onToggle={handleToggle}
                  onStar={handleStar}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid #222",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "flex-end",
        }}
      >
        <Button size="small" type="primary" icon={<CheckOutlined />}>
          Done
        </Button>
      </div>
    </div>
  );
}

export default function WidgetManagerDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const items: MenuProps["items"] = [
    {
      key: "widget-manager",
      label: <WidgetManagerContent />,
      style: { padding: 0, background: "transparent" },
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingTop: 60,
        paddingRight: 80,
      }}
    >
      <div ref={dropdownRef}>
        <Dropdown
          menu={{ items }}
          open={open}
          onOpenChange={setOpen}
          trigger={["click"]}
          placement="bottomRight"
          popupRender={() => (
            <div
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                borderRadius: 8,
              }}
            >
              <WidgetManagerContent />
            </div>
          )}
        >
          <Button icon={<PlusOutlined />}>Add Widget</Button>
        </Dropdown>
      </div>
    </div>
  );
}
