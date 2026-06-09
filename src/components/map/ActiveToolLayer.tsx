import { useState, useCallback, useRef, useEffect } from "react";
import { useMapEvents, Marker, Polyline, Circle } from "react-leaflet";
import L from "leaflet";
import { Input, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { LatLng } from "../../types/drawing";
import { useDrawingStore } from "../../store/drawingStore";
import {
  generateId,
  defaultStyle,
  distanceKm,
  formatKm,
} from "../../utils/geoUtils";

const startDotIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="width:10px;height:10px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 4px rgba(0,0,0,0.6);"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

interface TextPopover {
  pos: LatLng;
  px: number;
  py: number;
  open: boolean;
}

export default function ActiveToolLayer() {
  const { state, addDrawing, setActiveTool } = useDrawingStore();
  const { activeTool, drawings } = state;

  const [distStart, setDistStart] = useState<LatLng | null>(null);
  const [mousePos, setMousePos] = useState<LatLng | null>(null);
  const [ringCenter, setRingCenter] = useState<LatLng | null>(null);
  const [textPopover, setTextPopover] = useState<TextPopover>({
    pos: { lat: 0, lng: 0 },
    px: 0,
    py: 0,
    open: false,
  });
  const [textValue, setTextValue] = useState("Label");
  const inputRef = useRef<any>(null);

  const drawingCount = drawings.length + 1;
  const getLabel = useCallback(
    (prefix: string) => `${prefix} ${drawingCount}`,
    [drawingCount],
  );
  const toolColor = defaultStyle().color;

  useEffect(() => {
    if (textPopover.open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [textPopover.open]);

  const map = useMapEvents({
    mousemove(e) {
      if (activeTool === "select") return;
      setMousePos({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    click(e) {
      if (activeTool === "select") return;
      // prevent click if text popover is open
      if (textPopover.open) return;
      const pos: LatLng = { lat: e.latlng.lat, lng: e.latlng.lng };

      if (activeTool === "distance") {
        if (!distStart) {
          setDistStart(pos);
        } else {
          addDrawing({
            id: generateId(),
            type: "distance",
            name: getLabel("Distance Line"),
            visible: true,
            style: defaultStyle(),
            createdAt: Date.now(),
            start: distStart,
            end: pos,
          });
          setDistStart(null);
          setMousePos(null);
          setActiveTool("select");
        }
      } else if (activeTool === "range-rings") {
        if (!ringCenter) {
          setRingCenter(pos);
        } else {
          const radiusKm = distanceKm(ringCenter, pos);
          if (radiusKm > 0) {
            addDrawing({
              id: generateId(),
              type: "range-rings",
              name: getLabel("Range Rings"),
              visible: true,
              style: defaultStyle(),
              createdAt: Date.now(),
              center: ringCenter,
              radiusKm: Math.max(0.1, radiusKm),
              rings: 3,
            });
          }
          setRingCenter(null);
          setMousePos(null);
          setActiveTool("select");
        }
      } else if (activeTool === "text") {
        const point = map.latLngToContainerPoint(e.latlng);
        setTextValue("Label");
        setTextPopover({ pos, px: point.x, py: point.y, open: true });
      }
    },
  });

  function confirmText() {
    if (!textPopover.open) return;
    addDrawing({
      id: generateId(),
      type: "text",
      name: getLabel("Text Annotation"),
      visible: true,
      style: defaultStyle(),
      createdAt: Date.now(),
      position: textPopover.pos,
      text: textValue || "Label",
      fontSize: 16,
    });
    setTextPopover((p) => ({ ...p, open: false }));
    setActiveTool("select");
  }

  function cancelText() {
    setTextPopover((p) => ({ ...p, open: false }));
  }

  const showDistPreview = activeTool === "distance" && distStart && mousePos;
  const previewDistKm = showDistPreview ? distanceKm(distStart, mousePos) : 0;
  const showRingPreview =
    activeTool === "range-rings" && ringCenter && mousePos;
  const previewRingKm = showRingPreview
    ? Math.max(0.1, distanceKm(ringCenter, mousePos))
    : 0;

  // clamp popover to stay inside the map container
  const mapSize = map.getSize();
  const popW = 220;
  const popH = 90;
  const clampedPx = Math.min(textPopover.px + 12, mapSize.x - popW - 8);
  const clampedPy =
    textPopover.py + popH + 12 > mapSize.y
      ? textPopover.py - popH - 8
      : textPopover.py + 12;

  return (
    <>
      {/* Distance: start dot */}
      {distStart && (
        <Marker
          position={[distStart.lat, distStart.lng]}
          icon={startDotIcon(toolColor)}
        />
      )}

      {/* Distance: live preview line */}
      {showDistPreview && (
        <Polyline
          positions={[
            [distStart.lat, distStart.lng],
            [mousePos.lat, mousePos.lng],
          ]}
          pathOptions={{
            color: toolColor,
            weight: 2,
            opacity: 0.7,
            dashArray: "6,4",
          }}
        />
      )}

      {/* Range rings: center dot */}
      {ringCenter && (
        <Marker
          position={[ringCenter.lat, ringCenter.lng]}
          icon={startDotIcon(toolColor)}
        />
      )}

      {/* Range rings: live preview */}
      {showRingPreview &&
        [1, 2, 3].map((n) => (
          <Circle
            key={n}
            center={[ringCenter.lat, ringCenter.lng]}
            radius={(n / 3) * previewRingKm * 1000}
            pathOptions={{
              color: toolColor,
              weight: 1.5,
              opacity: 0.6,
              fillColor: toolColor,
              fillOpacity: n === 3 ? 0.12 : 0.04,
              dashArray: "6,4",
            }}
          />
        ))}

      {/* Text: inline popover at click position */}
      {textPopover.open && (
        <div
          style={{
            position: "absolute",
            left: clampedPx,
            top: clampedPy,
            zIndex: 1100,
            background: "rgba(22,22,25,0.97)",
            border: `1.5px solid ${toolColor}`,
            borderRadius: 8,
            padding: "10px 12px",
            width: popW,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 11,
              letterSpacing: "0.07em",
              marginBottom: 6,
            }}
          >
            LABEL
          </div>
          <Input
            ref={inputRef}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onPressEnter={confirmText}
            size="small"
            placeholder="Enter label…"
            style={{ marginBottom: 8 }}
          />
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
            <Button
              size="small"
              icon={<CloseOutlined />}
              onClick={cancelText}
            />
            <Button
              size="small"
              type="primary"
              icon={<CheckOutlined />}
              onClick={confirmText}
              style={{ background: "#d97706", borderColor: "#d97706" }}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Status hint bar */}
      {activeTool !== "select" && !textPopover.open && (
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background: "rgba(0,0,0,0.78)",
            color: "#fff",
            padding: "5px 16px",
            borderRadius: 6,
            fontSize: 13,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {activeTool === "distance" &&
            (distStart
              ? showDistPreview
                ? `Distance: ${formatKm(previewDistKm)} — click to confirm`
                : "Click to set end point"
              : "Click to set start point")}
          {activeTool === "range-rings" &&
            (ringCenter
              ? showRingPreview
                ? `Radius: ${formatKm(previewRingKm)} — click to confirm`
                : "Move cursor to set radius"
              : "Click to set center point")}
          {activeTool === "text" && "Click on the map to place text"}
        </div>
      )}
    </>
  );
}
