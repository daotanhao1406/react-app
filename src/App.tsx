import React, { useState, useCallback } from "react";
import { MenuSegment } from "./components/RadialActionMenu/types";
import RadialActionMenuInline from "./components/RadialActionMenu";

export const defaultRadialMenuData = {
  segments: [
    { id: 1, isSelected: false, icon: "🎯" },
    { id: 2, isSelected: true, icon: "🗺️" }, // Top-left sector selected as shown in image
    { id: 3, isSelected: false, icon: "📊" },
    { id: 4, isSelected: false, icon: "⚙️" },
    { id: 5, isSelected: false, icon: "🔍" },
    { id: 6, isSelected: false, icon: "📍" },
    { id: 7, isSelected: false, icon: "🧭" },
    { id: 8, isSelected: false, icon: "📐" },
  ],
  actionButtons: [
    {
      id: "settings",
      icon: "fas fa-cog",
      position: "top" as const,
      variant: "primary" as const,
    },
    {
      id: "close",
      icon: "fas fa-times",
      position: "top-right" as const,
      variant: "danger" as const,
    },
    {
      id: "filter",
      icon: "fas fa-filter",
      position: "right" as const,
      variant: "teal" as const,
    },
    {
      id: "more",
      icon: "fas fa-chevron-up",
      position: "bottom-right" as const,
      variant: "gray" as const,
    },
    {
      id: "location",
      icon: "fas fa-map-marker-alt",
      position: "bottom" as const,
      variant: "cyan" as const,
    },
    {
      id: "navigate",
      icon: "fas fa-compass",
      position: "bottom-left" as const,
      variant: "cyan" as const,
    },
    {
      id: "map",
      icon: "fas fa-map",
      position: "left" as const,
      variant: "success" as const,
    },
    {
      id: "map-alt",
      icon: "fas fa-map",
      position: "top-left" as const,
      variant: "success" as const,
    },
  ],
  centerContent: {
    title: "Open map",
    actions: [
      {
        id: "apply",
        label: "Apply",
        icon: "fas fa-check",
        variant: "apply" as const,
      },
      {
        id: "back",
        label: "Back",
        icon: "fas fa-arrow-left",
        variant: "default" as const,
      },
    ],
  },
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [segments, setSegments] = useState<MenuSegment[]>(
    defaultRadialMenuData.segments
  );
  const [selectedSector, setSelectedSector] = useState<number>(2);

  const handleSegmentSelect = useCallback((segmentId: number) => {
    console.log("Segment selected:", segmentId);
    setSegments((prev) =>
      prev.map((segment) => ({
        ...segment,
        isSelected: segment.id === segmentId,
      }))
    );
    setSelectedSector(segmentId);
  }, []);

  const handleActionSelect = useCallback((actionId: string) => {
    console.log("Action selected:", actionId);
    // Handle specific actions
    if (actionId === "close") {
      setIsMenuOpen(false);
    }
  }, []);

  const handleCenterActionClick = useCallback(
    (actionId: string) => {
      console.log("Center action clicked:", actionId);
      if (actionId === "back") {
        setIsMenuOpen(false);
      } else if (actionId === "apply") {
        // Apply the current selection
        console.log("Applying selection for sector:", selectedSector);
      }
    },
    [selectedSector]
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={toggleMenu}
          data-testid="toggle-menu-button"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
        >
          {isMenuOpen ? "Hide Menu" : "Show Menu"}
        </button>
      </div>

      <RadialActionMenuInline
        isOpen={isMenuOpen}
        segments={segments}
        actionButtons={defaultRadialMenuData.actionButtons}
        centerContent={defaultRadialMenuData.centerContent}
        selectedSector={selectedSector}
        onSegmentSelect={handleSegmentSelect}
        onActionSelect={handleActionSelect}
        onCenterActionClick={handleCenterActionClick}
      />

      {!isMenuOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "14px",
          }}
        >
          <p>Radial Action Menu - React TypeScript Component</p>
          <p>Click "Show Menu" to view the interactive circular interface</p>
        </div>
      )}
    </div>
  );
};

export default App;
