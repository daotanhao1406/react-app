import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapLayer } from "../data/layerData";

interface WorldMapProps {
  layers: MapLayer[];
}

function createSvgIcon(
  color: string,
  icon: string,
  intensity: string,
): L.DivIcon {
  const sizes: Record<string, number> = { low: 20, medium: 26, high: 32 };
  const sz = sizes[intensity] ?? 24;
  const glowOpacity =
    intensity === "high" ? 0.5 : intensity === "medium" ? 0.3 : 0.15;
  const html = `
    <div style="
      width:${sz}px;height:${sz}px;
      border-radius:50%;
      background:${color}22;
      border:2px solid ${color};
      box-shadow:0 0 ${sz / 2}px ${color}${Math.round(glowOpacity * 255)
        .toString(16)
        .padStart(2, "0")};
      display:flex;align-items:center;justify-content:center;
      font-size:${sz * 0.5}px;
      transition:transform 0.15s;
    ">
      <span style="line-height:1;filter:drop-shadow(0 0 2px ${color})">${icon}</span>
    </div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [sz, sz],
    iconAnchor: [sz / 2, sz / 2],
    popupAnchor: [0, -sz / 2],
  });
}

function MapContent({ layers }: { layers: MapLayer[] }) {
  const markers = useMemo(
    () =>
      layers
        .filter((l) => l.enabled)
        .flatMap((layer) =>
          layer.markers.map((m) => ({
            ...m,
            layerId: layer.id,
            layerName: layer.name,
            color: layer.color,
            icon: layer.icon,
          })),
        ),
    [layers],
  );

  return (
    <>
      {markers.map((m) => (
        <Marker
          key={`${m.layerId}-${m.id}`}
          position={[m.lat, m.lng]}
          icon={createSvgIcon(m.color, m.icon, m.intensity ?? "medium")}
        >
          <Popup className="map-popup">
            <div className="popup-inner">
              <div className="popup-header" style={{ borderColor: m.color }}>
                <span className="popup-icon">{m.icon}</span>
                <span className="popup-layer" style={{ color: m.color }}>
                  {m.layerName}
                </span>
              </div>
              {m.label && <div className="popup-label">{m.label}</div>}
              <div className="popup-coords">
                {m.lat.toFixed(2)}°, {m.lng.toFixed(2)}°
              </div>
              <div className={`popup-intensity intensity-${m.intensity}`}>
                ● {(m.intensity ?? "medium").toUpperCase()}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export function WorldMap({ layers }: WorldMapProps) {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={3}
      minZoom={2}
      maxZoom={12}
      className="map-canvas"
      worldCopyJump={false}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      <MapContent layers={layers} />
    </MapContainer>
  );
}
