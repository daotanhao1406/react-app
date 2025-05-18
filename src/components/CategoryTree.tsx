import React, { useState } from 'react';
import { Tree, Input, Card, Typography } from 'antd';
import { DownOutlined, SearchOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const { Title } = Typography;

interface CategoryTreeProps {
  treeData: DataNode[];
  onSelect: (selectedKeys: React.Key[], info: any) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ treeData, onSelect }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['1']);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    
    if (value) {
      const expandedKeys = findExpandedKeys(treeData, value);
      setExpandedKeys(expandedKeys);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys(['1']);
      setAutoExpandParent(true);
    }
  };

  const findExpandedKeys = (data: DataNode[], value: string): React.Key[] => {
    const keys: React.Key[] = [];
    
    const findKeys = (data: DataNode[], parentKey?: React.Key) => {
      data.forEach(item => {
        if (typeof item.title === 'string' && item.title.toLowerCase().includes(value.toLowerCase())) {
          if (parentKey && !keys.includes(parentKey)) {
            keys.push(parentKey);
          }
          keys.push(item.key);
        }
        if (item.children && item.children.length > 0) {
          findKeys(item.children, item.key);
        }
      });
    };
    
    findKeys(data);
    return keys;
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    
    const index = text.toLowerCase().indexOf(search.toLowerCase());
    if (index === -1) return text;
    
    const beforeStr = text.substring(0, index);
    const matchStr = text.substring(index, index + search.length);
    const afterStr = text.substring(index + search.length);
    
    return (
      <span>
        {beforeStr}
        <span className="bg-yellow-200 font-semibold">{matchStr}</span>
        {afterStr}
      </span>
    );
  };

  const processTreeData = (data: DataNode[]): DataNode[] => {
    return data.map(item => {
      const title = typeof item.title === 'string' 
        ? highlightText(item.title, searchValue) 
        : item.title;
      
      const newItem = { ...item, title };
      
      if (item.children) {
        newItem.children = processTreeData(item.children);
      }
      
      return newItem;
    });
  };

  const treeDataWithHighlight = searchValue ? processTreeData(treeData) : treeData;

  return (
    <Card 
      title={<Title level={4} className="mb-0">Category Hierarchy</Title>}
      bordered={false}
      className="mb-6"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '8px' }}
    >
      <div className="space-y-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search categories"
          onChange={onChange}
          value={searchValue}
          allowClear
        />
        
        <div className="category-tree">
          <Tree
            showLine={{ showLeafIcon: false }}
            showIcon
            icon={({ expanded }) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />)}
            switcherIcon={<DownOutlined />}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={onSelect}
            treeData={treeDataWithHighlight}
            className="custom-tree"
          />
        </div>
      </div>
    </Card>
  );
};

export default CategoryTree;