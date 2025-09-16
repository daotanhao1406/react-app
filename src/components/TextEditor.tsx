import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Card, Alert } from "antd";
import { validatePipeline } from "../data/pipelineEngine";

interface TextEditorProps {
  pipeline: any;
  onPipelineChange: (pipeline: any) => void;
  height?: number;
}

export default function TextEditor({
  pipeline,
  onPipelineChange,
  height = 400,
}: TextEditorProps) {
  const editorRef = useRef<any>(null);
  const currentValue = JSON.stringify(pipeline, null, 2);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    const validation = validatePipeline(value);
    if (validation.isValid && validation.pipeline) {
      onPipelineChange(validation.pipeline);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: "on",
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
    });
  };

  // Validate current JSON for display
  const validation = validatePipeline(currentValue);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {!validation.isValid && validation.error && (
        <Alert
          message="Invalid Pipeline JSON"
          description={validation.error}
          type="error"
          showIcon
          style={{ marginBottom: "8px", fontSize: "12px" }}
          data-testid="alert-json-error"
        />
      )}

      <Card
        size="small"
        style={{
          flex: 1,
          borderRadius: "8px",
        }}
        styles={{
          body: {
            padding: "8px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
        data-testid="card-text-editor"
      >
        <div style={{ flex: 1, minHeight: height - 80 }}>
          <Editor
            height="100%"
            language="json"
            value={currentValue}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
              fontFamily: "JetBrains Mono, Consolas, monospace",
              fontSize: 13,
              lineNumbers: "on",
              folding: true,
              matchBrackets: "always",
              autoIndent: "full",
              formatOnPaste: true,
              formatOnType: true,
              tabSize: 2,
              insertSpaces: true,
            }}
          />
        </div>
      </Card>
    </div>
  );
}
