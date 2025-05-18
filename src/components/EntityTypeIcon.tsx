import React from 'react';
import { 
  FileTextOutlined, 
  FileImageOutlined, 
  PlaySquareOutlined, 
  ShoppingOutlined, 
  ToolOutlined, 
  QuestionOutlined 
} from '@ant-design/icons';
import { EntityType } from '../types/category';

interface EntityTypeIconProps {
  type: EntityType;
  size?: number;
}

const EntityTypeIcon: React.FC<EntityTypeIconProps> = ({ type, size = 16 }) => {
  const style = { fontSize: size };

  switch (type) {
    case EntityType.DOCUMENT:
      return <FileTextOutlined style={{ ...style, color: '#1677FF' }} />;
    case EntityType.IMAGE:
      return <FileImageOutlined style={{ ...style, color: '#52C41A' }} />;
    case EntityType.VIDEO:
      return <PlaySquareOutlined style={{ ...style, color: '#FA541C' }} />;
    case EntityType.PRODUCT:
      return <ShoppingOutlined style={{ ...style, color: '#722ED1' }} />;
    case EntityType.SERVICE:
      return <ToolOutlined style={{ ...style, color: '#13C2C2' }} />;
    case EntityType.OTHER:
    default:
      return <QuestionOutlined style={{ ...style, color: '#8C8C8C' }} />;
  }
};

export default EntityTypeIcon;