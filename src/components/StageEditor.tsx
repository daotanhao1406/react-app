import { useState } from "react";
import {
  Card,
  Select,
  Input,
  Button,
  Space,
  Form,
  Row,
  Col,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  DragOutlined,
  ExpandAltOutlined,
  CompressOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface StageEditorProps {
  stage: any;
  index: number;
  onUpdate: (index: number, stage: any) => void;
  onDelete: (index: number) => void;
  onExpand?: (index: number) => void;
  isExpanded?: boolean;
}

const STAGE_TYPES = [
  { value: "$match", label: "Match", description: "Filter documents" },
  { value: "$group", label: "Group", description: "Group documents by field" },
  {
    value: "$project",
    label: "Project",
    description: "Include/exclude fields",
  },
  { value: "$sort", label: "Sort", description: "Sort documents" },
];

const MATCH_OPERATORS = [
  { value: "$eq", label: "Equal" },
  { value: "$ne", label: "Not Equal" },
  { value: "$gt", label: "Greater Than" },
  { value: "$gte", label: "Greater Than or Equal" },
  { value: "$lt", label: "Less Than" },
  { value: "$lte", label: "Less Than or Equal" },
  { value: "$in", label: "In Array" },
  { value: "$nin", label: "Not In Array" },
  { value: "$regex", label: "Regex Match" },
];

const GROUP_OPERATORS = [
  { value: "$sum", label: "Sum" },
  { value: "$avg", label: "Average" },
  { value: "$min", label: "Minimum" },
  { value: "$max", label: "Maximum" },
  { value: "$count", label: "Count" },
];

export default function StageEditor({
  stage,
  index,
  onUpdate,
  onDelete,
  onExpand,
  isExpanded = false,
}: StageEditorProps) {
  const [localStage, setLocalStage] = useState(stage);
  const [form] = Form.useForm();

  const getStageType = (): string => {
    if ("$match" in stage) return "$match";
    if ("$group" in stage) return "$group";
    if ("$project" in stage) return "$project";
    if ("$sort" in stage) return "$sort";
    return "$match";
  };

  const handleStageTypeChange = (newType: string) => {
    let newStage: any;

    switch (newType) {
      case "$match":
        newStage = { $match: {} };
        break;
      case "$group":
        newStage = { $group: { _id: null } };
        break;
      case "$project":
        newStage = { $project: {} };
        break;
      case "$sort":
        newStage = { $sort: {} };
        break;
      default:
        newStage = { $match: {} };
    }

    setLocalStage(newStage);
    onUpdate(index, newStage);
  };

  const updateStageContent = (newContent: any) => {
    const stageType = getStageType();
    const updatedStage = { [stageType]: newContent } as any;
    setLocalStage(updatedStage);
    onUpdate(index, updatedStage);
  };

  const renderMatchEditor = () => {
    const matchStage = "$match" in localStage ? localStage.$match : {};

    return (
      <div style={{ padding: "12px 0" }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Field">
                <Input
                  placeholder="field name"
                  onChange={(e) => {
                    const newMatch = { ...matchStage };
                    // Simple field update - in a real app this would be more sophisticated
                  }}
                  data-testid={`input-match-field-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Operator">
                <Select
                  defaultValue="$eq"
                  options={MATCH_OPERATORS}
                  onChange={() => {}}
                  data-testid={`select-match-operator-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Value">
                <Input
                  placeholder="value"
                  onChange={(e) => {
                    const field = "department"; // Demo field
                    const newMatch = { [field]: e.target.value };
                    updateStageContent(newMatch);
                  }}
                  data-testid={`input-match-value-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label=" ">
                <Button
                  onClick={() => {}}
                  data-testid={`button-add-match-${index}`}
                >
                  +
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  const renderGroupEditor = () => {
    return (
      <div style={{ padding: "12px 0" }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Group By Field">
                <Input
                  placeholder="$fieldName"
                  defaultValue="$department"
                  onChange={(e) => {
                    const newGroup = { _id: e.target.value };
                    updateStageContent(newGroup);
                  }}
                  data-testid={`input-group-field-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Accumulator">
                <Select
                  defaultValue="$sum"
                  options={GROUP_OPERATORS}
                  onChange={() => {}}
                  data-testid={`select-group-operator-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label=" ">
                <Button
                  onClick={() => {
                    const newGroup = {
                      _id: "$department",
                      count: { $sum: 1 },
                      avgSalary: { $avg: "$salary" },
                    };
                    updateStageContent(newGroup);
                  }}
                  data-testid={`button-add-group-${index}`}
                >
                  +
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  const renderProjectEditor = () => {
    return (
      <div style={{ padding: "12px 0" }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item label="Field">
                <Input
                  placeholder="field name"
                  onChange={() => {}}
                  data-testid={`input-project-field-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Include">
                <Switch
                  defaultChecked
                  onChange={(checked) => {
                    const projection = { name: 1, department: 1, salary: 1 };
                    updateStageContent(projection);
                  }}
                  data-testid={`switch-project-include-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Value/Expression">
                <Input
                  placeholder="1 or expression"
                  defaultValue="1"
                  data-testid={`input-project-value-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label=" ">
                <Button
                  onClick={() => {}}
                  data-testid={`button-add-project-${index}`}
                >
                  +
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  const renderSortEditor = () => {
    return (
      <div style={{ padding: "12px 0" }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Field">
                <Input
                  placeholder="field name"
                  defaultValue="salary"
                  onChange={() => {}}
                  data-testid={`input-sort-field-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Direction">
                <Select
                  defaultValue={1}
                  options={[
                    { value: 1, label: "Ascending (1)" },
                    { value: -1, label: "Descending (-1)" },
                  ]}
                  onChange={(value) => {
                    const sortSpec = { salary: value };
                    updateStageContent(sortSpec);
                  }}
                  data-testid={`select-sort-direction-${index}`}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label=" ">
                <Button
                  onClick={() => {}}
                  data-testid={`button-add-sort-${index}`}
                >
                  +
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  const renderStageContent = () => {
    const stageType = getStageType();

    switch (stageType) {
      case "$match":
        return renderMatchEditor();
      case "$group":
        return renderGroupEditor();
      case "$project":
        return renderProjectEditor();
      case "$sort":
        return renderSortEditor();
      default:
        return renderMatchEditor();
    }
  };

  const currentStageType = getStageType();
  const stageInfo = STAGE_TYPES.find((s) => s.value === currentStageType);

  return (
    <Card
      size="small"
      style={{
        marginBottom: "12px",
        borderRadius: "8px",
      }}
      styles={{ body: { padding: "12px" } }}
      data-testid={`card-stage-${index}`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <Space>
          <DragOutlined style={{ cursor: "grab" }} />
          <Tag>Stage {index + 1}</Tag>
          <Select
            value={currentStageType}
            style={{ minWidth: "120px" }}
            onChange={handleStageTypeChange}
            options={STAGE_TYPES}
            data-testid={`select-stage-type-${index}`}
          />
          {stageInfo && (
            <Tooltip title={stageInfo.description}>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {stageInfo.description}
              </Text>
            </Tooltip>
          )}
        </Space>

        <Space>
          <Button
            type="text"
            icon={isExpanded ? <CompressOutlined /> : <ExpandAltOutlined />}
            onClick={() => onExpand?.(index)}
            data-testid={`button-expand-stage-${index}`}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              onDelete(index);
            }}
            data-testid={`button-delete-stage-${index}`}
          />
        </Space>
      </div>

      {isExpanded && renderStageContent()}
    </Card>
  );
}
