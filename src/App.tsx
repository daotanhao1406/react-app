import React, { useState } from "react";
import { Typography, Button, ConfigProvider, theme } from "antd";
import { PlusOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import SelectableCardList from "./page/SelectableCardList";

// Sample data
const initialPolicies = [
  {
    id: "1",
    title: "General Admission",
    date: "22/12/2022 18:38",
    user: "urikoo@cas",
    role: "Payment Leader",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore",
    ipRange: "172.168.23.1/24",
    validRange: "24/12 - 31/12",
    timeRange: "Mo,Tu,Th,Fr 12:00 - 18:00",
  },
  {
    id: "2",
    title: "Admin Access",
    date: "21/12/2022 10:15",
    user: "admin@cas",
    role: "System Admin",
    description:
      "System administration access with full permissions to manage all resources",
    ipRange: "172.168.0.1/16",
    validRange: "01/01 - 31/12",
    timeRange: "All days 00:00 - 23:59",
  },
  {
    id: "3",
    title: "Developer Access",
    date: "15/11/2022 09:30",
    user: "dev@cas",
    role: "Developer",
    description:
      "Access to development environments and testing resources with limited production access",
    ipRange: "192.168.1.1/24",
    validRange: "01/11 - 01/11/2023",
    timeRange: "Mo-Fr 09:00 - 18:00",
  },
  {
    id: "4",
    title: "Guest Access",
    date: "05/01/2023 14:22",
    user: "guest@cas",
    role: "Guest",
    description:
      "Limited read-only access to specific resources for demonstration purposes",
    ipRange: "10.0.0.1/24",
    validRange: "05/01 - 12/01",
    timeRange: "Mo,We,Fr 10:00 - 16:00",
  },
];

function App() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDeletePolicies = (ids: string[]) => {
    setPolicies((prev) => prev.filter((policy) => !ids.includes(policy.id)));
  };

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#2b9056",
          borderRadius: 8,
        },
      }}
    >
      <div
        className={`min-h-screen p-6 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Typography.Title level={3} style={{ margin: 0 }}>
              Policy Management
            </Typography.Title>
            <div className="flex gap-2">
              <Button
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button type="primary" icon={<PlusOutlined />}>
                Add New Policy
              </Button>
            </div>
          </div>

          <div
            className={`p-6 rounded-lg shadow-sm ${
              isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
            }`}
          >
            <SelectableCardList
              policies={policies}
              onDeletePolicies={handleDeletePolicies}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
