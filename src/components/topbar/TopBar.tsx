import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDrawingStore } from "../../store/drawingStore";
import styles from "./TopBar.module.css";

export default function TopBar() {
  const { state, toggleManager } = useDrawingStore();
  const { drawings, managerOpen } = state;

  return (
    <div className={styles.bar}>
      <Button
        className={`${styles.drawBtn} ${managerOpen ? styles.drawBtnActive : ""}`}
        icon={<EditOutlined />}
        onClick={toggleManager}
        size="small"
      >
        Draw {drawings.length > 0 ? drawings.length : ""}
        <span className={styles.chevron}>{managerOpen ? "▲" : "▼"}</span>
      </Button>
    </div>
  );
}
