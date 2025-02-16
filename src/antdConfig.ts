import type { ThemeConfig } from "antd";

export const antdThemeConfig: ThemeConfig = {
  cssVar: true,
  token: {
    colorBgContainer: "#F1F4F6",
    colorTextBase: "#000000",
    colorPrimary: "#2A7FFF",
    colorBgElevated: "#FFFFFF",
    colorTextPlaceholder: "#909090",
    lineWidth: 0,
  },
  components: {
    Button: {
      fontFamily: "Onest-Medium",
      fontSize: 16,
      colorPrimaryHover: "#2A7FFF",
      colorBgContainerDisabled: "rgba(90, 156, 255, 1)",
      colorTextDisabled: "#FFFFFF",
      controlHeight: 42,
      borderRadius: 9,
    },
    List: {
      itemPadding: "12px",
    },
    Input: {
      colorText: "#000000",
      activeBorderColor: "rgba(42, 127, 255, 80)",
      colorError: "rgba(255, 42, 42, 0.8)",
      fontFamily: "Onest-Regular",
      fontSize: 16,
      hoverBorderColor: "transparent",
      colorBorder: "transparent",
      lineWidth: 2,
      controlHeight: 38,
      paddingInline: 14,
      borderRadius: 9,
    },
    Form: {
      itemMarginBottom: 0,
      colorError: "rgba(255, 42, 42, 0.8)",
      fontFamily: "Onest-Regular",
      fontSize: 12,
    },
    Dropdown: {
      paddingBlock: 6,
      controlPaddingHorizontal: 10,
      boxShadowSecondary: "0px 2px 7px rgba(0, 0, 0, 0.15)",
      fontFamily: "Onest-Regular",
      colorBgElevated: "#FFFFFF",
    },
    Card: {
      paddingLG: 0,
      borderRadiusLG: 10,
      boxShadow: "0px 20px 7px rgba(42, 127, 255, 80)",
      boxShadowTertiary: "0px 2px 7px rgba(42, 127, 255, 80)",
      colorBgContainer: "#FFFFFF",
    },
    Checkbox: {
      fontFamily: "Onest-Regular",
      fontSize: 12,
      paddingXS: 6,
    },
    Drawer: {
      footerPaddingInline: 0,
      footerPaddingBlock: 0,
    },
    Collapse: {
      headerBg: "transparent",
      contentBg: "transparent",
      headerPadding: "16px 0",
      contentPadding: "0",
    },
  },
};
