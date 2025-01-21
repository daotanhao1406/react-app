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
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(widget);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(widget.id);
  };

  return (
    <Card
      title={widget.title}
      bordered={true}
      className="h-full"
      bodyStyle={{ height: 'calc(100% - 45px)', overflow: 'auto' }}
      extra={
        <Space onClick={e => e.stopPropagation()}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={handleEdit}
            onMouseDown={e => e.stopPropagation()}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            onMouseDown={e => e.stopPropagation()}
          />
        </Space>
      }
    >
      {widget.content}
    </Card>
  );
};

export default WidgetCard;