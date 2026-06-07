import { useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ChevronDown } from "lucide-react";
import { type DrawTool } from "./hooks/useDrawing";
import L from "leaflet";
import DrawingLayer from "./components/map/DrawingLayer";
import JumpToPanel from "./components/map/JumpToPanel";
import MapCoordinates from "./components/map/MapCoordinates";
import DrawingToolbar from "./components/map/DrawingToolbar";

function DrawingCommands({
  mapRef,
}: {
  mapRef: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMap();
  mapRef.current = map;
  return null;
}

function App() {
  const [jumpOpen, setJumpOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<DrawTool>("pointer");
  const mapRef = useRef<L.Map | null>(null);

  const handleToggleJump = useCallback(() => {
    setJumpOpen((v) => !v);
  }, []);

  const handleCloseJump = useCallback(() => {
    setJumpOpen(false);
  }, []);

  const handleToolChange = useCallback((tool: DrawTool) => {
    setActiveTool(tool);
  }, []);

  const handleUndo = useCallback(() => {
    mapRef.current?.fire("draw:undo-custom");
  }, []);

  const handleDeleteAll = useCallback(() => {
    if (window.confirm("Delete all drawings?")) {
      mapRef.current?.fire("draw:deleteall-custom");
    }
  }, []);

  return (
    <div className="map-root">
      <div className="toolbar">
        <button
          className={`toolbar-btn ${jumpOpen ? "toolbar-btn-active" : ""}`}
          onClick={handleToggleJump}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>Jump</span>
          <ChevronDown
            size={11}
            className={`toolbar-chevron ${jumpOpen ? "toolbar-chevron-up" : ""}`}
          />
        </button>
      </div>

      <DrawingToolbar
        activeTool={activeTool}
        onToolChange={handleToolChange}
        onDeleteAll={handleDeleteAll}
        onUndo={handleUndo}
      />

      <MapContainer
        className="leaflet-map"
        center={[20, 0]}
        zoom={3}
        zoomControl={true}
        attributionControl={false}
        minZoom={2}
        maxZoom={18}
        worldCopyJump={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        <DrawingCommands mapRef={mapRef} />
        <DrawingLayer activeTool={activeTool} onToolChange={handleToolChange} />
        {jumpOpen && <JumpToPanel onClose={handleCloseJump} />}
        <MapCoordinates />
      </MapContainer>
    </div>
  );
}

export default App;
