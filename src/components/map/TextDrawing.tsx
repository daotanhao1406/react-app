import { useMemo, useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { Input, Modal } from "antd";
import type { TextDrawing as ITextDrawing } from "../../types/drawing";
import { useDrawingStore } from "../../store/drawingStore";

interface Props {
  drawing: ITextDrawing;
}

export default function TextDrawing({ drawing }: Props) {
  const { state, setSelected, updateDrawing } = useDrawingStore();
  const isSelected = state.selectedId === drawing.id;
  const { position, text, style, visible, fontSize } = drawing;

  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState(text);

  function openEdit() {
    setEditValue(text);
    setEditOpen(true);
  }

  function confirmEdit() {
    updateDrawing(drawing.id, {
      text: editValue || "Label",
    } as Partial<ITextDrawing>);
    setEditOpen(false);
  }

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div class="text-annotation" style="color:${style.color};font-size:${fontSize}px;${
          isSelected
            ? `outline:2px solid ${style.color};border-radius:3px;`
            : ""
        }" title="Click to edit">${text || "Label"}</div>`,
        iconSize: [Math.max(text.length * (fontSize * 0.6), 60), fontSize + 10],
        iconAnchor: [0, (fontSize + 10) / 2],
      }),
    [style.color, fontSize, text, isSelected],
  );

  if (!visible) return null;

  return (
    <>
      <Marker
        position={[position.lat, position.lng]}
        icon={icon}
        draggable
        eventHandlers={{
          click() {
            setSelected(drawing.id);
            openEdit();
          },
          dragend(e) {
            const ll = (e.target as L.Marker).getLatLng();
            updateDrawing(drawing.id, {
              position: { lat: ll.lat, lng: ll.lng },
            } as Partial<ITextDrawing>);
          },
        }}
      />

      <Modal
        title="Edit Label"
        open={editOpen}
        onOk={confirmEdit}
        onCancel={() => setEditOpen(false)}
        okText="Save"
        okButtonProps={{
          style: { background: "#d97706", borderColor: "#d97706" },
        }}
        width={320}
      >
        <div style={{ marginBottom: 4 }}>
          <div style={{ color: "#aaa", fontSize: 12, marginBottom: 6 }}>
            LABEL TEXT
          </div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onPressEnter={confirmEdit}
            autoFocus
          />
        </div>
      </Modal>
    </>
  );
}
