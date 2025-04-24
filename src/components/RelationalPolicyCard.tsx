import { Button, Card, Tag, Typography } from "antd";
import {
  AlignLeftOutlined,
  CalendarOutlined,
  CrownOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function RelationalPolicyCard() {
  return (
    <Card
      style={{
        width: 400,
        borderLeft: "3.5px solid #2b9056",
      }}
      bodyStyle={{ padding: "8px 16px" }}
      headStyle={{ backgroundColor: "#f6f8fa", padding: "8px 16px" }}
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
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <>General Admission</>
                <Tag bordered={false} color="green-inverse">
                  user_role
                </Tag>
              </div>
              <div style={{ fontSize: 12 }}>
                <CalendarOutlined /> 22/12/2022 18:38
              </div>
            </div>
          </div>
          <Button icon={<EllipsisOutlined />}></Button>
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
              urikoo@cas
            </Typography.Title>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text style={{ fontSize: 13 }} strong type="secondary">
              <CrownOutlined style={{ marginRight: 4 }} />
              Role
            </Typography.Text>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Payment Leader
            </Typography.Title>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography.Text style={{ fontSize: 13 }} strong type="secondary">
            <AlignLeftOutlined /> Description
          </Typography.Text>
          <Typography.Title ellipsis level={5} style={{ margin: 0 }}>
            Lorem imsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore
          </Typography.Title>
        </div>
      </div>

      <div
        style={{
          padding: "8px 0",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <div>IP Range</div>
        <div>172.168.23.1/24</div>
      </div>
      <div
        style={{
          padding: "8px 0",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <div>Valid Range</div>
        <div>24/12 - 31/12</div>
      </div>
      <div
        style={{
          padding: "8px 0",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <div>Time Range</div>
        <div>Mo,Tu,Th,Fr 12:00 - 18:00</div>
      </div>
    </Card>
  );
}
