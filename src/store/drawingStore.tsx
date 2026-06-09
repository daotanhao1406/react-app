import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import type { Drawing, ActiveTool, DrawingStyle } from "../types/drawing";

interface DrawingState {
  drawings: Drawing[];
  activeTool: ActiveTool;
  selectedId: string | null;
  managerOpen: boolean;
}

type DrawingAction =
  | { type: "ADD_DRAWING"; drawing: Drawing }
  | { type: "UPDATE_DRAWING"; id: string; updates: Partial<Drawing> }
  | { type: "DELETE_DRAWING"; id: string }
  | { type: "DELETE_ALL" }
  | { type: "TOGGLE_VISIBLE"; id: string }
  | { type: "RENAME_DRAWING"; id: string; name: string }
  | { type: "UPDATE_STYLE"; id: string; style: Partial<DrawingStyle> }
  | { type: "SET_ACTIVE_TOOL"; tool: ActiveTool }
  | { type: "SET_SELECTED"; id: string | null }
  | { type: "TOGGLE_MANAGER" }
  | { type: "REORDER"; fromIndex: number; toIndex: number };

const initialState: DrawingState = {
  drawings: [],
  activeTool: "select",
  selectedId: null,
  managerOpen: false,
};

function reducer(state: DrawingState, action: DrawingAction): DrawingState {
  switch (action.type) {
    case "ADD_DRAWING":
      return {
        ...state,
        drawings: [...state.drawings, action.drawing],
        selectedId: action.drawing.id,
      };
    case "UPDATE_DRAWING": {
      return {
        ...state,
        drawings: state.drawings.map((d) =>
          d.id === action.id ? ({ ...d, ...action.updates } as Drawing) : d,
        ),
      };
    }
    case "DELETE_DRAWING":
      return {
        ...state,
        drawings: state.drawings.filter((d) => d.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      };
    case "DELETE_ALL":
      return { ...state, drawings: [], selectedId: null };
    case "TOGGLE_VISIBLE":
      return {
        ...state,
        drawings: state.drawings.map((d) =>
          d.id === action.id ? { ...d, visible: !d.visible } : d,
        ),
      };
    case "RENAME_DRAWING":
      return {
        ...state,
        drawings: state.drawings.map((d) =>
          d.id === action.id ? { ...d, name: action.name } : d,
        ),
      };
    case "UPDATE_STYLE":
      return {
        ...state,
        drawings: state.drawings.map((d) =>
          d.id === action.id
            ? { ...d, style: { ...d.style, ...action.style } }
            : d,
        ),
      };
    case "SET_ACTIVE_TOOL":
      return { ...state, activeTool: action.tool, selectedId: null };
    case "SET_SELECTED":
      return { ...state, selectedId: action.id };
    case "TOGGLE_MANAGER":
      return { ...state, managerOpen: !state.managerOpen };
    case "REORDER": {
      const list = [...state.drawings];
      const [moved] = list.splice(action.fromIndex, 1);
      list.splice(action.toIndex, 0, moved);
      return { ...state, drawings: list };
    }
    default:
      return state;
  }
}

interface DrawingContextValue {
  state: DrawingState;
  addDrawing: (drawing: Drawing) => void;
  updateDrawing: (id: string, updates: Partial<Drawing>) => void;
  deleteDrawing: (id: string) => void;
  deleteAll: () => void;
  toggleVisible: (id: string) => void;
  renameDrawing: (id: string, name: string) => void;
  updateStyle: (id: string, style: Partial<DrawingStyle>) => void;
  setActiveTool: (tool: ActiveTool) => void;
  setSelected: (id: string | null) => void;
  toggleManager: () => void;
  reorder: (fromIndex: number, toIndex: number) => void;
}

const DrawingContext = createContext<DrawingContextValue | null>(null);

export function DrawingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addDrawing = useCallback(
    (drawing: Drawing) => dispatch({ type: "ADD_DRAWING", drawing }),
    [],
  );
  const updateDrawing = useCallback(
    (id: string, updates: Partial<Drawing>) =>
      dispatch({ type: "UPDATE_DRAWING", id, updates }),
    [],
  );
  const deleteDrawing = useCallback(
    (id: string) => dispatch({ type: "DELETE_DRAWING", id }),
    [],
  );
  const deleteAll = useCallback(() => dispatch({ type: "DELETE_ALL" }), []);
  const toggleVisible = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_VISIBLE", id }),
    [],
  );
  const renameDrawing = useCallback(
    (id: string, name: string) =>
      dispatch({ type: "RENAME_DRAWING", id, name }),
    [],
  );
  const updateStyle = useCallback(
    (id: string, style: Partial<DrawingStyle>) =>
      dispatch({ type: "UPDATE_STYLE", id, style }),
    [],
  );
  const setActiveTool = useCallback(
    (tool: ActiveTool) => dispatch({ type: "SET_ACTIVE_TOOL", tool }),
    [],
  );
  const setSelected = useCallback(
    (id: string | null) => dispatch({ type: "SET_SELECTED", id }),
    [],
  );
  const toggleManager = useCallback(
    () => dispatch({ type: "TOGGLE_MANAGER" }),
    [],
  );
  const reorder = useCallback(
    (fromIndex: number, toIndex: number) =>
      dispatch({ type: "REORDER", fromIndex, toIndex }),
    [],
  );

  return (
    <DrawingContext.Provider
      value={{
        state,
        addDrawing,
        updateDrawing,
        deleteDrawing,
        deleteAll,
        toggleVisible,
        renameDrawing,
        updateStyle,
        setActiveTool,
        setSelected,
        toggleManager,
        reorder,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
}

export function useDrawingStore() {
  const ctx = useContext(DrawingContext);
  if (!ctx)
    throw new Error("useDrawingStore must be used within DrawingProvider");
  return ctx;
}
