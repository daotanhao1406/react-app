import React, { useState, useCallback, CSSProperties } from "react";
import { RadialActionMenuProps } from "./types";

const RadialActionMenuInline: React.FC<RadialActionMenuProps> = ({
  isOpen,
  segments,
  actionButtons,
  centerContent,
  selectedSector,
  onSegmentSelect,
  onActionSelect,
  onCenterActionClick,
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const handleSegmentClick = useCallback(
    (segmentId: number) => {
      onSegmentSelect(segmentId);
    },
    [onSegmentSelect]
  );

  const handleActionButtonClick = useCallback(
    (actionId: string) => {
      onActionSelect(actionId);
    },
    [onActionSelect]
  );

  const handleCenterActionClick = useCallback(
    (actionId: string) => {
      onCenterActionClick(actionId);
    },
    [onCenterActionClick]
  );

  const renderIcon = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      "fas fa-cog": "⚙️",
      "fas fa-times": "✕",
      "fas fa-filter": "🔍",
      "fas fa-chevron-up": "⌃",
      "fas fa-map-marker-alt": "📍",
      "fas fa-compass": "🧭",
      "fas fa-map": "🗺️",
      "fas fa-check": "✓",
      "fas fa-arrow-left": "←",
    };
    return iconMap[iconName] || iconName;
  };

  // Styles
  const containerStyle: CSSProperties = {
    position: "relative",
    width: "400px",
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const menuBaseStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(42, 42, 42, 0.8) 30%, rgba(26, 26, 26, 0.9) 70%)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 0 30px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.05)",
  };

  const getRingStyle = (ring: "inner" | "middle" | "outer"): CSSProperties => {
    const baseStyle: CSSProperties = {
      position: "absolute",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "50%",
      pointerEvents: "none",
    };

    switch (ring) {
      case "inner":
        return {
          ...baseStyle,
          top: "25%",
          left: "25%",
          width: "50%",
          height: "50%",
        };
      case "middle":
        return {
          ...baseStyle,
          top: "15%",
          left: "15%",
          width: "70%",
          height: "70%",
        };
      case "outer":
        return {
          ...baseStyle,
          top: "5%",
          left: "5%",
          width: "90%",
          height: "90%",
        };
    }
  };

  const getSegmentStyle = (
    index: number,
    isSelected: boolean
  ): CSSProperties => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    clipPath: "polygon(50% 50%, 50% 0%, 85.35% 14.65%, 50% 50%)",
    transition: "all 0.2s ease",
    cursor: "pointer",
    transform: `rotate(${index * 45}deg)`,
    background: isSelected
      ? "linear-gradient(45deg, rgba(255, 107, 157, 0.4), rgba(255, 107, 157, 0.2))"
      : "transparent",
    boxShadow: isSelected
      ? "0 0 20px rgba(255, 107, 157, 0.5), inset 0 0 15px rgba(255, 107, 157, 0.2)"
      : "none",
  });

  const getSegmentFillStyle = (
    index: number,
    isSelected: boolean
  ): CSSProperties => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 2,
    ...(isSelected && {
      background: `conic-gradient(from ${
        index * 45
      }deg, transparent 0deg, rgba(255, 107, 157, 0.4) 0deg, rgba(255, 107, 157, 0.4) 45deg, transparent 45deg)`,
      borderRadius: "50%",
      mask: "radial-gradient(circle, transparent 60px, black 60px, black 200px, transparent 200px)",
      WebkitMask:
        "radial-gradient(circle, transparent 60px, black 60px, black 200px, transparent 200px)",
    }),
  });

  const getSegmentBorderStyle = (index: number): CSSProperties => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    transform: `rotate(${index * 45}deg)`,
    pointerEvents: "none",
  });

  const getSegmentIconStyle = (index: number): CSSProperties => {
    const angle = index * 45 + 22.5; // Center of sector
    const radius = 65; // Distance from center
    const radian = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(radian - Math.PI / 2) * 0.6;
    const y = 50 + radius * Math.sin(radian - Math.PI / 2) * 0.6;

    return {
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%, -50%)",
      fontSize: "18px",
      color: "#ffffff",
      textShadow: "0 0 4px rgba(0, 0, 0, 0.7)",
      zIndex: 6,
      pointerEvents: "none",
    };
  };

  const getActionButtonStyle = (
    position: string,
    variant: string
  ): CSSProperties => {
    const baseStyle: CSSProperties = {
      position: "absolute",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px",
      color: "white",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      zIndex: 10,
    };

    // Variant colors
    const variantColors: { [key: string]: string } = {
      primary: "linear-gradient(135deg, #0066ff, #004ccf)",
      danger: "linear-gradient(135deg, #ff4444, #cc2222)",
      success: "linear-gradient(135deg, #88dd00, #66bb00)",
      cyan: "linear-gradient(135deg, #00dddd, #00aaaa)",
      teal: "linear-gradient(135deg, #00aa88, #008866)",
      gray: "linear-gradient(135deg, #666666, #444444)",
    };

    // Position styles
    const positionStyles: { [key: string]: CSSProperties } = {
      top: { top: "15px", left: "50%", transform: "translateX(-50%)" },
      "top-right": { top: "35px", right: "35px" },
      right: { right: "15px", top: "50%", transform: "translateY(-50%)" },
      "bottom-right": { bottom: "35px", right: "35px" },
      bottom: { bottom: "15px", left: "50%", transform: "translateX(-50%)" },
      "bottom-left": { bottom: "35px", left: "35px" },
      left: { left: "15px", top: "50%", transform: "translateY(-50%)" },
      "top-left": { top: "35px", left: "35px" },
    };

    return {
      ...baseStyle,
      background: variantColors[variant] || variantColors.gray,
      ...positionStyles[position],
    };
  };

  const centerContentStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(26, 26, 26, 0.95) 40%, rgba(42, 42, 42, 0.8) 100%)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 15,
    boxShadow:
      "0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.05)",
  };

  const centerTitleStyle: CSSProperties = {
    fontSize: "14px",
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const centerActionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const getCenterButtonStyle = (variant?: string): CSSProperties => ({
    background: variant === "apply" ? "rgba(136, 221, 0, 0.2)" : "none",
    border:
      variant === "apply"
        ? "1px solid #88dd00"
        : "1px solid rgba(255, 255, 255, 0.3)",
    color: variant === "apply" ? "#88dd00" : "#cccccc",
    padding: "4px 12px",
    fontSize: "11px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  });

  if (!isOpen) return null;

  return (
    <div style={containerStyle} data-testid="radial-menu-container">
      <div style={menuBaseStyle} data-testid="radial-menu-base">
        {/* Segments */}
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        >
          {segments.map((segment, index) => (
            <div
              key={segment.id}
              style={getSegmentStyle(index, segment.isSelected || false)}
              data-testid={`segment-${segment.id}`}
              onClick={() => handleSegmentClick(segment.id)}
              onMouseEnter={() => setHoveredSegment(segment.id)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          ))}
        </div> */}

        {/* Segment fills for selected state */}
        {segments.map((segment, index) => (
          <div
            key={`fill-${segment.id}`}
            style={getSegmentFillStyle(index, segment.isSelected || false)}
            onClick={() => handleSegmentClick(segment.id)}
            onMouseEnter={() => setHoveredSegment(segment.id)}
            onMouseLeave={() => setHoveredSegment(null)}
          />
        ))}

        {/* Segment borders */}
        {segments.map((segment, index) => (
          <div
            key={`border-${segment.id}`}
            style={getSegmentBorderStyle(index)}
          >
            <div
              style={{
                content: '""',
                position: "absolute",
                top: 0,
                left: "50%",
                width: "1px",
                height: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                transform: "translateX(-50%)",
              }}
            />
          </div>
        ))}

        {/* Segment icons */}
        {segments.map(
          (segment, index) =>
            segment.icon && (
              <div
                key={`icon-${segment.id}`}
                style={getSegmentIconStyle(index)}
                data-testid={`segment-icon-${segment.id}`}
              >
                {renderIcon(segment.icon)}
              </div>
            )
        )}
      </div>

      {/* Center content */}
      <div style={centerContentStyle} data-testid="center-content">
        <div style={centerTitleStyle} data-testid="center-title">
          {renderIcon("fas fa-map")}
          <span>{centerContent.title}</span>
        </div>
        <div style={centerActionsStyle} data-testid="center-actions">
          {centerContent.actions.map((action) => (
            <button
              key={action.id}
              style={getCenterButtonStyle(action.variant)}
              data-testid={`center-button-${action.id}`}
              onClick={() => handleCenterActionClick(action.id)}
              onMouseEnter={(e) => {
                const button = e.target as HTMLElement;
                if (action.variant === "apply") {
                  button.style.background = "rgba(136, 221, 0, 0.3)";
                } else {
                  button.style.background = "rgba(255, 255, 255, 0.1)";
                  button.style.color = "#ffffff";
                  button.style.borderColor = "rgba(255, 255, 255, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                const button = e.target as HTMLElement;
                const originalStyle = getCenterButtonStyle(action.variant);
                button.style.background = originalStyle.background as string;
                button.style.color = originalStyle.color as string;
                const borderValue = originalStyle.border as string;
                button.style.borderColor = borderValue
                  ? borderValue.split(" ")[2] || ""
                  : "";
              }}
            >
              {action.icon && renderIcon(action.icon)}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadialActionMenuInline;
