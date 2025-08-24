import React, { useState } from "react";
import { Input, Button, Modal, Form } from "antd";
import {
  SearchOutlined,
  CloseOutlined,
  FileTextOutlined,
  MailOutlined,
  PictureOutlined,
  UserOutlined,
  PhoneOutlined,
  MessageOutlined,
  SmileOutlined,
  ShareAltOutlined,
  TwitterOutlined,
  FacebookOutlined,
  RightOutlined,
} from "@ant-design/icons";

interface EntityItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface EntityCategory {
  id: string;
  name: string;
  items: EntityItem[];
  isExpanded?: boolean;
}

interface EntityPaletteProps {
  onClose?: () => void;
  onEntitySelect?: (entityId: string) => void;
}

const EntityPalette: React.FC<EntityPaletteProps> = ({
  onClose,
  onEntitySelect,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["document", "person", "communication"])
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEntityType, setSelectedEntityType] = useState<string>("");
  const [form] = Form.useForm();

  const categories: EntityCategory[] = [
    {
      id: "document",
      name: "Document & Media",
      items: [
        {
          id: "document",
          name: "Document",
          description: "A document on the internet",
          icon: (
            <FileTextOutlined style={{ color: "#ffa940", fontSize: "20px" }} />
          ),
        },
        {
          id: "image",
          name: "Image",
          description: "A visual representation of something",
          icon: (
            <PictureOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
          ),
        },
      ],
    },
    {
      id: "person",
      name: "People & Identity",
      items: [
        {
          id: "person",
          name: "Person",
          description: "Entity representing a human",
          icon: <UserOutlined style={{ color: "#722ed1", fontSize: "20px" }} />,
        },
      ],
    },
    {
      id: "communication",
      name: "Communication",
      items: [
        {
          id: "email",
          name: "Email Address",
          description: "An email mailbox to which email message",
          icon: <MailOutlined style={{ color: "#52c41a", fontSize: "20px" }} />,
        },
        {
          id: "phone",
          name: "Phone Number",
          description: "A telephone number",
          icon: (
            <PhoneOutlined style={{ color: "#13c2c2", fontSize: "20px" }} />
          ),
        },
      ],
    },
    {
      id: "content",
      name: "Content & Text",
      items: [
        {
          id: "phrase",
          name: "Phrase",
          description: "Any text or part thereof",
          icon: (
            <MessageOutlined style={{ color: "#fadb14", fontSize: "20px" }} />
          ),
        },
      ],
    },
    {
      id: "social",
      name: "Social Networks",
      items: [
        {
          id: "social",
          name: "Social Network",
          description: "",
          icon: (
            <ShareAltOutlined style={{ color: "#eb2f96", fontSize: "20px" }} />
          ),
        },
        {
          id: "tweet",
          name: "Tweet",
          description: "Tweet entity",
          icon: (
            <TwitterOutlined style={{ color: "#1da1f2", fontSize: "20px" }} />
          ),
        },
        {
          id: "facebook",
          name: "Affiliation - Facebook",
          description: "Membership of Facebook",
          icon: (
            <FacebookOutlined style={{ color: "#1877f2", fontSize: "20px" }} />
          ),
        },
      ],
    },
  ];

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          category.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const handleEntityClick = (entityId: string) => {
    console.log("Entity selected:", entityId);
    setSelectedEntityType(entityId);
    setIsModalOpen(true);
    form.resetFields();
    if (onEntitySelect) {
      onEntitySelect(entityId);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEntityType("");
    form.resetFields();
  };

  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    console.log("Entity type:", selectedEntityType);
    // Handle form submission here
    handleModalClose();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getModalTitle = () => {
    const entityNames: { [key: string]: string } = {
      document: "Add Document",
      email: "Add Email Address",
      image: "Add Image",
      person: "Add Person",
      phone: "Add Phone Number",
      phrase: "Add Phrase",
      social: "Add Social Network",
      tweet: "Add Tweet",
      facebook: "Add Facebook Affiliation",
    };
    return entityNames[selectedEntityType] || "Add Entity";
  };

  const renderFormFields = () => {
    switch (selectedEntityType) {
      case "person":
        return (
          <>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="input name" />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input placeholder="input address" />
            </Form.Item>
            <Form.Item name="phone" label="Phone number">
              <Input placeholder="input phone number" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input placeholder="input email" />
            </Form.Item>
          </>
        );
      case "image":
        return (
          <>
            <Form.Item
              name="url"
              label="URL"
              rules={[{ required: true, message: "Please input URL!" }]}
            >
              <Input placeholder="input URL image" />
            </Form.Item>
            <Form.Item name="alt" label="Alt text">
              <Input placeholder="input summary of image" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="input description" rows={3} />
            </Form.Item>
          </>
        );
      case "document":
        return (
          <>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input placeholder="input title document" />
            </Form.Item>
            <Form.Item name="url" label="URL">
              <Input placeholder="input URL of document" />
            </Form.Item>
            <Form.Item name="type" label="Document type">
              <Input placeholder="PDF, DOC, TXT..." />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                placeholder="input description document"
                rows={3}
              />
            </Form.Item>
          </>
        );
      case "email":
        return (
          <>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Email is not valid!" },
              ]}
            >
              <Input placeholder="example@domain.com" />
            </Form.Item>
            <Form.Item name="displayName" label="Tên hiển thị">
              <Input placeholder="input tên hiển thị" />
            </Form.Item>
            <Form.Item name="category" label="Phân loại">
              <Input placeholder="Cá nhân, Công việc, Khác..." />
            </Form.Item>
          </>
        );
      case "phone":
        return (
          <>
            <Form.Item
              name="number"
              label="Phone number"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input placeholder="+84 xxx xxx xxx" />
            </Form.Item>
            <Form.Item name="type" label="Type">
              <Input placeholder="input phone number type..." />
            </Form.Item>
            <Form.Item name="owner" label="owner">
              <Input placeholder="input owner name" />
            </Form.Item>
          </>
        );
      case "phrase":
        return (
          <>
            <Form.Item
              name="text"
              label="Text"
              rules={[{ required: true, message: "Please input text!" }]}
            >
              <Input.TextArea placeholder="input phrase or quote" rows={4} />
            </Form.Item>
            <Form.Item name="language" label="Language">
              <Input placeholder="Tiếng Việt, English..." />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input placeholder="Slogan, Quote, Description..." />
            </Form.Item>
          </>
        );
      case "social":
        return (
          <>
            <Form.Item
              name="platform"
              label="Platform"
              rules={[
                { required: true, message: "Please input platform name!" },
              ]}
            >
              <Input placeholder="Facebook, Twitter, Instagram..." />
            </Form.Item>
            <Form.Item name="username" label="Username">
              <Input placeholder="@username" />
            </Form.Item>
            <Form.Item name="profileUrl" label="Profile URL">
              <Input placeholder="input URL profile" />
            </Form.Item>
          </>
        );
      case "tweet":
        return (
          <>
            <Form.Item
              name="content"
              label="Tweet content"
              rules={[{ required: true, message: "Please input content!" }]}
            >
              <Input.TextArea
                placeholder="input tweet content"
                rows={4}
                maxLength={280}
              />
            </Form.Item>
            <Form.Item name="author" label="Author">
              <Input placeholder="@username" />
            </Form.Item>
            <Form.Item name="hashtags" label="Hashtags">
              <Input placeholder="#hashtag1 #hashtag2" />
            </Form.Item>
          </>
        );
      case "facebook":
        return (
          <>
            <Form.Item
              name="profileName"
              label="Facebook profile"
              rules={[
                { required: true, message: "Please input profile name!" },
              ]}
            >
              <Input placeholder="input Facebook profile name" />
            </Form.Item>
            <Form.Item name="profileUrl" label="URL Profile">
              <Input placeholder="https://facebook.com/..." />
            </Form.Item>
            <Form.Item name="relationship" label="Relationship">
              <Input placeholder="Friends, Followers, Members..." />
            </Form.Item>
          </>
        );
      default:
        return (
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: "Please input value!" }]}
          >
            <Input placeholder="input value" />
          </Form.Item>
        );
    }
  };

  const containerStyle = {
    width: "320px",
    height: "100vh",
    backgroundColor: "#2c2c2c",
    border: "1px solid #404040",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const headerStyle = {
    padding: "12px 16px",
    backgroundColor: "#2c2c2c",
    borderBottom: "1px solid #404040",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle = {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    margin: 0,
  };

  const searchContainerStyle = {
    padding: "12px 16px",
    backgroundColor: "#2c2c2c",
    borderBottom: "1px solid #404040",
  };

  const contentStyle = {
    flex: 1,
    overflow: "auto",
    backgroundColor: "#2c2c2c",
  };

  const entityItemStyle = {
    padding: "12px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #404040",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "background-color 0.2s",
  };

  const entityContentStyle = {
    flex: 1,
    paddingLeft: 4,
  };

  const entityNameStyle = {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 400,
    margin: "0 0 4px 0",
  };

  const entityDescriptionStyle = {
    color: "#8c8c8c",
    fontSize: "12px",
    margin: 0,
    lineHeight: 1.4,
  };

  const runViewContainerStyle = {
    padding: "12px 16px",
    backgroundColor: "#2c2c2c",
    borderTop: "1px solid #404040",
  };

  const runViewTitleStyle = {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    margin: "0 0 12px 0",
  };

  const runViewContentStyle = {
    height: "80px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #404040",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const noInstancesStyle = {
    color: "#8c8c8c",
    fontSize: "12px",
  };

  const categoryHeaderStyle = {
    padding: "8px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #404040",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#333333",
    transition: "background-color 0.2s",
  };

  const categoryNameStyle = {
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 500,
    margin: 0,
  };

  const categoryIconStyle = {
    color: "#8c8c8c",
    fontSize: "12px",
    transition: "transform 0.2s",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h3 style={titleStyle}>Entity Palette</h3>
      </div>

      {/* Search */}
      <div style={searchContainerStyle}>
        <Input
          placeholder="Search:"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
        />
      </div>

      {/* Content */}
      <div style={contentStyle}>
        {filteredCategories.map((category) => (
          <div key={category.id}>
            {/* Category Header */}
            <div
              style={categoryHeaderStyle}
              onClick={() => toggleCategory(category.id)}
            >
              <div
                style={{
                  ...categoryIconStyle,
                  transform: expandedCategories.has(category.id)
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                <RightOutlined />
              </div>
              <div style={categoryNameStyle}>{category.name}</div>
            </div>

            {/* Category Items */}
            {expandedCategories.has(category.id) &&
              category.items.map((entity) => (
                <div
                  key={entity.id}
                  style={{ ...entityItemStyle, paddingLeft: "16px" }}
                  onClick={() => handleEntityClick(entity.id)}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "#3a3a3a";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  <div>{entity.icon}</div>
                  <div style={entityContentStyle}>
                    <div style={entityNameStyle}>{entity.name}</div>
                    {entity.description && (
                      <div style={entityDescriptionStyle}>
                        {entity.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Run View */}
      {/* <div style={runViewContainerStyle}>
        <h4 style={runViewTitleStyle}>Run View</h4>
        <div style={runViewContentStyle}>
          <span style={noInstancesStyle}>No instances</span>
        </div>
      </div> */}

      {/* Modal */}
      <Modal
        title={getModalTitle()}
        open={isModalOpen}
        onCancel={handleModalClose}
      >
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          {renderFormFields()}
        </Form>
      </Modal>
    </div>
  );
};

export default EntityPalette;
