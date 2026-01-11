import { ConfigProvider, Layout } from "antd";
import DocumentDetailsPage from "./page/DocumentDetailsPage";
import { darkTheme } from "./data/theme";

export default function App() {
  return (
    <ConfigProvider theme={darkTheme}>
      <Layout>
        <Layout.Content
          style={{
            display: "flex",
            height: "100vh",
            padding: 20,
            width: "100%",
            flex: 1,
          }}
        >
          <DocumentDetailsPage />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
