export type DrawingType = "distance" | "range-rings" | "text";
export type LineStyle = "solid" | "dashed" | "dotted";

export interface DrawingStyle {
  color: string;
  weight: number;
  lineStyle: LineStyle;
  opacity: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface BaseDrawing {
  id: string;
  type: DrawingType;
  name: string;
  visible: boolean;
  style: DrawingStyle;
  createdAt: number;
}

export interface DistanceDrawing extends BaseDrawing {
  type: "distance";
  start: LatLng;
  end: LatLng;
}

export interface RangeRingsDrawing extends BaseDrawing {
  type: "range-rings";
  center: LatLng;
  radiusKm: number;
  rings: number;
}

export interface TextDrawing extends BaseDrawing {
  type: "text";
  position: LatLng;
  text: string;
  fontSize: number;
}

export type Drawing = DistanceDrawing | RangeRingsDrawing | TextDrawing;

export type ActiveTool = "select" | "distance" | "range-rings" | "text";
