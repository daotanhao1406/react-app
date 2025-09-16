import { useRef } from "react";
import { Card, Select, Button, Space, Typography, Tooltip, Badge } from "antd";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { MonacoEditor, type MonacoEditorRef } from "./monaco-editor";
import { STAGE_OPTIONS, STAGE_TEMPLATES } from "../data/stageTemplate";

const { Text } = Typography;

interface PipelineStageComponentProps {
  stage: any;
  index: number;
  onUpdate: (stageId: string, updates: Partial<any>) => void;
  onDelete: (stageId: string) => void;
  onAddAfter: (index: number) => void;
  dragHandleProps?: any;
}

export function PipelineStageComponent({
  stage,
  index,
  onUpdate,
  onDelete,
  onAddAfter,
  dragHandleProps,
}: PipelineStageComponentProps) {
  const editorRef = useRef<MonacoEditorRef>(null);

  const handleStageTypeChange = (value: string) => {
    const template =
      STAGE_TEMPLATES[value as keyof typeof STAGE_TEMPLATES] || "{}";
    onUpdate(stage.id, {
      type: value,
      code: template,
    });
  };

  const handleCodeChange = (code: string) => {
    onUpdate(stage.id, { code });
  };

  return (
    <Card
      style={{
        marginBottom: "16px",
        border: "2px solid transparent",
        transition: "all 0.3s ease",
      }}
      className="hover:border-blue-500 hover:shadow-lg"
      data-testid={`stage-${stage.id}`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
        }}
      >
        <div
          {...dragHandleProps}
          style={{
            cursor: "grab",
            color: "#999",
            padding: "4px",
          }}
          className="hover:text-blue-500"
          data-testid={`drag-handle-${stage.id}`}
        >
          <GripVertical size={16} />
        </div>

        <Badge
          count={index + 1}
          style={{
            backgroundColor: "#1890ff",
            color: "white",
          }}
        />

        <Select
          value={stage.type || undefined}
          onChange={handleStageTypeChange}
          placeholder="Select stage type"
          style={{ flex: 1, minWidth: "200px" }}
          data-testid={`stage-selector-${stage.id}`}
          optionRender={(option) => (
            <div>
              <div style={{ fontWeight: 600 }}>{option.data.label}</div>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {option.data.description}
              </Text>
            </div>
          )}
        >
          {STAGE_OPTIONS.map((option) => (
            <Select.Option
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{option.label}</div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {option.description}
                </Text>
              </div>
            </Select.Option>
          ))}
        </Select>

        <Space>
          <Tooltip title="Add stage after this one">
            <Button
              type="dashed"
              icon={<Plus size={14} />}
              size="small"
              onClick={() => onAddAfter(index)}
              style={{
                color: "#52c41a",
                borderColor: "#52c41a",
              }}
              data-testid={`add-stage-${stage.id}`}
            />
          </Tooltip>
          <Tooltip title="Delete this stage">
            <Button
              danger
              icon={<Trash2 size={14} />}
              size="small"
              onClick={() => onDelete(stage.id)}
              data-testid={`delete-stage-${stage.id}`}
            />
          </Tooltip>
        </Space>
      </div>

      <div style={{ padding: "16px" }}>
        <MonacoEditor
          ref={editorRef}
          value={stage.code}
          onChange={handleCodeChange}
          height={200}
          language="json"
          theme="vs"
        />
      </div>
    </Card>
  );
}
