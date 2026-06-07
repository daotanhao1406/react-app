import { useState } from "react";
import { useMapEvents } from "react-leaflet";

function MapCoordinates() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0, zoom: 3 });

  const map = useMapEvents({
    mousemove(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng, zoom: map.getZoom() });
    },
    zoomend() {
      setCoords((c) => ({ ...c, zoom: map.getZoom() }));
    },
  });

  const fmt = (n: number, d = 5) => n.toFixed(d);
  const toDMS = (deg: number, isLat: boolean) => {
    const abs = Math.abs(deg);
    const d = Math.floor(abs);
    const m = Math.floor((abs - d) * 60);
    const s = ((abs - d) * 60 - m) * 60;
    const dir = isLat ? (deg >= 0 ? "N" : "S") : deg >= 0 ? "E" : "W";
    return `${d}°${m.toString().padStart(2, "0")}'${s.toFixed(1).padStart(4, "0")}"${dir}`;
  };

  return (
    <div className="coords-bar">
      <span>
        {fmt(coords.lat)}, {fmt(coords.lng)}
      </span>
      <span className="coords-divider">|</span>
      <span>
        {toDMS(coords.lat, true)} {toDMS(coords.lng, false)}
      </span>
    </div>
  );
}

export default MapCoordinates;
