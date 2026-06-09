import { useMemo } from "react";
import { Circle, Marker } from "react-leaflet";
import L from "leaflet";
import type { RangeRingsDrawing as IRangeRingsDrawing } from "../../types/drawing";
import { getDashArray } from "../../utils/geoUtils";
import { useDrawingStore } from "../../store/drawingStore";

interface Props {
  drawing: IRangeRingsDrawing;
}

export default function RangeRingsDrawing({ drawing }: Props) {
  const { state, setSelected, updateDrawing } = useDrawingStore();
  const isSelected = state.selectedId === drawing.id;
  const { center, radiusKm, rings, style, visible } = drawing;

  const dash = getDashArray(style.lineStyle, style.weight);
  const ringRadii = useMemo(
    () =>
      Array.from(
        { length: rings },
        (_, i) => ((i + 1) / rings) * radiusKm * 1000,
      ),
    [rings, radiusKm],
  );

  const labelIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div class="ring-label">r: ${radiusKm.toFixed(2)} km</div>`,
        iconSize: [130, 22],
        iconAnchor: [65, 11],
      }),
    [radiusKm],
  );

  const centerIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div class="endpoint-dot" style="background:${style.color};border-color:${style.color};"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    [style.color],
  );

  if (!visible) return null;

  const outerRadiusMeters = radiusKm * 1000;
  const lngOffset =
    outerRadiusMeters / (111320 * Math.cos((center.lat * Math.PI) / 180));

  function handleClick() {
    setSelected(drawing.id);
  }

  return (
    <>
      {ringRadii.map((r, i) => (
        <Circle
          key={i}
          center={[center.lat, center.lng]}
          radius={r}
          pathOptions={{
            color: style.color,
            weight: isSelected ? style.weight + 1 : style.weight,
            opacity: style.opacity,
            fillColor: style.color,
            fillOpacity: i === rings - 1 ? 0.15 : 0.05,
            dashArray: dash,
          }}
          eventHandlers={{ click: handleClick }}
        />
      ))}
      <Marker
        position={[center.lat, center.lng]}
        icon={centerIcon}
        draggable
        eventHandlers={{
          click: handleClick,
          dragend(e) {
            const ll = (e.target as L.Marker).getLatLng();
            updateDrawing(drawing.id, {
              center: { lat: ll.lat, lng: ll.lng },
            } as Partial<IRangeRingsDrawing>);
          },
        }}
      />
      <Marker
        position={[center.lat, center.lng + lngOffset * 0.5]}
        icon={labelIcon}
        eventHandlers={{ click: handleClick }}
      />
    </>
  );
}
