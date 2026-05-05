import { ConfigProvider } from "antd";
import DashboardPage from "./pages/DashboardPage";
import SqlPage from "./pages/SqlPage";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "BaiJamjuree, sans-serif",
          fontSize: 12,
          colorTextBase: "#e9e7e2e6",
          colorTextSecondary: "#8e867bcc",
          colorBorder: "#2a2a2a",
          colorBorderSecondary: "#2c292680",
          borderRadius: 4,
        },
        components: {
          Card: {
            headerBg: "#151515",
            colorBgContainer: "#151515",
          },
          Typography: {},
        },
      }}
    >
      <SqlPage />
    </ConfigProvider>
  );
}
