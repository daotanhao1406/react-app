import React, { useEffect, useMemo } from "react";
import { Form, Input, Select, Button, Space } from "antd";
import { Category, CategoryFormData } from "../../types/category";
import "./styles.css";

const { Option } = Select;
const { TextArea } = Input;

type CategoryFormProps = {
  initialValues?: Partial<CategoryFormData>;
  categories: Category[];
  onSubmit: (values: CategoryFormData) => void;
  onCancel: () => void;
  editMode: boolean;
  currentCategoryId?: string;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  categories,
  onSubmit,
  onCancel,
  editMode,
  currentCategoryId,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [form, initialValues]);

  const onFinish = (values: CategoryFormData) => {
    onSubmit(values);
  };

  // Filter out the current category and its children from parent options
  const getAvailableParents = useMemo(() => {
    if (!currentCategoryId) return categories;

    const isDescendant = (category: Category, ancestorId: string): boolean => {
      if (category.id === ancestorId) return true;
      if (!category.children) return false;
      return category.children.some((child) => isDescendant(child, ancestorId));
    };

    const flattenCategories = (cats: Category[]): Category[] => {
      return cats.reduce((acc: Category[], cat) => {
        return [
          ...acc,
          cat,
          ...(cat.children ? flattenCategories(cat.children) : []),
        ];
      }, []);
    };

    const allCategories = flattenCategories(categories);
    return allCategories.filter(
      (cat) =>
        cat.id !== currentCategoryId &&
        !(
          currentCategoryId &&
          isDescendant(
            { ...cat, children: cat.children || [] },
            currentCategoryId
          )
        )
    );
  }, [categories, currentCategoryId]);

  return (
    <div className="category-form-container">
      <h2 className="form-header">
        {editMode ? "Edit Category" : "Create New Category"}
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues || { parentId: null }}
        className="category-form"
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" maxLength={50} showCount />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea
            placeholder="Enter category description (optional)"
            rows={3}
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item name="parentId" label="Parent Category">
          <Select
            placeholder="Select parent category (optional)"
            allowClear
            className="parent-select"
          >
            {getAvailableParents?.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="form-actions">
          <Space>
            <Button type="primary" htmlType="submit">
              {editMode ? "Update" : "Create"}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
