import React from 'react';
import { Card } from 'antd';
import { Widget } from '../types/widget';

interface WidgetCardProps {
  widget: Widget;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget }) => {
  return (
    <Card
      title={widget.title}
      bordered={true}
      className="h-full"
      bodyStyle={{ height: 'calc(100% - 45px)', overflow: 'auto' }}
    >
      {widget.content}
    </Card>
  );
};

export default WidgetCard;