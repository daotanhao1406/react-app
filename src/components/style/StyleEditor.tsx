import { useState } from "react";
import { Popover, Button, Tooltip, Input } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { Drawing, DrawingStyle, TextDrawing } from "../../types/drawing";
import { useDrawingStore } from "../../store/drawingStore";
import styles from "./StyleEditor.module.css";

const PRESET_COLORS = [
  "#4d94ff",
  "#e34d4d",
  "#4dcc6e",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#ffffff",
];

const WEIGHTS = [1, 2, 3, 5, 8];
const LINE_STYLES = ["solid", "dashed", "dotted"] as const;

interface Props {
  drawing: Drawing;
}

function getTypeLabel(type: string) {
  if (type === "distance") return "DISTANCE";
  if (type === "range-rings") return "RANGE RINGS";
  if (type === "text") return "TEXT";
  return type.toUpperCase();
}

export default function StyleEditor({ drawing }: Props) {
  const {
    deleteDrawing,
    toggleVisible,
    updateStyle,
    updateDrawing,
    setSelected,
    renameDrawing,
  } = useDrawingStore();
  const [colorOpen, setColorOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [lineStyleOpen, setLineStyleOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const isText = drawing.type === "text";
  const currentLabel = isText ? (drawing as TextDrawing).text : drawing.name;
  const [editValue, setEditValue] = useState(currentLabel);

  const { style } = drawing;

  function applyColor(c: string) {
    updateStyle(drawing.id, { color: c });
    setColorOpen(false);
  }

  function applyWeight(w: number) {
    updateStyle(drawing.id, { weight: w });
    setWeightOpen(false);
  }

  function applyLineStyle(ls: DrawingStyle["lineStyle"]) {
    updateStyle(drawing.id, { lineStyle: ls });
    setLineStyleOpen(false);
  }

  function handleClose() {
    setSelected(null);
  }

  function handleEdit() {
    if (editing) {
      if (isText) {
        updateDrawing(drawing.id, {
          text: editValue || "Label",
        } as Partial<TextDrawing>);
      } else {
        renameDrawing(drawing.id, editValue || drawing.name);
      }
      setEditing(false);
    } else {
      setEditValue(isText ? (drawing as TextDrawing).text : drawing.name);
      setEditing(true);
    }
  }

  const colorPicker = (
    <div className={styles.colorGrid}>
      {PRESET_COLORS.map((c) => (
        <button
          key={c}
          className={`${styles.colorSwatch} ${style.color === c ? styles.colorSwatchActive : ""}`}
          style={{ background: c }}
          onClick={() => applyColor(c)}
        />
      ))}
      <input
        type="color"
        value={style.color}
        onChange={(e) => applyColor(e.target.value)}
        title="Custom color"
        className={styles.colorInput}
      />
    </div>
  );

  const weightPicker = (
    <div className={styles.weightList}>
      {WEIGHTS.map((w) => (
        <button
          key={w}
          className={`${styles.weightItem} ${style.weight === w ? styles.weightActive : ""}`}
          onClick={() => applyWeight(w)}
        >
          <span
            className={styles.weightLine}
            style={{ height: w, background: "#fff" }}
          />
          <span className={styles.weightLabel}>{w}px</span>
        </button>
      ))}
    </div>
  );

  const lineStylePicker = (
    <div className={styles.lineStyleList}>
      {LINE_STYLES.map((ls) => (
        <button
          key={ls}
          className={`${styles.lineStyleItem} ${style.lineStyle === ls ? styles.lineStyleActive : ""}`}
          onClick={() => applyLineStyle(ls)}
        >
          <span
            className={styles.lineStylePreview}
            style={{
              borderTopStyle:
                ls === "solid"
                  ? "solid"
                  : ls === "dashed"
                    ? "dashed"
                    : "dotted",
            }}
          />
          <span className={styles.lineStyleLabel}>
            {ls.charAt(0).toUpperCase() + ls.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.editor} style={{ borderColor: style.color }}>
      <div className={styles.left}>
        {editing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onPressEnter={handleEdit}
            onBlur={handleEdit}
            autoFocus
            size="small"
            className={styles.renameInput}
            style={{ width: 160 }}
          />
        ) : (
          <span className={styles.name}>
            {isText ? (drawing as TextDrawing).text : drawing.name}
          </span>
        )}
        <span className={styles.typeTag}>{getTypeLabel(drawing.type)}</span>
      </div>

      <div className={styles.controls}>
        <Popover
          content={colorPicker}
          open={colorOpen}
          onOpenChange={setColorOpen}
          trigger="click"
          overlayClassName={styles.popoverDark}
        >
          <Tooltip title="Color">
            <button
              className={styles.colorBtn}
              style={{ background: style.color }}
              onClick={() => setColorOpen(!colorOpen)}
            />
          </Tooltip>
        </Popover>

        <Popover
          content={weightPicker}
          open={weightOpen}
          onOpenChange={setWeightOpen}
          trigger="click"
          overlayClassName={styles.popoverDark}
        >
          <Tooltip title="Thickness">
            <button
              className={styles.iconBtn}
              onClick={() => setWeightOpen(!weightOpen)}
            >
              <span
                className={styles.weightIcon}
                style={{ height: style.weight, background: "#fff" }}
              />
            </button>
          </Tooltip>
        </Popover>

        <Popover
          content={lineStylePicker}
          open={lineStyleOpen}
          onOpenChange={setLineStyleOpen}
          trigger="click"
          overlayClassName={styles.popoverDark}
        >
          <Tooltip title="Line style">
            <button
              className={styles.iconBtn}
              onClick={() => setLineStyleOpen(!lineStyleOpen)}
            >
              <span
                className={styles.linePreviewSmall}
                style={{
                  borderTopStyle:
                    style.lineStyle === "solid"
                      ? "solid"
                      : style.lineStyle === "dashed"
                        ? "dashed"
                        : "dotted",
                }}
              />
            </button>
          </Tooltip>
        </Popover>

        <div className={styles.divider} />

        <Tooltip title={isText ? "Edit Label" : "Rename"}>
          <button className={styles.iconBtn} onClick={handleEdit}>
            <EditOutlined />
          </button>
        </Tooltip>

        <Tooltip title={drawing.visible ? "Hide" : "Show"}>
          <button
            className={styles.iconBtn}
            onClick={() => toggleVisible(drawing.id)}
          >
            {drawing.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </Tooltip>

        <Tooltip title="Delete">
          <button
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => {
              deleteDrawing(drawing.id);
            }}
          >
            <DeleteOutlined />
          </button>
        </Tooltip>

        <button
          className={`${styles.iconBtn} ${styles.closeBtn}`}
          onClick={handleClose}
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
}
