// https://stackblitz.com/edit/sb1-ugxfn4jd?file=index.html
import React, { useState, useEffect } from "react";
import { Layout, Drawer, Alert, message, Button, Input } from "antd";
import CategoryTree from "../../components/CategoryTree";
import CategoryDetail from "../../components/CategoryDetail";
import CategoryForm from "../../components/CategoryForm";
import EmptyState from "../../components/EmptyState";
import { Category, CategoryFormData } from "../../types/category";
import "./styles.css";
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { categoryService } from "../../services/categoryService";

const { Header, Sider, Content } = Layout;

enum FormMode {
  NONE,
  CREATE,
  EDIT,
  ADD_CHILD,
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [formMode, setFormMode] = useState<FormMode>(FormMode.NONE);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [filteredTreeData, setFilteredTreeData] = useState<Category[]>([]);

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Filter categories when search text changes
  useEffect(() => {
    filterCategories();
  }, [searchText, categories]);

  const loadCategories = () => {
    const tree = categoryService.getAllAsTree();
    setCategories(tree);
    setFilteredTreeData(tree);
  };

  const filterCategories = () => {
    if (!searchText.trim()) {
      setFilteredTreeData(categories);
      return;
    }

    const searchLower = searchText.toLowerCase();

    // Helper function to search in a category and its children
    const searchInCategory = (category: Category): boolean => {
      if (
        category.name.toLowerCase().includes(searchLower) ||
        category.description?.toLowerCase().includes(searchLower)
      ) {
        return true;
      }

      if (category.children && category.children.length > 0) {
        return category.children.some((child) => searchInCategory(child));
      }

      return false;
    };

    // Filter root categories that match or have children that match
    const filtered = categories.filter((category) =>
      searchInCategory(category)
    );

    // Create a deep copy to avoid mutating the original data
    const deepCloneWithFilter = (categories: Category[]): Category[] => {
      return categories.map((category) => {
        const newCategory = { ...category };
        if (newCategory.children && newCategory.children.length > 0) {
          newCategory.children = deepCloneWithFilter(
            newCategory.children.filter((child) => searchInCategory(child))
          );
        }
        return newCategory;
      });
    };

    setFilteredTreeData(deepCloneWithFilter(filtered));
  };

  const handleTreeSelect = (selectedKeys: React.Key[], info: any) => {
    if (selectedKeys.length === 0) {
      setSelectedCategory(null);
      return;
    }

    const categoryId = selectedKeys[0].toString();
    const category = categoryService.getById(categoryId);

    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleCreateCategory = (values: CategoryFormData) => {
    try {
      const newCategory = categoryService.create(values);
      loadCategories();
      setFormMode(FormMode.NONE);
      messageApi.success(`Category "${newCategory.name}" created successfully`);
      setSelectedCategory(newCategory);
    } catch (error) {
      messageApi.error("Failed to create category");
      console.error(error);
    }
  };

  const handleUpdateCategory = (values: CategoryFormData) => {
    if (!selectedCategory) return;

    try {
      const updatedCategory = categoryService.update(
        selectedCategory.id,
        values
      );
      loadCategories();
      setFormMode(FormMode.NONE);

      if (updatedCategory) {
        messageApi.success(
          `Category "${updatedCategory.name}" updated successfully`
        );
        setSelectedCategory(updatedCategory);
      }
    } catch (error) {
      messageApi.error("Failed to update category");
      console.error(error);
    }
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    try {
      categoryService.delete(selectedCategory.id);
      loadCategories();
      setSelectedCategory(null);
      messageApi.success(
        `Category "${selectedCategory.name}" deleted successfully`
      );
    } catch (error) {
      messageApi.error("Failed to delete category");
      console.error(error);
    }
  };

  const getFormTitle = (): string => {
    switch (formMode) {
      case FormMode.CREATE:
        return "Create New Category";
      case FormMode.EDIT:
        return `Edit Category: ${selectedCategory?.name}`;
      case FormMode.ADD_CHILD:
        return `Add Child to: ${selectedCategory?.name}`;
      default:
        return "";
    }
  };

  return (
    <Layout className="category-management-layout">
      {contextHolder}

      <Header className="header">
        <div className="logo">
          <h1>Category Management</h1>
        </div>
        <div className="header-actions">
          <Button
            type="primary"
            icon={<PlusOutlined size={16} />}
            onClick={() => setFormMode(FormMode.CREATE)}
            className="add-button"
          >
            New Category
          </Button>
          <Button
            icon={<ReloadOutlined size={16} />}
            onClick={loadCategories}
            className="refresh-button"
          >
            Refresh
          </Button>
        </div>
      </Header>

      <Layout className="main-layout">
        <Sider width={320} className="site-sider">
          <div className="search-container">
            <Input
              prefix={<SearchOutlined size={16} className="search-icon" />}
              placeholder="Search categories..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              allowClear
              className="search-input"
            />
          </div>

          <CategoryTree
            categories={filteredTreeData}
            onSelect={handleTreeSelect}
            selectedCategory={selectedCategory?.id}
          />
        </Sider>

        <Content className="site-content">
          {selectedCategory ? (
            <CategoryDetail
              category={selectedCategory}
              onEdit={() => setFormMode(FormMode.EDIT)}
              onDelete={handleDeleteCategory}
              onAddChild={() => setFormMode(FormMode.ADD_CHILD)}
            />
          ) : (
            <EmptyState onCreateCategory={() => setFormMode(FormMode.CREATE)} />
          )}
        </Content>
      </Layout>

      <Drawer
        title={getFormTitle()}
        placement="right"
        width={480}
        onClose={() => setFormMode(FormMode.NONE)}
        open={formMode !== FormMode.NONE}
        className="form-drawer"
        destroyOnClose
      >
        {formMode === FormMode.CREATE && (
          <CategoryForm
            categories={categories}
            onSubmit={handleCreateCategory}
            onCancel={() => setFormMode(FormMode.NONE)}
            editMode={false}
          />
        )}

        {formMode === FormMode.EDIT && selectedCategory && (
          <CategoryForm
            initialValues={{
              name: selectedCategory.name,
              description: selectedCategory.description,
              parentId: selectedCategory.parentId,
            }}
            categories={categories}
            onSubmit={handleUpdateCategory}
            onCancel={() => setFormMode(FormMode.NONE)}
            editMode={true}
            currentCategoryId={selectedCategory.id}
          />
        )}

        {formMode === FormMode.ADD_CHILD && selectedCategory && (
          <CategoryForm
            initialValues={{
              parentId: selectedCategory.id,
            }}
            categories={categories}
            onSubmit={handleCreateCategory}
            onCancel={() => setFormMode(FormMode.NONE)}
            editMode={false}
          />
        )}
      </Drawer>
    </Layout>
  );
};

export default CategoryManagement;
