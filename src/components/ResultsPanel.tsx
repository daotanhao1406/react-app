import { useState, useMemo } from "react";
import { Card, List, Switch, Tag, Typography, Button, Collapse } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { MOCK_DATASETS } from "../data/mockData";
import { executePipeline } from "../data/pipelineEngine";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface ResultsPanelProps {
  pipeline: any;
  selectedDataset: any;
  showIntermediateResults?: boolean;
}

export default function ResultsPanel({
  pipeline,
  selectedDataset,
  showIntermediateResults = false,
}: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState("final");
  const [showStageResults, setShowStageResults] = useState(
    showIntermediateResults
  );

  // Execute pipeline on current dataset
  const execution = useMemo(() => {
    const dataset = MOCK_DATASETS[selectedDataset];
    return executePipeline(dataset, pipeline);
  }, [pipeline, selectedDataset]);

  const renderDataList = (data: any[], title: string) => {
    if (!data || data.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Text type="secondary">No data to display</Text>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "8px",
        }}
        data-testid={`list-${title.toLowerCase().replace(" ", "-")}`}
      >
        {data.map((item, index) => {
          const entries = Object.entries(item);

          return (
            <Card
              key={index}
              size="small"
              title={`Document ${index + 1}`}
              style={{
                minWidth: "300px",
                borderRadius: "8px",
                flexShrink: 0, // 👈 quan trọng: không co lại khi flex
              }}
              styles={{ body: { padding: "12px" } }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {entries.map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text strong style={{ fontSize: "12px" }} type="secondary">
                      {key}:
                    </Text>
                    <div
                      style={{ marginLeft: "8px", flex: 1, textAlign: "right" }}
                    >
                      {Array.isArray(value) ? (
                        <Tag>[{value.length} items]</Tag>
                      ) : typeof value === "object" && value !== null ? (
                        <Tag>Object</Tag>
                      ) : typeof value === "boolean" ? (
                        <Text type={value ? "success" : "danger"}>
                          {String(value)}
                        </Text>
                      ) : typeof value === "number" ? (
                        <span
                          style={{ fontFamily: "monospace", fontSize: "12px" }}
                        >
                          {value}
                        </span>
                      ) : (
                        <Text style={{ fontSize: "12px" }}>
                          {String(value)}
                        </Text>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderStageVisualization = () => {
    if (!showStageResults || execution.stages.length === 0) {
      return null;
    }

    return (
      <Collapse
        size="small"
        style={{ marginBottom: "16px" }}
        data-testid="collapse-stage-results"
      >
        {execution.stages.map((stageResult: any, index) => {
          const stageType = Object.keys(stageResult.stage)[0];
          const stageConfig = JSON.stringify(stageResult.stage, null, 2);

          return (
            <Panel
              header={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Tag>Stage {index + 1}</Tag>
                    <Tag>{stageType}</Tag>
                  </div>
                  {stageResult.error && <Text type="danger">Error</Text>}
                </div>
              }
              key={`stage-${index}`}
              data-testid={`panel-stage-${index}`}
            >
              {stageResult.error ? (
                <div style={{ padding: "16px", borderRadius: "6px" }}>
                  <Text type="danger">{stageResult.error}</Text>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  {renderDataList(
                    stageResult.result,
                    `Stage ${index + 1} Result`
                  )}
                </div>
              )}
            </Panel>
          );
        })}
      </Collapse>
    );
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Card
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              Pipeline Results
            </Title>
          </div>
        }
        size="small"
        style={{
          flex: 1,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            padding: "16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        }}
        data-testid="card-results-panel"
      >
        {!execution.isValid && execution.errors.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            {execution.errors.map((error, index) => (
              <div
                key={index}
                style={{
                  borderRadius: "6px",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              >
                <Text type="danger" style={{ fontSize: "12px" }}>
                  {error}
                </Text>
              </div>
            ))}
          </div>
        )}

        {renderStageVisualization()}

        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              Final Results
            </Title>
          </div>

          <div style={{ height: "100%", overflow: "auto", display: "flex" }}>
            {renderDataList(execution.finalResult, "Final Results")}
          </div>
        </div>
      </Card>
    </div>
  );
}
