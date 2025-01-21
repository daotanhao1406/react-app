import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Widget } from '../types/widget';

interface WidgetCardProps {
  widget: Widget;
  onEdit: (widget: Widget) => void;
  onDelete: (widgetId: string) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onEdit, onDelete }) => {
  return (
    <Card
      title={widget.title}
      bordered={true}
      className="h-full"
      bodyStyle={{ height: 'calc(100% - 45px)', overflow: 'auto' }}
      extra={
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(widget);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(widget.id);
            }}
          />
        </Space>
      }
    >
      {widget.content}
    </Card>
  );
};

export default WidgetCard;