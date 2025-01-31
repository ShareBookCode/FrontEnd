import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter.tsx";
import { App as AntDApp, ConfigProvider } from "antd";
import { antdThemeConfig } from "./antdConfig.ts";
import "./index.css";
import "antd/dist/reset.css";
import "./styles/fonts.scss";
import "./styles/variables.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={antdThemeConfig}>
      <AntDApp>
        <AppRouter />
      </AntDApp>
    </ConfigProvider>
  </StrictMode>
);
