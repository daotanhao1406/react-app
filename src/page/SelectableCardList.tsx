import { useState } from "react";
import { List, Button, Modal, message, Space, Typography } from "antd";
import {
  DeleteOutlined,
  SelectOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import RelationalPolicyCard from "../components/RelationalPolicyCard";

interface Policy {
  id: string;
  title: string;
  date: string;
  user: string;
  role: string;
  description: string;
  ipRange: string;
  validRange: string;
  timeRange: string;
}

interface SelectableCardListProps {
  policies: Policy[];
  onDeletePolicies: (ids: string[]) => void;
  isDarkMode?: boolean;
}

export default function SelectableCardList({
  policies,
  onDeletePolicies,
  isDarkMode = false,
}: SelectableCardListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const hasSelected = selectedItems.length > 0;

  const handleSelect = (id: string, selected: boolean) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }

    if (selected) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === policies.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(policies.map((policy) => policy.id));
    }
  };

  const handleCancelSelection = () => {
    setSelectedItems([]);
    setSelectionMode(false);
  };

  const handleDeleteSelected = () => {
    Modal.confirm({
      title: "Are you sure you want to delete these items?",
      content: `You are about to delete ${selectedItems.length} selected item(s). This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        onDeletePolicies(selectedItems);
        message.success(`Successfully deleted ${selectedItems.length} item(s)`);
        setSelectedItems([]);
        setSelectionMode(false);
      },
    });
  };

  return (
    <div className="relative">
      {/* Selection toolbar (appears when in selection mode) */}
      {selectionMode && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 py-3 px-4 shadow-lg border-t ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
          style={{
            transform: hasSelected ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Typography.Text strong>
                {selectedItems.length}{" "}
                {selectedItems.length === 1 ? "item" : "items"} selected
              </Typography.Text>
              <Button
                type="text"
                icon={<SelectOutlined />}
                onClick={handleSelectAll}
              >
                {selectedItems.length === policies.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            <Space>
              <Button onClick={handleCancelSelection} icon={<CloseOutlined />}>
                Cancel
              </Button>
              <Button
                danger
                type="primary"
                icon={<DeleteOutlined />}
                onClick={handleDeleteSelected}
                disabled={!hasSelected}
              >
                Delete Selected
              </Button>
            </Space>
          </div>
        </div>
      )}

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={policies}
        renderItem={(policy) => (
          <List.Item>
            <RelationalPolicyCard
              {...policy}
              selected={selectedItems.includes(policy.id)}
              onSelect={handleSelect}
              isDarkMode={isDarkMode}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
