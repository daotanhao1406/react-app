import { useState } from "react";
import { Button, Input, Popover, ConfigProvider, theme } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  DownOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  StockOutlined,
  AimOutlined,
  CloudOutlined,
  ThunderboltOutlined,
  BuildOutlined,
  RocketOutlined,
  ToolOutlined,
  BankOutlined,
  EyeOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

type LayerItem = {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  activeColor: string;
  activeBorder: string;
};

const LAYERS: LayerItem[] = [
  {
    id: "geopolitical",
    name: "Geopolitical",
    icon: <GlobalOutlined />,
    color: "#60a5fa",
    activeColor: "rgba(37,99,235,0.25)",
    activeBorder: "#3b82f6",
  },
  {
    id: "markets",
    name: "Markets & Finance",
    icon: <StockOutlined />,
    color: "#34d399",
    activeColor: "rgba(5,150,105,0.25)",
    activeBorder: "#10b981",
  },
  {
    id: "military",
    name: "Military & Defense",
    icon: <AimOutlined />,
    color: "#f87171",
    activeColor: "rgba(185,28,28,0.25)",
    activeBorder: "#ef4444",
  },
  {
    id: "environment",
    name: "Environment",
    icon: <CloudOutlined />,
    color: "#86efac",
    activeColor: "rgba(21,128,61,0.25)",
    activeBorder: "#22c55e",
  },
  {
    id: "weather",
    name: "Weather",
    icon: <ThunderboltOutlined />,
    color: "#fbbf24",
    activeColor: "rgba(180,83,9,0.25)",
    activeBorder: "#f59e0b",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: <BuildOutlined />,
    color: "#fb923c",
    activeColor: "rgba(194,65,12,0.25)",
    activeBorder: "#f97316",
  },
  {
    id: "space",
    name: "Space & Aerospace",
    icon: <RocketOutlined />,
    color: "#c084fc",
    activeColor: "rgba(126,34,206,0.25)",
    activeBorder: "#a855f7",
  },
  {
    id: "utility",
    name: "Utility",
    icon: <ToolOutlined />,
    color: "#94a3b8",
    activeColor: "rgba(71,85,105,0.25)",
    activeBorder: "#64748b",
  },
  {
    id: "elections",
    name: "Elections & Governance",
    icon: <BankOutlined />,
    color: "#fdba74",
    activeColor: "rgba(194,65,12,0.2)",
    activeBorder: "#fb923c",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    icon: <EyeOutlined />,
    color: "#f472b6",
    activeColor: "rgba(157,23,77,0.25)",
    activeBorder: "#ec4899",
  },
  {
    id: "social",
    name: "Social Media",
    icon: <WifiOutlined />,
    color: "#38bdf8",
    activeColor: "rgba(3,105,161,0.25)",
    activeBorder: "#0ea5e9",
  },
];

const COLS = 4;

export function LayersDropdown() {
  const [open, setOpen] = useState(false);
  const [activeItems, setActiveItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const toggle = (id: string) => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = search
    ? LAYERS.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
    : LAYERS;

  const selectAll = () => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      filtered.forEach((l) => next.add(l.id));
      return next;
    });
  };

  const clearAll = () => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      filtered.forEach((l) => next.delete(l.id));
      return next;
    });
  };

  const totalActive = activeItems.size;

  const padded: (LayerItem | null)[] = [...filtered];
  while (padded.length % COLS !== 0) padded.push(null);

  const panelContent = (
    <div
      style={{
        width: 600,
        background: "#1a1a1a",
        borderRadius: 6,
        color: "#e0e0e0",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#e0e0e0",
              textTransform: "uppercase",
            }}
          >
            Map Layers
          </div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
            {totalActive} of {LAYERS.length} layers active
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={selectAll}
            style={{
              background: "transparent",
              border: "1px solid #444",
              color: "#e0e0e0",
              borderRadius: 4,
              padding: "4px 12px",
              fontSize: 11,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            <CheckOutlined style={{ fontSize: 10 }} /> Select All
          </button>
          <button
            onClick={clearAll}
            style={{
              background: "transparent",
              border: "1px solid #444",
              color: "#e0e0e0",
              borderRadius: 4,
              padding: "4px 12px",
              fontSize: 11,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            <CloseOutlined style={{ fontSize: 10 }} /> Clear All
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid #2a2a2a" }}>
        <Input
          prefix={<SearchOutlined style={{ color: "#666", fontSize: 13 }} />}
          placeholder="Search layers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "#111",
            border: "1px solid #333",
            color: "#e0e0e0",
            borderRadius: 4,
            fontSize: 12,
          }}
          styles={{
            input: {
              background: "transparent",
              color: "#e0e0e0",
              fontSize: 12,
              fontFamily: "inherit",
            },
          }}
        />
      </div>

      {/* Grid */}
      <div style={{ padding: "16px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: 5,
          }}
        >
          {padded.map((item, idx) => {
            if (!item) return <div key={`empty-${idx}`} />;
            const isActive = activeItems.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  background: isActive ? item.activeColor : "transparent",
                  border: isActive
                    ? `1px solid ${item.activeBorder}`
                    : "1px solid #2a2a2a",
                  borderRadius: 4,
                  color: isActive ? "#fff" : "#aaa",
                  padding: "8px 10px",
                  fontSize: 11,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#242424";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#3a3a3a";
                    (e.currentTarget as HTMLButtonElement).style.color = "#ddd";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#2a2a2a";
                    (e.currentTarget as HTMLButtonElement).style.color = "#aaa";
                  }
                }}
              >
                {/* Icon */}
                <span
                  style={{
                    color: isActive ? item.color : item.color,
                    fontSize: 13,
                    flexShrink: 0,
                    opacity: isActive ? 1 : 0.7,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {item.name}
                </span>

                {/* Status dot */}
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: isActive ? item.color : "#383838",
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 6px ${item.color}` : "none",
                    transition: "all 0.15s",
                  }}
                />
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#555",
              padding: "24px 0",
              fontSize: 12,
            }}
          >
            No layers match your search.
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 20px",
          borderTop: "1px solid #2a2a2a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 11, color: "#666" }}>
          {totalActive} layers active
        </span>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "#e07b39",
            border: "none",
            borderRadius: 4,
            color: "#fff",
            padding: "6px 20px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "inherit",
          }}
        >
          <CheckOutlined style={{ fontSize: 11 }} /> Done
        </button>
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#e07b39",
          colorBgContainer: "#1f1f1f",
          colorBorder: "#333",
          colorText: "#e0e0e0",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          borderRadius: 4,
        },
        components: {
          Input: {
            colorBgContainer: "#111",
            colorBorder: "#333",
            colorTextPlaceholder: "#555",
            activeBorderColor: "#555",
            hoverBorderColor: "#555",
          },
          Popover: {
            colorBgElevated: "#1a1a1a",
            colorBorder: "#333",
          },
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: "#0d0d0d",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "20px",
        }}
      >
        <Popover
          open={open}
          onOpenChange={setOpen}
          content={panelContent}
          trigger="click"
          placement="bottomLeft"
          arrow={false}
          overlayInnerStyle={{
            padding: 0,
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 6,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
          overlayStyle={{ zIndex: 1000 }}
        >
          <Button
            style={{
              background: open ? "#2a2a2a" : "#1f1f1f",
              border: "1px solid #444",
              color: "#e0e0e0",
              fontSize: 12,
              height: 32,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              letterSpacing: "0.02em",
            }}
            icon={<AppstoreOutlined style={{ fontSize: 13 }} />}
          >
            Layers {totalActive > 0 ? totalActive : ""}
            <DownOutlined style={{ fontSize: 9, marginLeft: 2 }} />
          </Button>
        </Popover>
      </div>
    </ConfigProvider>
  );
}
