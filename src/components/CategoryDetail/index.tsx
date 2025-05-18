import React from "react";
import {
  Card,
  Descriptions,
  Button,
  Popconfirm,
  Space,
  Tag,
  Divider,
} from "antd";

import { Category } from "../../types/category";
import "./styles.css";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

type CategoryDetailProps = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  onAddChild: () => void;
};

const CategoryDetail: React.FC<CategoryDetailProps> = ({
  category,
  onEdit,
  onDelete,
  onAddChild,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="category-detail-container">
      <Card
        className="category-detail-card"
        title={
          <div className="category-title-container">
            <span className="category-name">{category.name}</span>
            <Tag color={getLevelColor(category.level)} className="level-tag">
              Level {category.level}
            </Tag>
          </div>
        }
        extra={
          <div className="category-actions">
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined size={16} />}
                onClick={onAddChild}
                className="add-child-btn"
              >
                Add Child
              </Button>
              <Button
                icon={<EditOutlined size={16} />}
                onClick={onEdit}
                className="edit-btn"
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete Category"
                description="Are you sure you want to delete this category? All child categories will also be deleted."
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
                placement="left"
                icon={<InfoCircleOutlined style={{ color: "#ff4d4f" }} />}
              >
                <Button
                  danger
                  icon={<DeleteOutlined size={16} />}
                  className="delete-btn"
                >
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </div>
        }
      >
        <Descriptions column={1} className="category-descriptions">
          <Descriptions.Item label="Description">
            {category.description || "No description provided"}
          </Descriptions.Item>

          <Descriptions.Item label="ID">
            <code className="category-id">{category.id}</code>
          </Descriptions.Item>

          <Descriptions.Item label="Parent">
            {category.parentId ? (
              <span className="parent-id">{category.parentId}</span>
            ) : (
              <Tag color="default">Root Category</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>

        <Divider className="timestamps-divider" />

        <div className="timestamps">
          <div className="timestamp">
            <span className="timestamp-label">Created:</span>
            <span className="timestamp-value">
              {formatDate(category.createdAt)}
            </span>
          </div>
          <div className="timestamp">
            <span className="timestamp-label">Updated:</span>
            <span className="timestamp-value">
              {formatDate(category.updatedAt)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Helper function to get color based on category level
const getLevelColor = (level: number): string => {
  const colors = ["#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6"];
  return colors[level % colors.length];
};

export default CategoryDetail;
