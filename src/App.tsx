import { lazy, Suspense } from "react";
import { DrawingProvider } from "./store/drawingStore";

const LeafletMap = lazy(() => import("./components/map/LeafletMap"));

export default function App() {
  return (
    <DrawingProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#111114",
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#111114",
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
              }}
            >
              Loading map…
            </div>
          }
        >
          <LeafletMap />
        </Suspense>
      </div>
    </DrawingProvider>
  );
}
