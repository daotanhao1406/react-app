import React from "react";
import {
  Typography,
  Space,
  Divider,
  Tag,
  Avatar,
  Card,
  Button,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EyeOutlined,
  LaptopOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  UsbOutlined,
  ThunderboltOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Category } from "../types/category";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;

interface CategoryHeaderProps {
  category: Category;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
  // Function to get the correct icon based on the icon name
  const getCategoryIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      laptop: <LaptopOutlined />,
      desktop: <DesktopOutlined />,
      mobile: <MobileOutlined />,
      tablet: <TabletOutlined />,
      usb: <UsbOutlined />,
      thunderbolt: <ThunderboltOutlined />,
    };

    return iconMap[iconName] || <LaptopOutlined />;
  };

  return (
    <Card
      className="category-header mb-6 overflow-hidden"
      bordered={false}
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderRadius: "8px",
      }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <Space direction="horizontal" size="middle" align="center">
          <Avatar
            size={64}
            className="flex items-center justify-center bg-blue-100 text-blue-600"
            icon={getCategoryIcon(category.icon)}
          />
          <div>
            <Title level={2} className="m-0 font-semibold">
              {category.name}
            </Title>
            {category.parentId && (
              <Tag color="blue" className="mt-1">
                Child Category
              </Tag>
            )}
          </div>
        </Space>
      </div>

      <Divider className="my-4" />

      <Paragraph
        className="text-gray-600"
        ellipsis={{ rows: 3, expandable: true, symbol: "Read more" }}
      >
        {category.description}
      </Paragraph>

      <Divider className="my-4" />

      <div className="flex flex-wrap gap-4 text-gray-600">
        <Space>
          <ClockCircleOutlined className="text-blue-500" />
          <Text>
            Created {dayjs(category.createdAt).format("MMMM D, YYYY")}
          </Text>
        </Space>
        <Space>
          <UserOutlined className="text-blue-500" />
          <Space>
            <Avatar src={category.createdBy.avatar} size="small" />
            <Text>{category.createdBy.name}</Text>
          </Space>
        </Space>
      </div>
    </Card>
  );
};

export default CategoryHeader;
