import React from "react";
import { HolderOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import { Typography } from "antd";

interface WidgetHeaderProps {
  widgetId: string;
  title: string;
  timestamp?: string;
  actions?: ReactNode;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  widgetId,
  title,
  timestamp,
  actions,
}) => {
  return (
    <div
      className="widget-drag-handle flex items-center justify-between w-full py-3 pr-2"
      style={{ gap: 6 }}
      data-drag-handle={widgetId}
    >
      <div className="flex items-center gap-2 min-w-0">
        <HolderOutlined style={{ color: "#444", fontSize: 10 }} />
        <Typography.Text
          type="secondary"
          style={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            fontFamily: "JetBrainsMono, sans-serif",
            fontSize: 9,
          }}
        >
          {title}
        </Typography.Text>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {timestamp && (
          <span style={{ fontSize: 9, color: "#555", marginRight: 4 }}>
            {timestamp}
          </span>
        )}
        {actions}
      </div>
    </div>
  );
};

export default WidgetHeader;
