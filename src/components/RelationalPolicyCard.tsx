import { Button, Card, Checkbox, Tag, Typography } from "antd";
import {
  AlignLeftOutlined,
  CalendarOutlined,
  CrownOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

interface RelationalPolicyCardProps {
  id: string;
  title: string;
  date: string;
  user: string;
  role: string;
  description: string;
  ipRange: string;
  validRange: string;
  timeRange: string;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  isDarkMode?: boolean;
}

export default function RelationalPolicyCard({
  id,
  title = "General Admission",
  date = "22/12/2022 18:38",
  user = "urikoo@cas",
  role = "Payment Leader",
  description = "Lorem imsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore",
  ipRange = "172.168.23.1/24",
  validRange = "24/12 - 31/12",
  timeRange = "Mo,Tu,Th,Fr 12:00 - 18:00",
  selected = false,
  onSelect,
  isDarkMode = false,
}: RelationalPolicyCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(id, !selected);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleSelect}
    >
      {/* Selection overlay for top, right and bottom borders */}
      <div
        className="absolute top-0 right-0 bottom-0 w-full transition-all duration-200 z-10"
        style={{
          backgroundColor: selected
            ? "rgba(24, 144, 255, 0.05)"
            : "transparent",
          // borderTopRightRadius: "8px",
          // borderBottomRightRadius: "8px",
          // borderTop: selected
          //   ? "2px solid #1890ff"
          //   : hovered
          //   ? `2px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`
          //   : "none",
          // borderRight: selected
          //   ? "2px solid #1890ff"
          //   : hovered
          //   ? `2px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`
          //   : "none",
          // borderBottom: selected
          //   ? "2px solid #1890ff"
          //   : hovered
          //   ? `2px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`
          //   : "none",
          borderRadius: "8px",
          border: selected
            ? "2px solid #1890ff"
            : hovered
            ? `2px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`
            : "none",
          pointerEvents: "none",
          // left: "3.5px", // Offset by the width of the green left border
        }}
      />

      {/* Checkbox for selection */}
      <div
        className="absolute top-3 left-3 z-20 transition-opacity duration-200"
        style={{
          opacity: selected ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <Checkbox checked={selected} />
      </div>

      <Card
        style={{
          width: 400,
          borderLeft: "3.5px solid #2b9056",
          transition: "all 0.3s ease",
          cursor: "pointer",
          backgroundColor: isDarkMode ? "#141414" : "#fff",
        }}
        bodyStyle={{ padding: "8px 16px" }}
        headStyle={{
          backgroundColor: isDarkMode ? "#1f1f1f" : "#f6f8fa",
          padding: "8px 16px",
          borderBottom: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
        }}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginLeft: selected ? 24 : 0,
                    transition: "margin-left 0.3s ease",
                  }}
                >
                  <>{title}</>
                  <Tag bordered={false} color="green-inverse">
                    user_role
                  </Tag>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    marginLeft: selected ? 24 : 0,
                    transition: "margin-left 0.3s ease",
                  }}
                >
                  <CalendarOutlined /> {date}
                </div>
              </div>
            </div>
            <Button
              icon={<EllipsisOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "12px 0 20px 0",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text style={{ fontSize: 13 }} strong type="secondary">
                <UserOutlined /> User
              </Typography.Text>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {user}
              </Typography.Title>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text style={{ fontSize: 13 }} strong type="secondary">
                <CrownOutlined style={{ marginRight: 4 }} />
                Role
              </Typography.Text>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {role}
              </Typography.Title>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "8px 0",
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${isDarkMode ? "#303030" : "#e8e8e8"}`,
          }}
        >
          <div>IP Range</div>
          <div>{ipRange}</div>
        </div>
        <div
          style={{
            padding: "8px 0",
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${isDarkMode ? "#303030" : "#e8e8e8"}`,
          }}
        >
          <div>Valid Range</div>
          <div>{validRange}</div>
        </div>
        <div
          style={{
            padding: "8px 0",
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${isDarkMode ? "#303030" : "#e8e8e8"}`,
          }}
        >
          <div>Time Range</div>
          <div>{timeRange}</div>
        </div>
      </Card>
    </div>
  );
}
