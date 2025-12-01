import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  ConfigProvider,
  Popover,
  Tag,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  ThunderboltFilled,
  NumberOutlined,
  CloseCircleFilled,
  CalendarOutlined,
  FilterFilled,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

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

// Styled Filter Chip
const FilterChip = ({
  label,
  value,
  isActive,
  onClear,
  onClick,
  icon,
}: {
  label: string;
  value?: React.ReactNode;
  isActive: boolean;
  onClear?: (e: React.MouseEvent) => void;
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      relative flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 select-none
      border
      ${
        isActive
          ? "bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-500/20"
          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      }
    `}
  >
    <span className={`text-lg ${isActive ? "text-white" : "text-slate-400"}`}>
      {icon}
    </span>
    <span className="font-medium text-sm whitespace-nowrap">
      {value ? value : label}
    </span>
    {isActive && onClear && (
      <span
        onClick={onClear}
        className="ml-1 hover:text-red-300 transition-colors"
      >
        <CloseCircleFilled />
      </span>
    )}
  </motion.div>
);

export const DocumentFilter2: React.FC<DocumentFilterValues> = ({
  onFilter,
}) => {
  const [form] = Form.useForm();
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [popoverOpen, setPopoverOpen] = useState<Record<string, boolean>>({});

  const handleOpenChange = (key: string, visible: boolean) => {
    setPopoverOpen((prev) => ({ ...prev, [key]: visible }));
  };

  const updateFilter = (key: string, value: any, displayValue?: any) => {
    const newFilters = { ...activeFilters };

    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete newFilters[key];
    } else {
      newFilters[key] = { value, display: displayValue || value };
    }

    setActiveFilters(newFilters);

    // Construct raw values for parent
    const rawValues: any = {};
    Object.keys(newFilters).forEach(
      (k) => (rawValues[k] = newFilters[k].value)
    );
    onFilter(rawValues);
  };

  const clearFilter = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    updateFilter(key, undefined);
    form.setFieldValue(key, undefined);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1e293b", // Slate 800
          borderRadius: 8,
          fontFamily: "Plus Jakarta Sans, sans-serif",
        },
      }}
    >
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="flex flex-col gap-6">
          {/* 1. HUGE MINIMALIST INPUT */}
          <div className="relative group">
            <SearchOutlined className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-slate-300 group-hover:text-slate-400 transition-colors" />
            <Input
              placeholder="Tìm kiếm văn bản..."
              className="!bg-transparent !border-none !shadow-none !text-4xl !font-light !pl-12 !h-20 placeholder:!text-slate-200 text-slate-800 focus:placeholder:!text-slate-300 transition-all"
              onChange={(e) => {
                // Debounce usually handles here, simplified for mockup
                if (e.target.value) {
                  updateFilter(
                    "contentSummary",
                    e.target.value,
                    `"${e.target.value}"`
                  );
                } else {
                  updateFilter("contentSummary", undefined);
                }
              }}
            />
            <div className="absolute bottom-0 left-12 right-0 h-[1px] bg-slate-100 group-hover:bg-slate-200 transition-colors" />
          </div>

          {/* 2. FILTER CHIPS ROW */}
          <div className="flex flex-wrap items-center gap-3 pl-12">
            {/* SYMBOL */}
            <Popover
              trigger="click"
              open={popoverOpen.docSymbol}
              onOpenChange={(v) => handleOpenChange("docSymbol", v)}
              content={
                <div className="p-2 w-64">
                  <Input
                    placeholder="Nhập số ký hiệu..."
                    autoFocus
                    onPressEnter={(e: any) => {
                      updateFilter("docSymbol", e.target.value);
                      handleOpenChange("docSymbol", false);
                    }}
                    suffix={
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleOpenChange("docSymbol", false)}
                      />
                    }
                  />
                </div>
              }
            >
              <FilterChip
                label="Số ký hiệu"
                icon={<NumberOutlined />}
                isActive={!!activeFilters.docSymbol}
                value={activeFilters.docSymbol?.display}
                onClear={(e) => clearFilter(e, "docSymbol")}
                onClick={() => {}}
              />
            </Popover>

            {/* STATUS */}
            <Popover
              trigger="click"
              open={popoverOpen.status}
              onOpenChange={(v) => handleOpenChange("status", v)}
              content={
                <div className="w-48 flex flex-col gap-1 p-1">
                  {[
                    { val: "draft", label: "Dự thảo", color: "default" },
                    { val: "pending", label: "Chờ duyệt", color: "processing" },
                    {
                      val: "published",
                      label: "Đã ban hành",
                      color: "success",
                    },
                    { val: "archived", label: "Lưu trữ", color: "warning" },
                  ].map((item) => (
                    <div
                      key={item.val}
                      className="px-3 py-2 hover:bg-slate-50 rounded-md cursor-pointer flex items-center justify-between group"
                      onClick={() => {
                        updateFilter("status", item.val, item.label);
                        handleOpenChange("status", false);
                      }}
                    >
                      <span>{item.label}</span>
                      {activeFilters.status?.value === item.val && (
                        <CheckCircleFilled className="text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              }
            >
              <FilterChip
                label="Trạng thái"
                icon={<CheckCircleFilled />}
                isActive={!!activeFilters.status}
                value={activeFilters.status?.display}
                onClear={(e) => clearFilter(e, "status")}
                onClick={() => {}}
              />
            </Popover>

            {/* URGENCY */}
            <Popover
              trigger="click"
              open={popoverOpen.urgency}
              onOpenChange={(v) => handleOpenChange("urgency", v)}
              content={
                <div className="w-48 flex flex-col gap-1 p-1">
                  {[
                    { val: "normal", label: "Bình thường" },
                    { val: "urgent", label: "Khẩn" },
                    { val: "very_urgent", label: "Thượng khẩn" },
                    { val: "flash", label: "Hỏa tốc" },
                  ].map((item) => (
                    <div
                      key={item.val}
                      className="px-3 py-2 hover:bg-slate-50 rounded-md cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        updateFilter("urgency", item.val, item.label);
                        handleOpenChange("urgency", false);
                      }}
                    >
                      <span
                        className={
                          item.val === "flash" ? "text-red-600 font-bold" : ""
                        }
                      >
                        {item.label}
                      </span>
                      {activeFilters.urgency?.value === item.val && (
                        <CheckCircleFilled className="text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              }
            >
              <FilterChip
                label="Độ khẩn"
                icon={<ThunderboltFilled />}
                isActive={!!activeFilters.urgency}
                value={activeFilters.urgency?.display}
                onClear={(e) => clearFilter(e, "urgency")}
                onClick={() => {}}
              />
            </Popover>

            {/* DATE */}
            <Popover
              trigger="click"
              open={popoverOpen.createdDate}
              onOpenChange={(v) => handleOpenChange("createdDate", v)}
              content={
                <div className="p-2">
                  <RangePicker
                    onChange={(dates) => {
                      if (dates) {
                        const display = `${dayjs(dates[0]).format(
                          "DD/MM"
                        )} - ${dayjs(dates[1]).format("DD/MM")}`;
                        updateFilter("createdDate", dates, display);
                      } else {
                        updateFilter("createdDate", undefined);
                      }
                      handleOpenChange("createdDate", false);
                    }}
                  />
                </div>
              }
            >
              <FilterChip
                label="Thời gian"
                icon={<CalendarOutlined />}
                isActive={!!activeFilters.createdDate}
                value={activeFilters.createdDate?.display}
                onClear={(e) => clearFilter(e, "createdDate")}
                onClick={() => {}}
              />
            </Popover>

            {/* Add Filter Button (Visual Decoration mostly in this mockup, but implies extensibility) */}
            <Tooltip title="Thêm bộ lọc khác">
              <Button
                type="dashed"
                shape="circle"
                icon={<PlusOutlined />}
                className="ml-2 border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
