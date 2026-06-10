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

// CSS-triangle arrowhead, default pointing RIGHT, rotated by `rotateDeg`
function makeArrowIcon(color: string, rotateDeg: number) {
  return L.divIcon({
    className: "",
    html: `<div style="
      position:absolute;left:0;top:0;
      transform:translate(-50%,-50%) rotate(${rotateDeg}deg);
      width:0;height:0;
      border-top:5px solid transparent;
      border-bottom:5px solid transparent;
      border-left:12px solid ${color};
      pointer-events:none;
    "></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

// Transparent drag-handle dot so endpoints remain draggable
function makeDragDot(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};border:2px solid #fff;
      box-shadow:0 0 4px rgba(0,0,0,0.6);
      cursor:grab;
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export default function DistanceDrawing({ drawing }: Props) {
  const { state, setSelected, updateDrawing } = useDrawingStore();
  const isSelected = state.selectedId === drawing.id;
  const { start, end, style, visible } = drawing;

  const distKm = distanceKm(start, end);
  const mid = midpoint(start, end);
  const bearing = bearingDeg(start, end);
  const dash = getDashArray(style.lineStyle, style.weight);

  // Keep text readable: don't let it go upside-down
  let labelRotation = bearing - 90;
  if (labelRotation > 90) labelRotation -= 180;
  if (labelRotation < -90) labelRotation += 180;

  // CSS rotation: default triangle → points right (east)
  // bearing - 90 maps north→-90 (up), east→0 (right), south→90 (down), west→180 (left)
  const endArrowRotation = bearing - 90; // end arrow points AWAY from start (along bearing)
  const startArrowRotation = bearing + 90; // start arrow points AWAY from end (opposite)

  const labelIcon = useMemo(() => {
    const label = formatKm(distKm);
    return L.divIcon({
      className: "",
      html: `<div style="
        position:absolute;left:0;top:0;
        transform:translate(-50%,-50%) rotate(${labelRotation}deg);
        white-space:nowrap;
        font-size:13px;
        font-weight:700;
        color:#fff;
        letter-spacing:0.04em;
        text-shadow:0 0 6px rgba(0,0,0,1),0 0 3px rgba(0,0,0,1),0 1px 4px rgba(0,0,0,0.9);
        pointer-events:auto;
        cursor:pointer;
        padding:0 4px;
        line-height:1.4;
      ">${label}</div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }, [distKm, labelRotation]);

  const startArrowIcon = useMemo(
    () => makeArrowIcon(style.color, startArrowRotation),
    [style.color, startArrowRotation],
  );

  const endArrowIcon = useMemo(
    () => makeArrowIcon(style.color, endArrowRotation),
    [style.color, endArrowRotation],
  );

  const dragDotIcon = useMemo(() => makeDragDot(style.color), [style.color]);

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

      {/* Arrowheads at endpoints */}
      <Marker position={[start.lat, start.lng]} icon={startArrowIcon} />
      <Marker position={[end.lat, end.lng]} icon={endArrowIcon} />

      {/* Invisible drag handles at endpoints */}
      <Marker
        position={[start.lat, start.lng]}
        icon={dragDotIcon}
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
        icon={dragDotIcon}
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
