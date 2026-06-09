import { lazy, Suspense } from "react";
import type { Drawing } from "../../types/drawing";

const DistanceDrawing = lazy(() => import("./DistanceDrawing"));
const RangeRingsDrawing = lazy(() => import("./RangeRingsDrawing"));
const TextDrawing = lazy(() => import("./TextDrawing"));

interface Props {
  drawings: Drawing[];
}

export default function DrawingLayer({ drawings }: Props) {
  return (
    <Suspense fallback={null}>
      {drawings.map((d) => {
        if (d.type === "distance") return <DistanceDrawing key={d.id} drawing={d} />;
        if (d.type === "range-rings") return <RangeRingsDrawing key={d.id} drawing={d} />;
        if (d.type === "text") return <TextDrawing key={d.id} drawing={d} />;
        return null;
      })}
    </Suspense>
  );
}
