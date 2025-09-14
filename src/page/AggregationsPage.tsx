import { useState, useCallback } from "react";
import {
  Layout,
  Segmented,
  Select,
  Button,
  Space,
  Typography,
  Divider,
  message,
} from "antd";
import {
  PlusOutlined,
  PlayCircleOutlined,
  DatabaseOutlined,
  CodeOutlined,
  TableOutlined,
} from "@ant-design/icons";
import StageEditor from "../components/StageEditor";
import TextEditor from "../components/TextEditor";
import ResultsPanel from "../components/ResultsPanel";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type EditMode = "stages" | "text";

export default function AggregationsPage() {
  // Core state
  const [editMode, setEditMode] = useState<EditMode>("stages");
  const [selectedDataset, setSelectedDataset] = useState<any>("users");
  const [pipeline, setPipeline] = useState<any>([
    { $match: { department: "Engineering" } },
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 },
        avgSalary: { $avg: "$salary" },
      },
    },
  ]);
  const [expandedStages, setExpandedStages] = useState<Set<number>>(
    new Set([0])
  );

  // Pipeline management
  const handlePipelineChange = useCallback((newPipeline: any) => {
    setPipeline(newPipeline);
  }, []);

  const handleStageUpdate = useCallback(
    (index: number, stage: any) => {
      const newPipeline = [...pipeline];
      newPipeline[index] = stage;
      setPipeline(newPipeline);
    },
    [pipeline]
  );

  const handleStageDelete = useCallback(
    (index: number) => {
      const newPipeline = pipeline.filter((_, i) => i !== index);
      setPipeline(newPipeline);
      message.success(`Stage ${index + 1} deleted`);
    },
    [pipeline]
  );

  const handleAddStage = useCallback(() => {
    const newStage = { $match: {} };
    setPipeline([...pipeline, newStage]);
    const newIndex = pipeline.length;
    setExpandedStages((prev) => new Set([...Array.from(prev), newIndex]));
    message.success("New stage added");
  }, [pipeline]);

  const handleStageExpand = useCallback((index: number) => {
    setExpandedStages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handleDatasetChange = useCallback((dataset: any) => {
    setSelectedDataset(dataset);
    message.info(`Switched to ${dataset} dataset`);
  }, []);

  const handleExecutePipeline = useCallback(() => {
    message.loading({
      content: "Executing pipeline...",
      key: "execute",
      duration: 1,
    });
    setTimeout(() => {
      message.success({
        content: "Pipeline executed successfully!",
        key: "execute",
      });
    }, 1000);
  }, [pipeline]);

  const renderStagesMode = () => (
    <div style={{ padding: "16px", height: "100%", overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CodeOutlined />
          Pipeline Stages
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddStage}
          data-testid="button-add-stage"
        >
          Add Stage
        </Button>
      </div>

      {pipeline.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <CodeOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
          <Title level={4} type="secondary">
            No pipeline stages
          </Title>
          <Text type="secondary">
            Click "Add Stage" to start building your aggregation pipeline
          </Text>
          <br />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddStage}
            style={{ marginTop: "16px" }}
            data-testid="button-add-first-stage"
          >
            Add First Stage
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {pipeline.map((stage, index) => (
            <StageEditor
              key={`stage-${index}`}
              stage={stage}
              index={index}
              onUpdate={handleStageUpdate}
              onDelete={handleStageDelete}
              onExpand={handleStageExpand}
              isExpanded={expandedStages.has(index)}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderTextMode = () => (
    <div
      style={{
        padding: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title
        level={4}
        style={{
          margin: "0 0 16px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TableOutlined />
        Pipeline JSON
      </Title>
      <div style={{ flex: 1 }}>
        <TextEditor
          pipeline={pipeline}
          onPipelineChange={handlePipelineChange}
          height={600}
        />
      </div>
    </div>
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Title
            level={3}
            style={{
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <DatabaseOutlined />
            MongoDB Aggregations
          </Title>

          <Divider type="vertical" style={{ height: "32px" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Text strong>Dataset:</Text>
            <Select
              value={selectedDataset}
              onChange={handleDatasetChange}
              style={{ minWidth: "120px" }}
              options={[
                { value: "users", label: "Users Dataset" },
                { value: "products", label: "Products Dataset" },
              ]}
              data-testid="select-dataset"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Text strong>Mode:</Text>
            <Segmented
              value={editMode}
              onChange={(value) => {
                setEditMode(value as EditMode);
              }}
              options={[
                {
                  value: "stages",
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <CodeOutlined />
                      Stages
                    </div>
                  ),
                },
                {
                  value: "text",
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <TableOutlined />
                      Text
                    </div>
                  ),
                },
              ]}
              data-testid="segmented-edit-mode"
            />
          </div>
        </div>

        <Space>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {pipeline.length} stage{pipeline.length !== 1 ? "s" : ""}
          </Text>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleExecutePipeline}
            data-testid="button-execute-header"
          >
            Execute Pipeline
          </Button>
        </Space>
      </Header>

      <Content style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* Left Panel - Pipeline Editor */}
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {editMode === "stages" ? renderStagesMode() : renderTextMode()}
        </div>

        {/* Right Panel - Results */}
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          }}
        >
          <ResultsPanel
            pipeline={pipeline}
            selectedDataset={selectedDataset}
            showIntermediateResults={true}
          />
        </div>
      </Content>
    </Layout>
  );
}
