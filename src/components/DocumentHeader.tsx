import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Building2,
  FileText,
  Tag,
  Clock,
  Hash,
  ArrowLeft,
  FolderOpen,
} from "lucide-react";
import { Button } from "antd";

export default function DocumentHeader({ document, isDark }) {
  const MetaItem = ({ icon: Icon, label, value, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md
                ${
                  isDark
                    ? "bg-white/5 border border-white/10"
                    : "bg-white/60 border border-black/5 shadow-sm"
                }
            `}
    >
      <Icon
        className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
      />
      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </motion.div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Grid Background with Fade */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
                        linear-gradient(${
                          isDark
                            ? "rgba(54,65,245,0.08)"
                            : "rgba(54,65,245,0.05)"
                        } 1px, transparent 1px),
                        linear-gradient(90deg, ${
                          isDark
                            ? "rgba(54,65,245,0.08)"
                            : "rgba(54,65,245,0.05)"
                        } 1px, transparent 1px)
                    `,
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 pt-8 pb-16">
        {/* Tags */}
        <Button
          type="text"
          icon={<ArrowLeft />}
          onClick={() => window.history.back()}
        >
          Quay lai
        </Button>
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Brief/Title */}
        <motion.h1
          className={`
                        text-2xl md:text-3xl font-bold mb-8 max-w-4xl leading-tight
                        ${isDark ? "text-white" : "text-gray-900"}
                    `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {document.brief ||
            "Về việc triển khai kế hoạch phát triển kinh tế - xã hội năm 2024"}
        </motion.h1>

        {/* Meta Items - Creative Layout */}
        {/* <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <span>{document.docNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Ngày văn bản: {document.documentDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Ngày nhận: {document.receivedDate}</span>
          </div>
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 md:gap-6"
        >
          <div className="flex items-center gap-2">
            <Hash
              className={`w-4 h-4 ${
                isDark ? "text-[#3641f5]" : "text-[#3641f5]"
              }`}
            />
            <span
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Số hiệu:
            </span>
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {document.docLabel || "56/UBND-VP"}
            </span>
          </div>

          <div
            className={`hidden md:block w-px h-4 ${
              isDark ? "bg-slate-700" : "bg-slate-300"
            }`}
          />

          <div className="flex items-center gap-2">
            <FolderOpen
              className={`w-4 h-4 ${
                isDark ? "text-purple-400" : "text-purple-500"
              }`}
            />
            <span
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Loại:
            </span>
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {document.category || "Văn bản đến"}
            </span>
          </div>

          <div
            className={`hidden md:block w-px h-4 ${
              isDark ? "bg-slate-700" : "bg-slate-300"
            }`}
          />

          <div className="flex items-center gap-2">
            <Building2
              className={`w-4 h-4 ${
                isDark ? "text-emerald-400" : "text-emerald-500"
              }`}
            />
            <span
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Nơi gửi:
            </span>
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {document.sender || "Công ty ABC"}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
