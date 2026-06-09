import { useState, useRef } from "react";
import { Input, Tooltip, Modal } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  RadiusSettingOutlined,
  AimOutlined,
  FontSizeOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import type { Drawing, TextDrawing } from "../../types/drawing";
import { useDrawingStore } from "../../store/drawingStore";
import styles from "./DrawingManager.module.css";

function DrawingIcon({ type }: { type: Drawing["type"] }) {
  if (type === "distance") return <RadiusSettingOutlined />;
  if (type === "range-rings") return <AimOutlined />;
  return <FontSizeOutlined />;
}

interface Props {
  drawing: Drawing;
  index: number;
}

export default function DrawingItem({ drawing, index }: Props) {
  const {
    state,
    setSelected,
    toggleVisible,
    deleteDrawing,
    renameDrawing,
    updateDrawing,
    reorder,
  } = useDrawingStore();
  const isSelected = state.selectedId === drawing.id;
  const isText = drawing.type === "text";

  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [hovered, setHovered] = useState(false);
  const dragRef = useRef<number | null>(null);

  function openEdit(e: React.MouseEvent) {
    e.stopPropagation();
    setEditValue(isText ? (drawing as TextDrawing).text : drawing.name);
    setEditOpen(true);
  }

  function confirmEdit() {
    if (isText) {
      updateDrawing(drawing.id, {
        text: editValue || "Label",
      } as Partial<TextDrawing>);
    } else {
      renameDrawing(drawing.id, editValue || drawing.name);
    }
    setEditOpen(false);
  }

  function handleDragStart(e: React.DragEvent) {
    dragRef.current = index;
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (dragRef.current !== null && dragRef.current !== index) {
      reorder(dragRef.current, index);
    }
    dragRef.current = null;
  }

  const displayText = isText ? (drawing as TextDrawing).text : drawing.name;

  return (
    <>
      <div
        className={`${styles.item} ${isSelected ? styles.itemSelected : ""}`}
        style={isSelected ? { borderColor: drawing.style.color } : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => setSelected(drawing.id)}
      >
        <span className={styles.dragHandle}>
          <HolderOutlined
            style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}
          />
        </span>

        <span
          className={styles.colorDot}
          style={{ background: drawing.style.color }}
        />

        <span
          className={styles.itemIcon}
          style={{ color: drawing.style.color }}
        >
          <DrawingIcon type={drawing.type} />
        </span>

        <span className={styles.itemName} title={displayText}>
          {displayText}
        </span>

        {(hovered || isSelected) && (
          <div
            className={styles.itemActions}
            onClick={(e) => e.stopPropagation()}
          >
            <Tooltip title={isText ? "Edit Label" : "Rename"}>
              <button className={styles.actionBtn} onClick={openEdit}>
                <EditOutlined />
              </button>
            </Tooltip>
            <Tooltip title={drawing.visible ? "Hide" : "Show"}>
              <button
                className={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisible(drawing.id);
                }}
              >
                {drawing.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </button>
            </Tooltip>
            <Tooltip title="Delete">
              <button
                className={`${styles.actionBtn} ${styles.deleteBtnItem}`}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDrawing(drawing.id);
                }}
              >
                <DeleteOutlined />
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      <Modal
        title={isText ? "Edit Label" : "Rename"}
        open={editOpen}
        onOk={confirmEdit}
        onCancel={() => setEditOpen(false)}
        okText="Save"
        okButtonProps={{
          style: { background: "#d97706", borderColor: "#d97706" },
        }}
        width={320}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: 4 }}>
          <div style={{ color: "#aaa", fontSize: 12, marginBottom: 6 }}>
            {isText ? "LABEL TEXT" : "NAME"}
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
