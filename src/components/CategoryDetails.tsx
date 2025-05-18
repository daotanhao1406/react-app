import React, { useState } from "react";
import { Breadcrumb, Layout, Spin } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import CategoryHeader from "./CategoryHeader";
import CategoryTree from "./CategoryTree";
import RelatedEntitiesList from "./RelatedEntitiesList";
import {
  categoryData,
  categoryTreeData,
  relatedEntities,
} from "../data/mockData";

const { Content } = Layout;

const CategoryDetails: React.FC = () => {
  const [loading] = useState(false);
  const [selectedCategory] = useState(categoryData);

  const handleTreeSelect = (selectedKeys: React.Key[], info: any) => {
    console.log("Selected:", selectedKeys, info);
    // In a real application, you would fetch the details of the selected category
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-6">
        {/* Category Header with basic information */}
        <CategoryHeader category={selectedCategory} />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <CategoryTree
              treeData={categoryTreeData}
              onSelect={handleTreeSelect}
            />
          </div>
          <div className="lg:col-span-2">
            <RelatedEntitiesList entities={relatedEntities} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CategoryDetails;
