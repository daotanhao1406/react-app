import { Tooltip } from "antd";
import {
  SelectOutlined,
  RadiusSettingOutlined,
  AimOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import type { ActiveTool } from "../../types/drawing";
import { useDrawingStore } from "../../store/drawingStore";
import styles from "./DrawToolbar.module.css";

interface ToolItem {
  key: ActiveTool;
  icon: React.ReactNode;
  label: string;
}

const TOOLS: ToolItem[] = [
  { key: "select", icon: <SelectOutlined />, label: "Select / Pan" },
  {
    key: "distance",
    icon: <RadiusSettingOutlined />,
    label: "Distance Measure",
  },
  { key: "range-rings", icon: <AimOutlined />, label: "Range Rings" },
  { key: "text", icon: <FontSizeOutlined />, label: "Text Annotation" },
];

export default function DrawToolbar() {
  const { state, setActiveTool } = useDrawingStore();
  const { activeTool } = state;

  return (
    <div className={styles.toolbar}>
      {TOOLS.map((tool) => (
        <Tooltip key={tool.key} title={tool.label} placement="right">
          <button
            className={`${styles.toolBtn} ${activeTool === tool.key ? styles.active : ""}`}
            onClick={() => setActiveTool(tool.key)}
          >
            {tool.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
