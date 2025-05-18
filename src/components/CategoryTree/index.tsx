import React from 'react';
import { Tree, Tooltip } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { Category } from '../../types/category';
import { FolderIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
import './styles.css';

type CategoryTreeProps = {
  categories: Category[];
  onSelect: (selectedKeys: React.Key[], info: any) => void;
  selectedCategory?: string;
};

const convertToTreeData = (categories: Category[]): DataNode[] => {
  return categories.map(category => ({
    key: category.id,
    title: (
      <Tooltip title={category.description} placement="right">
        <span className="category-title">{category.name}</span>
      </Tooltip>
    ),
    icon: <FolderIcon size={16} className="category-icon" />,
    children: category.children ? convertToTreeData(category.children) : undefined,
  }));
};

const CategoryTree: React.FC<CategoryTreeProps> = ({ 
  categories, 
  onSelect,
  selectedCategory
}) => {
  const treeData = convertToTreeData(categories);

  const onTreeSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    onSelect(selectedKeys, info);
  };

  return (
    <div className="category-tree-container">
      <h2 className="tree-header">Category Hierarchy</h2>
      <Tree
        showIcon
        defaultExpandAll
        selectedKeys={selectedCategory ? [selectedCategory] : []}
        switcherIcon={({ expanded }) => 
          expanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />
        }
        onSelect={onTreeSelect}
        treeData={treeData}
        className="custom-category-tree"
      />
    </div>
  );
};

export default CategoryTree;