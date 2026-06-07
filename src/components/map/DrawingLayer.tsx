import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { createPortal } from "react-dom";
import { DrawTool } from "../../hooks/useDrawing";

interface DrawingLayerProps {
  activeTool: DrawTool;
  onToolChange: (tool: DrawTool) => void;
}

interface TextInputPopup {
  latlng: L.LatLng;
  x: number;
  y: number;
}

const FINAL_STYLE: L.PathOptions = {
  color: "#e8a23d",
  weight: 2,
  opacity: 0.9,
  fillColor: "#e8a23d",
  fillOpacity: 0.15,
};

const PREVIEW_STYLE: L.PathOptions = {
  color: "#e8a23d",
  weight: 2,
  opacity: 0.6,
  dashArray: "6 5",
  fillColor: "#e8a23d",
  fillOpacity: 0.07,
  interactive: false,
};

function DrawingLayer({ activeTool, onToolChange }: DrawingLayerProps) {
  const map = useMap();
  const [textPopup, setTextPopup] = useState<TextInputPopup | null>(null);
  const [textValue, setTextValue] = useState("");
  const textInputRef = useRef<HTMLInputElement>(null);

  // All committed layers (for undo/delete)
  const committedRef = useRef<L.Layer[]>([]);
  // Cleanup function for current drawing session
  const cleanupRef = useRef<(() => void) | null>(null);

  // Cursor class on map container
  useEffect(() => {
    const container = map.getContainer();
    container.classList.remove("cursor-crosshair", "cursor-text-mode");
    if (activeTool === "text") container.classList.add("cursor-text-mode");
    else if (activeTool !== "pointer")
      container.classList.add("cursor-crosshair");
  }, [activeTool, map]);

  // Undo / delete-all via map events
  useEffect(() => {
    const onUndo = () => {
      const layers = committedRef.current;
      if (layers.length > 0) {
        const last = layers.pop()!;
        map.removeLayer(last);
      }
    };
    const onDeleteAll = () => {
      committedRef.current.forEach((l) => map.removeLayer(l));
      committedRef.current = [];
    };
    map.on("draw:undo-custom" as any, onUndo);
    map.on("draw:deleteall-custom" as any, onDeleteAll);
    return () => {
      map.off("draw:undo-custom" as any, onUndo);
      map.off("draw:deleteall-custom" as any, onDeleteAll);
    };
  }, [map]);

  // Start / stop drawing session on tool change
  useEffect(() => {
    // Tear down previous session
    cleanupRef.current?.();
    cleanupRef.current = null;

    if (activeTool === "pointer") return;

    if (activeTool === "text") {
      cleanupRef.current = startTextMode(
        map,
        setTextPopup,
        setTextValue,
        textInputRef,
      );
      return;
    }

    let cleanup: (() => void) | null = null;

    switch (activeTool) {
      case "polygon":
        cleanup = startPolygonMode(map, committedRef.current, onToolChange);
        break;
      case "polyline":
        cleanup = startPolylineMode(map, committedRef.current, onToolChange);
        break;
      case "rectangle":
        cleanup = startRectangleMode(map, committedRef.current, onToolChange);
        break;
      case "circle":
        cleanup = startCircleMode(map, committedRef.current, onToolChange);
        break;
    }

    cleanupRef.current = cleanup;
    return () => {
      cleanup?.();
    };
  }, [activeTool, map, onToolChange]);

  const handleTextSubmit = () => {
    if (!textPopup || !textValue.trim()) {
      setTextPopup(null);
      return;
    }
    const icon = L.divIcon({
      className: "map-text-label",
      html: `<span class="map-text-content">${escapeHtml(textValue.trim())}</span>`,
      iconAnchor: [0, 10],
    });
    const marker = L.marker(textPopup.latlng, { icon, draggable: true });
    marker.addTo(map);
    committedRef.current.push(marker);
    setTextPopup(null);
    setTextValue("");
    onToolChange("pointer");
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleTextSubmit();
    if (e.key === "Escape") {
      setTextPopup(null);
      setTextValue("");
    }
  };

  if (!textPopup) return null;

  return createPortal(
    <div
      className="text-label-popup"
      style={{ left: textPopup.x, top: textPopup.y }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <input
        ref={textInputRef}
        className="text-label-input"
        placeholder="Enter text..."
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={handleTextKeyDown}
        autoFocus
      />
      <div className="text-label-actions">
        <button className="text-label-confirm" onClick={handleTextSubmit}>
          Add
        </button>
        <button
          className="text-label-cancel"
          onClick={() => {
            setTextPopup(null);
            setTextValue("");
          }}
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
}

// ─── Drawing mode implementations ───────────────────────────────────────────

function startTextMode(
  map: L.Map,
  setPopup: (p: TextInputPopup | null) => void,
  _setValue: (s: string) => void,
  _inputRef: React.RefObject<HTMLInputElement | null>,
) {
  const onClick = (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e as any);
    const point = map.latLngToContainerPoint(e.latlng);
    const rect = map.getContainer().getBoundingClientRect();
    setPopup({
      latlng: e.latlng,
      x: rect.left + point.x,
      y: rect.top + point.y,
    });
    _setValue("");
    setTimeout(() => _inputRef.current?.focus(), 60);
  };
  map.on("click", onClick);
  return () => map.off("click", onClick);
}

function startPolygonMode(
  map: L.Map,
  committed: L.Layer[],
  onDone: (t: DrawTool) => void,
) {
  const vertices: L.LatLng[] = [];
  let previewPoly: L.Polygon | null = null;
  let previewLine: L.Polyline | null = null;
  let hintLine: L.Polyline | null = null;

  const clearPreview = () => {
    previewPoly?.remove();
    previewLine?.remove();
    hintLine?.remove();
    previewPoly = previewLine = hintLine = null;
  };

  const onClick = (e: L.LeafletMouseEvent) => {
    vertices.push(e.latlng);
    updatePreview(e.latlng);
  };

  const onDblClick = (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e as any);
    if (vertices.length < 3) {
      cleanup();
      onDone("pointer");
      return;
    }
    clearPreview();
    const poly = L.polygon(vertices, {
      ...FINAL_STYLE,
      interactive: true,
    }).addTo(map);
    committed.push(poly);
    cleanup();
    onDone("pointer");
  };

  const onMouseMove = (e: L.LeafletMouseEvent) => {
    if (vertices.length === 0) return;
    updateHint(e.latlng);
  };

  const updatePreview = (latest: L.LatLng) => {
    clearPreview();
    if (vertices.length >= 2) {
      previewPoly = L.polygon(vertices, {
        ...PREVIEW_STYLE,
        interactive: false,
      }).addTo(map);
    }
    previewLine = L.polyline(vertices, {
      color: "#e8a23d",
      weight: 2,
      opacity: 0.8,
      interactive: false,
    }).addTo(map);
    hintLine = L.polyline([latest, latest], {
      color: "#e8a23d",
      weight: 1.5,
      opacity: 0.5,
      dashArray: "4 4",
      interactive: false,
    }).addTo(map);
  };

  const updateHint = (mouse: L.LatLng) => {
    if (vertices.length > 0 && hintLine) {
      hintLine.setLatLngs([vertices[vertices.length - 1], mouse]);
    }
  };

  map.on("click", onClick);
  map.on("dblclick", onDblClick);
  map.on("mousemove", onMouseMove);
  map.dragging.enable();

  const cleanup = () => {
    clearPreview();
    map.off("click", onClick);
    map.off("dblclick", onDblClick);
    map.off("mousemove", onMouseMove);
  };

  return cleanup;
}

function startPolylineMode(
  map: L.Map,
  committed: L.Layer[],
  onDone: (t: DrawTool) => void,
) {
  const points: L.LatLng[] = [];
  let previewLine: L.Polyline | null = null;
  let hintLine: L.Polyline | null = null;

  const clearPreview = () => {
    previewLine?.remove();
    hintLine?.remove();
    previewLine = hintLine = null;
  };

  const onClick = (e: L.LeafletMouseEvent) => {
    points.push(e.latlng);
    clearPreview();
    previewLine = L.polyline(points, {
      color: "#e8a23d",
      weight: 2.5,
      opacity: 0.85,
      interactive: false,
    }).addTo(map);
    hintLine = L.polyline([e.latlng, e.latlng], {
      color: "#e8a23d",
      weight: 1.5,
      opacity: 0.5,
      dashArray: "4 4",
      interactive: false,
    }).addTo(map);
  };

  const onDblClick = (e: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(e as any);
    if (points.length < 2) {
      cleanup();
      onDone("pointer");
      return;
    }
    clearPreview();
    const line = L.polyline(points, {
      color: "#e8a23d",
      weight: 2.5,
      opacity: 0.9,
      interactive: true,
    }).addTo(map);
    committed.push(line);
    cleanup();
    onDone("pointer");
  };

  const onMouseMove = (e: L.LeafletMouseEvent) => {
    if (points.length === 0 || !hintLine) return;
    hintLine.setLatLngs([points[points.length - 1], e.latlng]);
  };

  map.on("click", onClick);
  map.on("dblclick", onDblClick);
  map.on("mousemove", onMouseMove);

  const cleanup = () => {
    clearPreview();
    map.off("click", onClick);
    map.off("dblclick", onDblClick);
    map.off("mousemove", onMouseMove);
  };

  return cleanup;
}

function startRectangleMode(
  map: L.Map,
  committed: L.Layer[],
  onDone: (t: DrawTool) => void,
) {
  let startLatLng: L.LatLng | null = null;
  let previewRect: L.Rectangle | null = null;
  let isDragging = false;

  const onMouseDown = (e: L.LeafletMouseEvent) => {
    startLatLng = e.latlng;
    isDragging = true;
    map.dragging.disable();
  };

  const onMouseMove = (e: L.LeafletMouseEvent) => {
    if (!isDragging || !startLatLng) return;
    previewRect?.remove();
    previewRect = L.rectangle([startLatLng, e.latlng], {
      ...PREVIEW_STYLE,
      interactive: false,
    }).addTo(map);
  };

  const onMouseUp = (e: L.LeafletMouseEvent) => {
    if (!isDragging || !startLatLng) return;
    isDragging = false;
    map.dragging.enable();
    previewRect?.remove();
    previewRect = null;
    if (startLatLng.equals(e.latlng)) {
      cleanup();
      onDone("pointer");
      return;
    }
    const rect = L.rectangle([startLatLng, e.latlng], {
      ...FINAL_STYLE,
      interactive: true,
    }).addTo(map);
    committed.push(rect);
    cleanup();
    onDone("pointer");
  };

  map.on("mousedown", onMouseDown);
  map.on("mousemove", onMouseMove);
  map.on("mouseup", onMouseUp);

  const cleanup = () => {
    previewRect?.remove();
    previewRect = null;
    map.dragging.enable();
    map.off("mousedown", onMouseDown);
    map.off("mousemove", onMouseMove);
    map.off("mouseup", onMouseUp);
  };

  return cleanup;
}

function startCircleMode(
  map: L.Map,
  committed: L.Layer[],
  onDone: (t: DrawTool) => void,
) {
  let center: L.LatLng | null = null;
  let previewCircle: L.Circle | null = null;
  let previewDot: L.CircleMarker | null = null;

  const onClick = (e: L.LeafletMouseEvent) => {
    if (!center) {
      // First click: set center
      center = e.latlng;
      previewDot = L.circleMarker(center, {
        radius: 4,
        color: "#e8a23d",
        fillColor: "#e8a23d",
        fillOpacity: 1,
        interactive: false,
      }).addTo(map);
    } else {
      // Second click: finalize
      const radius = center.distanceTo(e.latlng);
      previewCircle?.remove();
      previewDot?.remove();
      if (radius < 100) {
        cleanup();
        onDone("pointer");
        return;
      }
      const circle = L.circle(center, {
        ...FINAL_STYLE,
        radius,
        interactive: true,
      }).addTo(map);
      committed.push(circle);
      cleanup();
      onDone("pointer");
    }
  };

  const onMouseMove = (e: L.LeafletMouseEvent) => {
    if (!center) return;
    const radius = center.distanceTo(e.latlng);
    previewCircle?.remove();
    previewCircle = L.circle(center, {
      ...PREVIEW_STYLE,
      radius,
      interactive: false,
    }).addTo(map);
  };

  map.on("click", onClick);
  map.on("mousemove", onMouseMove);

  const cleanup = () => {
    previewCircle?.remove();
    previewDot?.remove();
    previewCircle = previewDot = null;
    center = null;
    map.off("click", onClick);
    map.off("mousemove", onMouseMove);
  };

  return cleanup;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default DrawingLayer;
