import { ThemeConfig, theme } from "antd";

export const darkTheme: ThemeConfig = {
  token: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: 8,
    borderRadiusSM: 8,
    borderRadiusLG: 16,
    borderRadiusOuter: 14,
    controlHeight: 40,
    controlHeightSM: 32,
    controlHeightLG: 48,
    boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.05)",
    wireframe: false,
    colorPrimary: "#465fff",
    colorInfo: "#465fff",
    colorSuccess: "#12b76a",
    colorError: "#FB2C32",
    colorWarning: "#fdb022",
    colorBgBase: "#f9fafb",
    colorBgContainer: "#fff",
  },
  components: {
    Layout: {
      bodyBg: "#f9fafb",
      footerBg: "#f9fafb",
      headerBg: "#f9fafb",
    },
    Button: {
      fontWeight: 600,
      contentFontSize: 15,
      defaultShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      primaryShadow: "0 4px 14px 0 rgba(0, 111, 238, 0.4)",
    },
    Input: {
      activeShadow: "0 0 0 2px rgba(0, 111, 238, 0.2)",
      inputFontSize: 15,
      hoverBorderColor: "#465fff",
    },
    Select: {
      controlHeight: 40,
      controlItemBgActive: "#262d3c",
    },
    Card: {
      headerFontSize: 18,
      actionsLiMargin: "0",
    },
    // Table: {
    //   headerBg: "#f9fafb",
    //   headerColor: "#71717A",
    //   rowHoverBg: "#F4F4F5",
    //   borderColor: "#E4E4E7",
    // },
    Tag: {
      defaultBg: "#1D2536",
      defaultColor: "#98a2b3",
      borderRadiusSM: 8,
    },
    Modal: {
      titleFontSize: 20,
    },
    Dropdown: {
      colorBgElevated: "#1a2231",
    },
    Segmented: {
      itemSelectedBg: "#1d2939",
      // itemSelectedShadow: "0 2px 10px rgba(0,0,0,0.1)",
      trackBg: "#f9fafb",
      borderRadius: 12,
      controlHeight: 40,
    },
    Tabs: {
      titleFontSize: 15,
      // itemColor: "#71717A",
      itemSelectedColor: "#465fff",
      inkBarColor: "#465fff",
    },
    Transfer: {
      listHeight: 280,
      headerHeight: 44,
      itemHeight: 36,
      controlItemBgActive: "#f9fafb",
    },
    Switch: {
      handleSize: 22,
      trackHeight: 26,
      trackMinWidth: 48,
    },
    Radio: {
      dotSize: 8,
      radioSize: 20,
      buttonSolidCheckedBg: "#465fff",
    },
    Checkbox: {
      borderRadiusSM: 5,
      algorithm: true,
    },
    Tooltip: {
      algorithm: true,
      controlHeight: 32,
      paddingSM: 14,
      paddingXS: 12,
    },
    Message: {
      borderRadiusLG: 8,
      boxShadow:
        "      0 6px 16px 0 rgba(0, 0, 0, 0.08),      0 3px 6px -4px rgba(0, 0, 0, 0.12),      0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    },
  },
  algorithm: theme.defaultAlgorithm,
};
