import React, { useState } from "react";
import { Form, Radio, Select, Button, Space } from "antd";
export type RelationshipType =
  | "user_group"
  | "user_role"
  | "group_group"
  | "role_role";

export interface RelationshipFormValues {
  enabled: boolean;
  type: RelationshipType;
  userId?: string;
  groupId?: string;
  roleId?: string;
  sourceGroupId?: string;
  targetGroupId?: string;
  sourceRoleId?: string;
  targetRoleId?: string;
}

export interface FormField {
  name: keyof RelationshipFormValues;
  label: string;
  component: "UserSelector" | "GroupSelector" | "RoleSelector";
  placeholder?: string;
}

export interface RelationshipConfig {
  label: string;
  value: RelationshipType;
  fields: FormField[];
}
const RELATIONSHIP_CONFIGS: RelationshipConfig[] = [
  {
    label: "User to Group",
    value: "user_group",
    fields: [
      { name: "userId", label: "User", component: "UserSelector" },
      { name: "groupId", label: "Group", component: "GroupSelector" },
    ],
  },
  {
    label: "User to Role",
    value: "user_role",
    fields: [
      { name: "userId", label: "User", component: "UserSelector" },
      { name: "roleId", label: "Role", component: "RoleSelector" },
    ],
  },
  {
    label: "Group to Group",
    value: "group_group",
    fields: [
      {
        name: "sourceGroupId",
        label: "Source Group",
        component: "GroupSelector",
        placeholder: "Select source group",
      },
      {
        name: "targetGroupId",
        label: "Target Group",
        component: "GroupSelector",
        placeholder: "Select target group",
      },
    ],
  },
  {
    label: "Role to Role",
    value: "role_role",
    fields: [
      {
        name: "sourceRoleId",
        label: "Source Role",
        component: "RoleSelector",
        placeholder: "Select source role",
      },
      {
        name: "targetRoleId",
        label: "Target Role",
        component: "RoleSelector",
        placeholder: "Select target role",
      },
    ],
  },
];
const SELECTOR_COMPONENTS = {
  UserSelector: Select,
  GroupSelector: Select,
  RoleSelector: Select,
} as const;

const RelationshipForm: React.FC = () => {
  const [form] = Form.useForm<RelationshipFormValues>();
  const [formType, setFormType] = useState<RelationshipType | undefined>();

  const handleTypeChange = (type: RelationshipType | undefined) => {
    setFormType(type);

    // Reset all form fields except enabled and type
    const values = form.getFieldsValue();
    Object.keys(values).forEach((key) => {
      if (key !== "enabled" && key !== "type") {
        values[key as keyof RelationshipFormValues] = undefined;
      }
    });

    form.setFieldsValue(values);
  };

  const onFinish = (values: RelationshipFormValues) => {
    console.log("Received values:", values);
    // Process form submission here
  };

  const selectedConfig = RELATIONSHIP_CONFIGS.find(
    (config) => config.value === formType
  );

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", minWidth: 400 }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ enabled: true }}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item name="enabled" label="Enabled" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="type"
          label="Relationship Type"
          rules={[
            { required: true, message: "Please select a relationship type" },
          ]}
        >
          <Select
            allowClear
            onChange={handleTypeChange}
            options={RELATIONSHIP_CONFIGS}
          />
        </Form.Item>

        {selectedConfig?.fields.map((field) => {
          const SelectorComponent = SELECTOR_COMPONENTS[field.component];
          return (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={[
                {
                  required: true,
                  message: `Please select a ${field.label.toLowerCase()}`,
                },
              ]}
            >
              <SelectorComponent placeholder={field.placeholder} />
            </Form.Item>
          );
        })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Relationship
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default RelationshipForm;
