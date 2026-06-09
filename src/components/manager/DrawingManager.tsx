import { useState } from "react";
import { Button, Tooltip, Popconfirm } from "antd";
import {
  DeleteOutlined,
  AppstoreOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDrawingStore } from "../../store/drawingStore";
import DrawingItem from "./DrawingItem";
import styles from "./DrawingManager.module.css";

export default function DrawingManager() {
  const { state, toggleManager, deleteAll } = useDrawingStore();
  const { drawings, managerOpen } = state;

  if (!managerOpen) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <AppstoreOutlined
            style={{ color: "rgba(255,255,255,0.6)", marginRight: 6 }}
          />
          <span className={styles.sectionLabel}>DRAWING TOOLS</span>
        </div>
        <div className={styles.headerRight}>
          <span
            className={styles.badge}
            style={{
              background: "rgba(255,165,0,0.2)",
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.4)",
            }}
          >
            On Map
          </span>
          <button className={styles.closeBtn} onClick={toggleManager}>
            <CloseOutlined />
          </button>
        </div>
      </div>

      <div className={styles.subHeader}>
        <span className={styles.sectionLabel}>
          SAVED DRAWINGS ({drawings.length})
        </span>
        {drawings.length > 0 && (
          <Popconfirm
            title="Delete all drawings?"
            onConfirm={deleteAll}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <button className={styles.deleteAllBtn}>
              <DeleteOutlined style={{ marginRight: 4 }} />
              Delete All
            </button>
          </Popconfirm>
        )}
      </div>

      <div className={styles.list}>
        {drawings.length === 0 && (
          <div className={styles.empty}>
            No drawings yet. Use the toolbar to add drawings.
          </div>
        )}
        {drawings.map((d, i) => (
          <DrawingItem key={d.id} drawing={d} index={i} />
        ))}
      </div>
    </div>
  );
}
