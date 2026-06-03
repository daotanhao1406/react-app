import { useState, useCallback } from "react";
import { MapLayer, LayerCategory, defaultLayers } from "./data/layerData";
import { LayerPanel } from "./components/LayerPanel";
import { WorldMap } from "./components/WorldMap";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [layers, setLayers] = useState<MapLayer[]>(defaultLayers);
  const [panelOpen, setPanelOpen] = useState(true);

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)),
    );
  }, []);

  const toggleAll = useCallback((category: LayerCategory, enabled: boolean) => {
    setLayers((prev) =>
      prev.map((l) => (l.category === category ? { ...l, enabled } : l)),
    );
  }, []);

  const activeCount = layers.filter((l) => l.enabled).length;
  const totalMarkers = layers
    .filter((l) => l.enabled)
    .reduce((sum, l) => sum + l.markers.length, 0);

  return (
    <div className="app-root dark">
      <header className="app-header">
        <div className="header-left">
          <button
            className="panel-toggle-btn"
            onClick={() => setPanelOpen((v) => !v)}
            title="Toggle Layer Panel"
          >
            ☰ Layers {panelOpen ? "▲" : "▼"}
          </button>
          <div className="header-sep" />
          <span className="header-badge">{activeCount} layers active</span>
          <span className="header-badge dim">{totalMarkers} markers</span>
        </div>
        <div className="header-center">
          <span className="app-title">WORLD MAP</span>
        </div>
        <div className="header-right">
          <span className="header-badge dim">Interactive</span>
        </div>
      </header>

      <div className="app-body">
        {panelOpen && (
          <aside className="sidebar">
            <LayerPanel
              layers={layers}
              onToggleLayer={toggleLayer}
              onToggleAll={toggleAll}
            />
          </aside>
        )}
        <main className="map-wrapper">
          <WorldMap layers={layers} />
        </main>
      </div>
    </div>
  );
}
