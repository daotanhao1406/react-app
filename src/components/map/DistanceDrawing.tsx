import { useMemo } from "react";
import { Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import type { DistanceDrawing as IDistanceDrawing } from "../../types/drawing";
import {
  distanceKm,
  formatKm,
  midpoint,
  getDashArray,
  bearingDeg,
} from "../../utils/geoUtils";
import { useDrawingStore } from "../../store/drawingStore";

interface Props {
  drawing: IDistanceDrawing;
}

export default function DistanceDrawing({ drawing }: Props) {
  const { state, setSelected, updateDrawing } = useDrawingStore();
  const isSelected = state.selectedId === drawing.id;
  const { start, end, style, visible } = drawing;

  const distKm = distanceKm(start, end);
  const mid = midpoint(start, end);
  const bearing = bearingDeg(start, end);
  const dash = getDashArray(style.lineStyle, style.weight);

  // Rotate label to align with the line; keep text readable
  let rotation = bearing - 90;
  if (rotation > 90) rotation -= 180;
  if (rotation < -90) rotation += 180;

  const labelIcon = useMemo(() => {
    const label = formatKm(distKm);
    return L.divIcon({
      className: "",
      html: `<div style="position:absolute;left:0;top:0;pointer-events:auto;">
        <div class="dist-label" style="
          position:absolute;
          transform:translate(-50%,-50%) rotate(${rotation}deg);
          color:${style.color};
          white-space:nowrap;
        ">
          <span class="arrow">&#8592;</span>
          <span class="label-text">${label}</span>
          <span class="arrow">&#8594;</span>
        </div>
      </div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }, [distKm, style.color, rotation]);

  const endpointIcon = useMemo(
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

  const positions: [number, number][] = [
    [start.lat, start.lng],
    [end.lat, end.lng],
  ];

  function handleClick() {
    setSelected(drawing.id);
  }

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: style.color,
          weight: isSelected ? style.weight + 1 : style.weight,
          opacity: style.opacity,
          dashArray: dash,
        }}
        eventHandlers={{ click: handleClick }}
      />
      <Marker
        position={[mid.lat, mid.lng]}
        icon={labelIcon}
        eventHandlers={{ click: handleClick }}
      />
      <Marker
        position={[start.lat, start.lng]}
        icon={endpointIcon}
        draggable
        eventHandlers={{
          click: handleClick,
          dragend(e) {
            const ll = (e.target as L.Marker).getLatLng();
            updateDrawing(drawing.id, {
              start: { lat: ll.lat, lng: ll.lng },
            } as Partial<IDistanceDrawing>);
          },
        }}
      />
      <Marker
        position={[end.lat, end.lng]}
        icon={endpointIcon}
        draggable
        eventHandlers={{
          click: handleClick,
          dragend(e) {
            const ll = (e.target as L.Marker).getLatLng();
            updateDrawing(drawing.id, {
              end: { lat: ll.lat, lng: ll.lng },
            } as Partial<IDistanceDrawing>);
          },
        }}
      />
    </>
  );
}
