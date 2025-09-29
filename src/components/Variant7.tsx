import { Area, Bullet } from "@ant-design/charts";
import Icon, {
  CloudServerOutlined,
  GlobalOutlined,
  IdcardOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Card, Col, List, Row, Table, Tag, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

const getTypeColor = (type: string) => {
  switch (type) {
    case "server":
      return "#3012c7";
    case "domain":
      return "#f5a623";
    default:
      return "#1fc5a9";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "default";
  }
};

export default function Variant7() {
  const config = {
    data: [
      { symbol: "GOOG", date: "Jan 1 2000", price: 39.81 },
      { symbol: "GOOG", date: "Feb 1 2000", price: 36.35 },
      { symbol: "GOOG", date: "Mar 1 2000", price: 43.22 },
      { symbol: "GOOG", date: "Apr 1 2000", price: 28.37 },
    ],
    xField: (d) => new Date(d.date),
    yField: "price",
    shapeField: "smooth",
    style: {
      fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    height: 300,
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };
  return (
    <div className="pb-4 px-4 w-full">
      <Title style={{ marginTop: 8 }} level={4}>
        User Dashboard
      </Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={14}>
          <Card
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
            bodyStyle={{
              display: "flex",
              alignItems: "center",
              padding: "28px 28px",
            }}
          >
            <div className="flex flex-col gap-8 min-w-40">
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#3012c7"
                >
                  <CloudServerOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    23
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Servers
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#f5a623"
                >
                  <GlobalOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    12
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Domains
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#1fc5a9"
                >
                  <IdcardOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    4
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Toolkits
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#EB4B49"
                >
                  <TransactionOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    $1,2k
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Estimated Cost
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex-1 pl-12">
              <Title level={5}>Upcoming Expirations Services</Title>
              <List
                style={{ maxHeight: 280, overflowX: "auto" }}
                renderItem={(item, index) => {
                  const isWarning = item.daysLeft < 8;
                  const typeColor = getTypeColor(item.type);
                  return (
                    <List.Item key={index}>
                      <Row style={{ flex: 1 }}>
                        <Col span={10}>{item.name}</Col>
                        <Col span={5}>
                          <Text
                            className="flex items-center capitalize"
                            type={getStatusColor(item.status)}
                          >
                            {/* <Icon component={DotIcon} style={{ fontSize: 26 }} /> */}
                            {item.status}
                          </Text>
                        </Col>
                        <Col span={4}>
                          <Tag color={typeColor}>{item.type}</Tag>
                        </Col>
                        <Col span={3}>
                          <Text type={isWarning && "danger"}>
                            {item.daysLeft} days
                          </Text>
                        </Col>
                        <Col span={2}>
                          <Text>$20</Text>
                        </Col>
                      </Row>
                    </List.Item>
                  );
                }}
                dataSource={[
                  {
                    id: 1,
                    name: "Web Hosting - example.com",
                    expiryDate: "2025-10-05",
                    daysLeft: 2,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 2,
                    name: "Domain - mywebsite.net",
                    expiryDate: "2025-09-30",
                    daysLeft: 4,
                    type: "toolkit",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 3,
                    name: "12.2.3.196",
                    expiryDate: "2025-09-26",
                    daysLeft: 4,
                    type: "server",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 4,
                    name: "Web Hosting - example.com",
                    expiryDate: "2025-10-05",
                    daysLeft: 8,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "cancelled",
                  },
                  {
                    id: 5,
                    name: "12.2.3.196",
                    expiryDate: "2025-09-26",
                    daysLeft: 15,
                    type: "server",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 6,
                    name: "Domain - mywebsite.net",
                    expiryDate: "2025-09-30",
                    daysLeft: 30,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "cancelled",
                  },
                  {
                    id: 7,
                    name: "Web Hosting - example.com",
                    expiryDate: "2025-10-05",
                    daysLeft: 35,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                ]}
              />
            </div>
          </Card>
        </Col>
        <Col span={10}>
          <Card
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
            bodyStyle={{ padding: "12px 0" }}
          >
            <Title style={{ marginLeft: 24 }} level={5}>
              Servers Map
            </Title>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={10}>
          <Card
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
            bodyStyle={{
              display: "flex",
              alignItems: "center",
              padding: "28px 28px",
            }}
          >
            <div className="flex flex-col gap-8 min-w-40">
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#3012c7"
                >
                  <CloudServerOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    23
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Servers
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#f5a623"
                >
                  <GlobalOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    12
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Domains
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#1fc5a9"
                >
                  <IdcardOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    4
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Toolkits
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Tag
                  style={{
                    padding: 8,
                    marginRight: 16,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color="#EB4B49"
                >
                  <TransactionOutlined style={{ fontSize: 22 }} />
                </Tag>
                <div className="flex flex-col">
                  <Title style={{ margin: 0 }} level={3}>
                    $1,2k
                  </Title>
                  <Text strong type="secondary" style={{ fontSize: 13 }}>
                    Estimated Cost
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex-1 pl-12">
              <Title level={5}>Upcoming Expirations Services</Title>
              <List
                style={{ maxHeight: 280, overflowX: "auto" }}
                renderItem={(item, index) => {
                  const isWarning = item.daysLeft < 8;
                  const typeColor = getTypeColor(item.type);
                  return (
                    <List.Item key={index}>
                      <Row style={{ flex: 1 }}>
                        <Col span={10}>{item.name}</Col>
                        <Col span={5}>
                          <Text
                            className="flex items-center capitalize"
                            type={getStatusColor(item.status)}
                          >
                            {/* <Icon component={DotIcon} style={{ fontSize: 26 }} /> */}
                            {item.status}
                          </Text>
                        </Col>
                        <Col span={4}>
                          <Tag color={typeColor}>{item.type}</Tag>
                        </Col>
                        <Col span={3}>
                          <Text type={isWarning && "danger"}>
                            {item.daysLeft} days
                          </Text>
                        </Col>
                        <Col span={2}>
                          <Text>$20</Text>
                        </Col>
                      </Row>
                    </List.Item>
                  );
                }}
                dataSource={[
                  {
                    id: 1,
                    name: "Web Hosting - example.com",
                    expiryDate: "2025-10-05",
                    daysLeft: 2,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 2,
                    name: "Domain - mywebsite.net",
                    expiryDate: "2025-09-30",
                    daysLeft: 4,
                    type: "toolkit",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 3,
                    name: "12.2.3.196",
                    expiryDate: "2025-09-26",
                    daysLeft: 4,
                    type: "server",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 4,
                    name: "Web Hosting - example.com",
                    expiryDate: "2025-10-05",
                    daysLeft: 8,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "cancelled",
                  },
                  {
                    id: 5,
                    name: "12.2.3.196",
                    expiryDate: "2025-09-26",
                    daysLeft: 15,
                    type: "server",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                  {
                    id: 6,
                    name: "Domain - mywebsite.net",
                    expiryDate: "2025-09-30",
                    daysLeft: 30,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "cancelled",
                  },
                  {
                    id: 7,
                    name: "Web Hosting - example.com",
                    expiryDate: "2025-10-05",
                    daysLeft: 35,
                    type: "domain",
                    user: "abc@gmail.com",
                    status: "available",
                  },
                ]}
              />
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Title level={5}>Services Type</Title>
          </Card>
        </Col>
        <Col span={5}>
          <Card
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Title level={5}>Tickets Management</Title>
            <Title style={{ margin: 0 }} level={2}>
              100
            </Title>
            {/* <Bullet
              data={[
                {
                  section: [10, 40, 70, 100],
                },
              ]}
              color={{ section: ["#EB4B49", "#52c41a", "#FFAd14", "#99a1af"] }}
              rangeField={"section"}
              xField={""}
              label={null}
              height={100}
              //   legend={false}
              annotations={[]}
            /> */}
            <div className="flex gap-1 py-3">
              {[
                { type: "open", count: 45, color: "#99a1af" },
                { type: "progress", count: 12, color: "#ffad14" },
                { type: "done", count: 37, color: "#52c41a" },
                { type: "closed", count: 6, color: "#ff4d4f" },
              ].map((item, index) => (
                <div
                  style={{
                    width: `calc(100% * ${item.count / 100})`,
                    backgroundColor: item.color,
                  }}
                  className=" h-1.5 mb-1 rounded-xl"
                />
              ))}
            </div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <div className="w-8 h-1 mb-1 rounded-xl bg-gray-400" />
                  <Title style={{ marginBottom: 4 }} level={5}>
                    Open
                  </Title>
                  <div className="flex items-end">
                    <Title style={{ margin: 0, marginRight: 6 }} level={4}>
                      45
                    </Title>
                    <Text type="secondary" style={{ fontSize: 15 }} strong>
                      tickets
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <div className="w-8 h-1 mb-1 rounded-xl bg-[#FFAd14]" />
                  <Title style={{ marginBottom: 4 }} level={5}>
                    In Progress
                  </Title>
                  <div className="flex items-end">
                    <Title style={{ margin: 0, marginRight: 6 }} level={4}>
                      12
                    </Title>
                    <Text type="secondary" style={{ fontSize: 15 }} strong>
                      tickets
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card>
                  <div className="w-8 h-1 mb-1 rounded-xl bg-[#52c41a]" />
                  <Title style={{ marginBottom: 4 }} level={5}>
                    Done
                  </Title>
                  <div className="flex items-end">
                    <Title style={{ margin: 0, marginRight: 6 }} level={4}>
                      37
                    </Title>
                    <Text type="secondary" style={{ fontSize: 15 }} strong>
                      tickets
                    </Text>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <div className="w-8 h-1 mb-1 rounded-xl bg-[#ff4d4f]" />
                  <Title style={{ marginBottom: 4 }} level={5}>
                    Closed
                  </Title>
                  <div className="flex items-end">
                    <Title style={{ margin: 0, marginRight: 6 }} level={4}>
                      6
                    </Title>
                    <Text type="secondary" style={{ fontSize: 15 }} strong>
                      tickets
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={5}>
          <Card
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
            bodyStyle={{ padding: "12px 0" }}
          >
            <Title style={{ marginLeft: 24 }} level={5}>
              Monthly Expenses
            </Title>
            <Area {...config} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
