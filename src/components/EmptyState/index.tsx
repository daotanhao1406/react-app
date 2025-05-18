import React from "react";
import { Empty, Button } from "antd";
import "./styles.css";

type EmptyStateProps = {
  onCreateCategory: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateCategory }) => {
  return (
    <div className="empty-state-container">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span className="empty-description">No category selected</span>
        }
      />
      <p className="empty-message">
        Select a category from the tree view or create a new one
      </p>
      <Button
        type="primary"
        onClick={onCreateCategory}
        className="create-button"
      >
        Create Root Category
      </Button>
    </div>
  );
};

export default EmptyState;
