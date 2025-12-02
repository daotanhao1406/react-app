import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Dropdown,
  Flex,
  Input,
  Layout,
  Segmented,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  theme,
  ThemeConfig,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
const presets = [
  { status: "success", icon: <CheckCircleOutlined /> },
  { status: "processing", icon: <SyncOutlined spin /> },
  { status: "warning", icon: <ExclamationCircleOutlined /> },
  { status: "error", icon: <CloseCircleOutlined /> },
  { status: "default", icon: <ClockCircleOutlined /> },
];

const darkTheme: ThemeConfig = {
  token: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: 8,
    borderRadiusSM: 8,
    borderRadiusLG: 16,
    borderRadiusOuter: 14,
    controlHeight: 40,
    controlHeightSM: 32,
    controlHeightLG: 48,
    boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.05)",
    wireframe: false,
    colorPrimary: "#465fff",
    colorInfo: "#465fff",
    colorSuccess: "#12b76a",
    colorError: "#FB2C32",
    colorWarning: "#fdb022",
    colorTextBase: "#e8e9eb",
    colorText: "#e8e9eb",
    colorTextSecondary: "#98a2b3",
    colorTextDescription: "#98a2b3",
    colorBgBase: "#101828",
    colorBgContainer: "#171f2f",
    colorBgElevated: "#1a2231",
    colorBorder: "#344054",
    colorBorderSecondary: "#344054",
  },
  components: {
    Layout: {
      bodyBg: "#101828",
      footerBg: "#101828",
      headerBg: "#101828",
    },
    Button: {
      fontWeight: 600,
      contentFontSize: 15,
      defaultShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      primaryShadow: "0 4px 14px 0 rgba(0, 111, 238, 0.4)",
      colorBgContainer: "#1d2939",
      colorText: "#98a2b3",
    },
    Input: {
      activeShadow: "0 0 0 2px rgba(0, 111, 238, 0.2)",
      inputFontSize: 15,
      hoverBorderColor: "#465fff",
    },
    Select: {
      controlHeight: 40,
      controlItemBgActive: "#262d3c",
    },
    Card: {
      headerFontSize: 18,
      actionsLiMargin: "0",
    },
    // Table: {
    //   headerBg: "#101828",
    //   headerColor: "#71717A",
    //   rowHoverBg: "#F4F4F5",
    //   borderColor: "#E4E4E7",
    // },
    Tag: {
      defaultBg: "#1D2536",
      defaultColor: "#98a2b3",
      borderRadiusSM: 8,
    },
    Modal: {
      titleFontSize: 20,
    },
    Dropdown: {
      colorBgElevated: "#1a2231",
    },
    Segmented: {
      itemSelectedBg: "#1d2939",
      // itemSelectedShadow: "0 2px 10px rgba(0,0,0,0.1)",
      trackBg: "#101828",
      borderRadius: 12,
      controlHeight: 40,
    },
    Tabs: {
      titleFontSize: 15,
      // itemColor: "#71717A",
      itemSelectedColor: "#465fff",
      inkBarColor: "#465fff",
    },
    Transfer: {
      listHeight: 280,
      headerHeight: 44,
      itemHeight: 36,
      controlItemBgActive: "#101828",
    },
    Switch: {
      handleSize: 22,
      trackHeight: 26,
      trackMinWidth: 48,
    },
    Radio: {
      dotSize: 8,
      radioSize: 20,
      buttonSolidCheckedBg: "#465fff",
    },
    Checkbox: {
      borderRadiusSM: 5,
      algorithm: true,
    },
    Tooltip: {
      algorithm: true,
      controlHeight: 32,
      paddingSM: 14,
      paddingXS: 12,
    },
    Message: {
      borderRadiusLG: 8,
      boxShadow:
        "      0 6px 16px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    },
  },
  algorithm: theme.darkAlgorithm,
};
export default function App() {
  return (
    <ConfigProvider theme={darkTheme}>
      <Layout>
        <Layout.Header>123</Layout.Header>
        <Layout.Content
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 900,
            gap: 20,
            alignItems: "center",
            padding: 20,
          }}
        >
          <Tabs
            items={[
              {
                label: "tab1",
                key: "tab1",
                children: (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.antgroup.com"
                            >
                              1st menu item
                            </a>
                          ),
                        },
                        {
                          key: "2",
                          label: (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.aliyun.com"
                            >
                              2nd menu item (disabled)
                            </a>
                          ),
                          disabled: true,
                        },
                        {
                          key: "3",
                          label: (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.luohanacademy.com"
                            >
                              3rd menu item (disabled)
                            </a>
                          ),
                          disabled: true,
                        },
                        {
                          key: "4",
                          danger: true,
                          label: "a danger item",
                        },
                      ],
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Hover me
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                ),
              },
              {
                label: "tab2",
                key: "tab2",
              },
            ]}
          />
          <Descriptions title="User Info">
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          </Descriptions>
          <Flex>
            <Button type="primary">new button</Button>
            <Button>default button</Button>
          </Flex>

          <Checkbox onChange={console.log}>Checkbox</Checkbox>
          <DatePicker />
          <Input placeholder="Basic usage" />
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <Switch defaultChecked />
          <Flex gap="small" align="center" wrap>
            {presets.map(({ status, icon }) => (
              <Tag key={status} color={status} icon={icon}>
                {status}
              </Tag>
            ))}
          </Flex>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Segmented<string>
            options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
          <Table dataSource={dataSource} columns={columns} />
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
}
