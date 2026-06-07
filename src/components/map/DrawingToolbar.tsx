import { type DrawTool } from "../../hooks/useDrawing";

interface DrawingToolbarProps {
  activeTool: DrawTool;
  onToolChange: (tool: DrawTool) => void;
  onDeleteAll: () => void;
  onUndo: () => void;
}

interface ToolDef {
  id: DrawTool;
  label: string;
  icon: React.ReactNode;
}

const PointerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-2.617 1.234-4.366-8.88-6.391 5.444z" />
  </svg>
);

const PolygonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
  </svg>
);

const LineIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <circle cx="4" cy="20" r="2" fill="currentColor" stroke="none" />
    <circle cx="20" cy="4" r="2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <line x1="4" y1="20" x2="12" y2="12" />
    <line x1="12" y1="12" x2="20" y2="4" />
  </svg>
);

const RectIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="1" />
  </svg>
);

const CircleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const TextIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="12" y1="7" x2="12" y2="21" />
    <line x1="9" y1="21" x2="15" y2="21" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const UndoIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-5.16" />
  </svg>
);

const TOOLS: ToolDef[] = [
  { id: "pointer", label: "Select / Pan", icon: <PointerIcon /> },
  { id: "polygon", label: "Draw Polygon", icon: <PolygonIcon /> },
  { id: "polyline", label: "Draw Line", icon: <LineIcon /> },
  { id: "rectangle", label: "Draw Rectangle", icon: <RectIcon /> },
  { id: "circle", label: "Draw Circle", icon: <CircleIcon /> },
  { id: "text", label: "Add Text Label", icon: <TextIcon /> },
];

function DrawingToolbar({
  activeTool,
  onToolChange,
  onDeleteAll,
  onUndo,
}: DrawingToolbarProps) {
  return (
    <div className="draw-toolbar">
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          className={`draw-tool-btn ${activeTool === tool.id ? "draw-tool-btn-active" : ""}`}
          onClick={() => onToolChange(tool.id)}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}

      <div className="draw-toolbar-divider" />

      <button
        className="draw-tool-btn draw-tool-undo"
        onClick={onUndo}
        title="Undo last shape"
      >
        <UndoIcon />
      </button>

      <button
        className="draw-tool-btn draw-tool-delete"
        onClick={onDeleteAll}
        title="Delete all drawings"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export default DrawingToolbar;
