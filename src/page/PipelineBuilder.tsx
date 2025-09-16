import { useState, useCallback, useEffect } from "react";
import { Layout, Button } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { PipelineStageComponent } from "../components/StageTemplate";
import { PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;

export default function PipelineBuilder() {
  const [stages, setStages] = useState<any[]>([
    {
      id: "1",
      type: "",
      code: "{}",
      order: 0,
    },
  ]);

  const addStage = useCallback(
    (afterIndex: number = stages.length - 1) => {
      const newStage = {
        id: Date.now().toString(),
        type: "",
        code: "{}",
        order: afterIndex + 1,
      };

      const newStages = [...stages];
      newStages.splice(afterIndex + 1, 0, newStage);

      // Update order for all stages
      const reorderedStages = newStages.map((stage, index) => ({
        ...stage,
        order: index,
      }));

      setStages(reorderedStages);
    },
    [stages]
  );

  const updateStage = useCallback((stageId: string, updates: Partial<any>) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId ? { ...stage, ...updates } : stage
      )
    );
  }, []);

  const deleteStage = useCallback(
    (stageId: string) => {
      if (stages.length > 1) {
        setStages((prevStages) => {
          const filteredStages = prevStages.filter(
            (stage) => stage.id !== stageId
          );
          // Update order for remaining stages
          return filteredStages.map((stage, index) => ({
            ...stage,
            order: index,
          }));
        });
      } else {
        toast({
          title: "Cannot delete",
          description: "Pipeline must have at least one stage",
          variant: "destructive",
        });
      }
    },
    [stages.length, toast]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const newStages = Array.from(stages);
      const [reorderedStage] = newStages.splice(result.source.index, 1);
      newStages.splice(result.destination.index, 0, reorderedStage);

      // Update order for all stages
      const reorderedStages = newStages.map((stage, index) => ({
        ...stage,
        order: index,
      }));

      setStages(reorderedStages);
    },
    [stages]
  );

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Content */}
      <Content>
        <div style={{ display: "flex", height: "calc(100vh - 70px)" }}>
          {/* Main Content */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="pipeline-stages">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    data-testid="stages-container"
                  >
                    {stages.map((stage, index) => (
                      <Draggable
                        key={stage.id}
                        draggableId={stage.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <PipelineStageComponent
                              stage={stage}
                              index={index}
                              onUpdate={updateStage}
                              onDelete={deleteStage}
                              onAddAfter={addStage}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Add Stage Area */}
            <div
              style={{
                border: "2px dashed #d9d9d9",
                borderRadius: "6px",
                padding: "24px",
                textAlign: "center",
                marginTop: "16px",
                transition: "all 0.3s ease",
                background: "#fafafa",
              }}
              className="hover:border-blue-500 hover:bg-green-50"
            >
              <Button
                type="dashed"
                icon={<PlusOutlined size={16} />}
                size="large"
                onClick={() => addStage()}
                style={{
                  height: "60px",
                  fontSize: "16px",
                  color: "#52c41a",
                  borderColor: "#52c41a",
                }}
                data-testid="add-new-stage-button"
              >
                Add New Stage
              </Button>
              <div
                style={{ marginTop: "8px", color: "#999", fontSize: "12px" }}
              >
                Click to add a new aggregation stage to your pipeline
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
