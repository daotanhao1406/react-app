import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDrawingStore } from "../../store/drawingStore";
import DrawingLayer from "./DrawingLayer";
import ActiveToolLayer from "./ActiveToolLayer";
import StyleEditor from "../style/StyleEditor";
import DrawToolbar from "../toolbar/DrawToolbar";
import DrawingManager from "../manager/DrawingManager";
import TopBar from "../topbar/TopBar";
import styles from "./LeafletMap.module.css";

export default function LeafletMap() {
  const { state } = useDrawingStore();
  const { selectedId, drawings, activeTool } = state;
  const selectedDrawing = drawings.find((d) => d.id === selectedId);

  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={[21.0285, 105.8542]}
        zoom={8}
        className={styles.map}
        zoomControl={false}
        style={{
          cursor:
            activeTool === "select"
              ? "default"
              : activeTool === "distance"
                ? "crosshair"
                : activeTool === "range-rings"
                  ? "crosshair"
                  : activeTool === "text"
                    ? "text"
                    : "default",
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />
        <DrawingLayer drawings={drawings} />
        <ActiveToolLayer />
      </MapContainer>

      <DrawToolbar />
      <TopBar />
      <DrawingManager />

      {selectedDrawing && <StyleEditor drawing={selectedDrawing} />}
    </div>
  );
}
