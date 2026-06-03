import { useState, useMemo } from "react";
import { MapLayer, LayerCategory, layerCategories } from "../data/layerData";

interface LayerPanelProps {
  layers: MapLayer[];
  onToggleLayer: (id: string) => void;
  onToggleAll: (category: LayerCategory, enabled: boolean) => void;
}

const TAB_ALL = "all";

export function LayerPanel({
  layers,
  onToggleLayer,
  onToggleAll,
}: LayerPanelProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>(TAB_ALL);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const activeCount = layers.filter((l) => l.enabled).length;

  const filteredLayers = useMemo(() => {
    const q = search.toLowerCase();
    return layers.filter(
      (l) =>
        (activeTab === TAB_ALL || l.category === activeTab) &&
        (!q || l.name.toLowerCase().includes(q)),
    );
  }, [layers, search, activeTab]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, MapLayer[]> = {};
    for (const layer of filteredLayers) {
      if (!groups[layer.category]) groups[layer.category] = [];
      groups[layer.category].push(layer);
    }
    return groups;
  }, [filteredLayers]);

  const tabs = [
    { id: TAB_ALL, label: `All (${layers.length})` },
    ...layerCategories.map((c) => ({
      id: c.id,
      label: `${c.label.split(" ")[0]} (${layers.filter((l) => l.category === c.id).length})`,
    })),
  ];

  return (
    <div className="layer-panel">
      <div className="panel-header">
        <span className="panel-title">MAP LAYERS</span>
        <span className="panel-count">
          {activeCount} of {layers.length} layers active
        </span>
      </div>

      <div className="panel-actions">
        <button
          className="action-btn"
          onClick={() =>
            layers.forEach((l) => !l.enabled && onToggleLayer(l.id))
          }
        >
          ✓ Select All
        </button>
        <button
          className="action-btn"
          onClick={() =>
            layers.forEach((l) => l.enabled && onToggleLayer(l.id))
          }
        >
          ✕ Clear All
        </button>
      </div>

      <div className="search-row">
        <input
          type="search"
          className="layer-search"
          placeholder="🔍 Search layers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="tab-row">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="layer-list">
        {Object.entries(groupedByCategory).map(([catId, catLayers]) => {
          const cat = layerCategories.find((c) => c.id === catId)!;
          const allOn = catLayers.every((l) => l.enabled);
          const isCollapsed = collapsed[catId];

          return (
            <div key={catId} className="category-group">
              <div className="category-header">
                <button
                  className="category-toggle"
                  onClick={() =>
                    setCollapsed((prev) => ({ ...prev, [catId]: !prev[catId] }))
                  }
                >
                  <span className="cat-chevron">{isCollapsed ? "▶" : "▼"}</span>
                  <span className="cat-dot" style={{ background: cat.color }} />
                  <span className="cat-label" style={{ color: cat.color }}>
                    {cat.label.toUpperCase()} ({catLayers.length})
                  </span>
                </button>
                <button
                  className="cat-all-btn"
                  onClick={() => onToggleAll(cat.id as LayerCategory, !allOn)}
                >
                  {allOn ? "Hide all" : "Show all"}
                </button>
              </div>

              {!isCollapsed && (
                <div className="layer-grid">
                  {catLayers.map((layer) => (
                    <button
                      key={layer.id}
                      className={`layer-item ${layer.enabled ? "enabled" : ""}`}
                      onClick={() => onToggleLayer(layer.id)}
                      style={
                        layer.enabled
                          ? {
                              borderColor: layer.color + "88",
                              background: layer.color + "18",
                            }
                          : {}
                      }
                    >
                      <span className="layer-icon">{layer.icon}</span>
                      <span className="layer-name">{layer.name}</span>
                      <span
                        className="layer-toggle-dot"
                        style={{
                          background: layer.enabled ? layer.color : "#333",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
