import React from "react";
import { Button, Card, Space, theme } from "antd";
import type { ReactNode } from "react";
import WidgetHeader from "./WidgetHeader";
import { ArrowsAltOutlined, CloseOutlined } from "@ant-design/icons";

interface WidgetCardProps {
  widgetId: string;
  title: string;
  timestamp?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widgetId,
  title,
  timestamp,
  actions,
  children,
  className = "",
  noPadding = false,
}) => {
  const { token } = theme.useToken();
  return (
    <Card
      size="small"
      className={`widget-card h-full flex flex-col ${className}`}
      styles={{
        body: {
          padding: noPadding ? 0 : "10px",
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 37px)",
        },
        header: { borderBottomColor: `${token.colorBorder}40` },
      }}
      title={
        <WidgetHeader
          widgetId={widgetId}
          title={title}
          timestamp={timestamp}
          actions={actions}
        />
      }
      extra={
        <Space size={6}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            size="small"
            type="text"
            icon={<ArrowsAltOutlined style={{ color: "#555", fontSize: 13 }} />}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            size="small"
            type="text"
            icon={<CloseOutlined style={{ color: "#555", fontSize: 13 }} />}
          />
        </Space>
      }
    >
      {children}
    </Card>
  );
};

export default WidgetCard;
