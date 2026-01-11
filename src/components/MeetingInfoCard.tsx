import React from "react";
import { CalendarClock, MapPin, UserCog, Clock, Video } from "lucide-react";
import InfoCard from "./InfoCard";
import { Button, Card, Typography } from "antd";
import { motion } from "framer-motion";

export default function MeetingInfoCard({ document, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-7 bg-[#3641f5] rounded-full" />
          <h2 className="text-xl font-bold text-slate-800">Thông tin chung</h2>
        </div>
        <div className="space-y-4">
          {/* Meeting Time Header */}
          <div
            className={`flex items-center justify-between p-5 rounded-2xl ${
              isDark ? "bg-white/[0.02]" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-2xl"
                style={{ background: "#3641f5" }}
              >
                <Clock className="h-7 w-7 text-white" />
              </div>
              <div>
                <p
                  className={`text-xs mb-1 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Thời gian họp
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {"09:00 - 11:30"}
                </p>
                <p
                  className={`text-sm mt-0.5 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {document?.meetingDate || "Thứ Hai, 22/01/2024"}
                </p>
              </div>
            </div>
            <Button
              className="px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2"
              icon={<Video className="h-4 w-4" />}
              type="primary"
            >
              Tham gia cuộc họp
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Meeting Room */}
            <div
              className={`p-4 rounded-2xl ${
                isDark
                  ? "bg-white/[0.02] border border-white/10"
                  : "bg-gray-50/70 border border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* <div
                className="p-2.5 rounded-xl"
                style={{ background: "rgba(34, 197, 94, 0.15)" }}
              >
                <MapPin className="h-5 w-5 text-green-500" />
              </div> */}

                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: isDark
                      ? "rgba(54, 65, 245, 0.15)"
                      : "rgba(54, 65, 245, 0.08)",
                  }}
                >
                  <MapPin className="h-5 w-5" style={{ color: "#3641f5" }} />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-wide mb-1 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Phòng họp
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {document?.meetingRoom || "Phòng họp A1 - Tầng 3"}
                  </p>
                </div>
              </div>
            </div>

            {/* Leader Recipient */}
            <div
              className={`p-4 rounded-2xl ${
                isDark
                  ? "bg-white/[0.02] border border-white/10"
                  : "bg-gray-50/70 border border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* <div
                className="p-2.5 rounded-xl"
                style={{ background: "rgba(251, 146, 60, 0.15)" }}
              >
                <UserCog className="h-5 w-5 text-orange-500" />
              </div> */}

                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: isDark
                      ? "rgba(54, 65, 245, 0.15)"
                      : "rgba(54, 65, 245, 0.08)",
                  }}
                >
                  <UserCog className="h-5 w-5" style={{ color: "#3641f5" }} />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-wide mb-1 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Lãnh đạo tiếp nhận
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {document?.leaderRecipent || "Nguyễn Văn An - Phó Giám đốc"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
