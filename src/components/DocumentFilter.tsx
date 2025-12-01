import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  ConfigProvider,
  Divider,
  Badge,
  theme,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  NumberOutlined,
  FlagOutlined,
  CheckCircleOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { RangePicker } = DatePicker;

export interface DocumentFilterValues {
  contentSummary?: string;
  docSymbol?: string;
  status?: string;
  urgency?: string;
  expirationDate?: [any, any];
  createdDate?: [any, any];
}

interface DocumentFilterProps {
  onFilter: (values: DocumentFilterValues) => void;
}

// Custom Section Component for the "Integrated Bar" look
const FilterSection = ({
  label,
  icon,
  children,
  className = "",
  isActive = false,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}) => (
  <div
    className={`
    relative flex flex-col justify-center px-4 py-2 transition-all duration-300 group
    hover:bg-slate-50 cursor-pointer
    ${isActive ? "bg-blue-50/50" : ""}
    ${className}
  `}
  >
    <div
      className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1.5 ${
        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
      }`}
    >
      {icon} {label}
    </div>
    <div className="h-8 flex items-center">{children}</div>
  </div>
);

export const DocumentFilter: React.FC<DocumentFilterProps> = ({ onFilter }) => {
  const [form] = Form.useForm();
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>(
    {}
  );

  const handleValuesChange = (changedValues: any, allValues: any) => {
    // Update active state for visual feedback
    const newActiveState: Record<string, boolean> = {};
    Object.keys(allValues).forEach((key) => {
      if (allValues[key] && allValues[key].length !== 0) {
        newActiveState[key] = true;
      }
    });
    setActiveSections(newActiveState);
  };

  const handleFinish = (values: any) => {
    onFilter(values);
  };

  const handleReset = () => {
    form.resetFields();
    setActiveSections({});
    form.submit();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 8,
          fontFamily: "Plus Jakarta Sans, sans-serif",
          controlHeight: 32,
        },
        components: {
          Input: {
            colorBgContainer: "transparent",
            colorBorder: "transparent",
            activeBorderColor: "transparent",
            hoverBorderColor: "transparent",
            activeShadow: "none",
            paddingInline: 0,
            fontSize: 14,
            fontWeightStrong: 500,
          },
          Select: {
            colorBgContainer: "transparent",
            colorBorder: "transparent",
            selectorBg: "transparent",
            colorTextPlaceholder: "#94a3b8",
            fontSize: 14,
          },
          DatePicker: {
            colorBgContainer: "transparent",
            colorBorder: "transparent",
            activeBorderColor: "transparent",
            hoverBorderColor: "transparent",
            activeShadow: "none",
            paddingInline: 0,
            fontSize: 14,
          },
          Button: {
            controlHeight: 48,
          },
        },
      }}
    >
      <div className="w-full max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <Form
            form={form}
            onFinish={handleFinish}
            onValuesChange={handleValuesChange}
            className="w-full"
          >
            {/* The Integrated Bar Container */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
              {/* 1. Search Content (Primary) */}
              <FilterSection
                label="Nội dung"
                icon={<SearchOutlined />}
                className="flex-[2] min-w-[200px]"
                isActive={activeSections.contentSummary}
              >
                <Form.Item name="contentSummary" noStyle>
                  <Input
                    placeholder="Tìm kiếm trích yếu..."
                    className="!text-slate-800 font-medium w-full"
                  />
                </Form.Item>
              </FilterSection>

              {/* 2. Symbol */}
              <FilterSection
                label="Số ký hiệu"
                icon={<NumberOutlined />}
                className="flex-1 min-w-[140px]"
                isActive={activeSections.docSymbol}
              >
                <Form.Item name="docSymbol" noStyle>
                  <Input
                    placeholder="VD: 105/QD"
                    className="!text-slate-800 font-medium w-full"
                  />
                </Form.Item>
              </FilterSection>

              {/* 3. Status */}
              <FilterSection
                label="Trạng thái"
                icon={<CheckCircleOutlined />}
                className="w-full md:w-[160px]"
                isActive={activeSections.status}
              >
                <Form.Item name="status" noStyle>
                  <Select
                    placeholder="Tất cả"
                    className="w-full !text-slate-800 font-medium"
                    popupMatchSelectWidth={200}
                    allowClear
                    options={[
                      {
                        value: "draft",
                        label: <Badge status="default" text="Dự thảo" />,
                      },
                      {
                        value: "pending",
                        label: <Badge status="processing" text="Chờ duyệt" />,
                      },
                      {
                        value: "published",
                        label: <Badge status="success" text="Đã ban hành" />,
                      },
                      {
                        value: "archived",
                        label: <Badge status="warning" text="Lưu trữ" />,
                      },
                    ]}
                    suffixIcon={null}
                  />
                </Form.Item>
              </FilterSection>

              {/* 4. Urgency */}
              <FilterSection
                label="Độ khẩn"
                icon={<FlagOutlined />}
                className="w-full md:w-[160px]"
                isActive={activeSections.urgency}
              >
                <Form.Item name="urgency" noStyle>
                  <Select
                    placeholder="Tất cả"
                    className="w-full !text-slate-800 font-medium"
                    popupMatchSelectWidth={200}
                    allowClear
                    options={[
                      { value: "normal", label: "Bình thường" },
                      {
                        value: "urgent",
                        label: <span className="text-orange-500">Khẩn</span>,
                      },
                      {
                        value: "very_urgent",
                        label: (
                          <span className="text-red-500">Thượng khẩn</span>
                        ),
                      },
                      {
                        value: "flash",
                        label: (
                          <span className="text-red-700 font-bold">
                            Hỏa tốc
                          </span>
                        ),
                      },
                    ]}
                    suffixIcon={null}
                  />
                </Form.Item>
              </FilterSection>

              {/* 5. Date Range */}
              <FilterSection
                label="Thời gian"
                icon={<CalendarOutlined />}
                className="w-full md:w-[220px]"
                isActive={activeSections.createdDate}
              >
                <Form.Item name="createdDate" noStyle>
                  <RangePicker
                    placeholder={["Từ ngày", "Đến"]}
                    format="DD/MM"
                    className="w-full !p-0 !border-0"
                    suffixIcon={null}
                    separator={<span className="text-slate-300 px-1">-</span>}
                  />
                </Form.Item>
              </FilterSection>

              {/* Action Button Area */}
              <div className="bg-slate-50 p-2 flex items-center justify-center md:w-auto min-w-[80px]">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-12 h-12 !rounded-xl shadow-blue-500/30 flex items-center justify-center !p-0 bg-gradient-to-br from-blue-500 to-blue-600 hover:!from-blue-600 hover:!to-blue-700 border-0"
                  icon={<SearchOutlined className="text-xl" />}
                />
              </div>
            </div>

            {/* Quick Reset Link (Optional, fades in when active) */}
            {Object.keys(activeSections).length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-8 right-0"
              >
                <Button
                  type="link"
                  size="small"
                  icon={<ClearOutlined />}
                  onClick={handleReset}
                  className="text-slate-400 hover:text-slate-600"
                >
                  Xóa bộ lọc đang chọn ({Object.keys(activeSections).length})
                </Button>
              </motion.div>
            )}
          </Form>
        </motion.div>
      </div>
    </ConfigProvider>
  );
};
