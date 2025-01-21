import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AddWidgetCardProps {
  onClick: () => void;
}

const AddWidgetCard: React.FC<AddWidgetCardProps> = ({ onClick }) => {
  return (
    <Card
      className="h-full cursor-pointer hover:border-blue-400 transition-colors"
      onClick={onClick}
      bodyStyle={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <PlusOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
      <span style={{ color: '#1890ff', fontSize: '16px' }}>Add Widget</span>
    </Card>
  );
};

export default AddWidgetCard;