import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, UserCheck, Video, Users } from "lucide-react";

export default function MeetingInfoSection({ document }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#3641f5] to-[#6366f1]" />
        <h2 className="text-xl font-bold text-slate-800">Thông tin cuộc họp</h2>
      </div>

      {/* Meeting card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3641f5]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6366f1]/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Meeting time highlight */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#3641f5] flex items-center justify-center shadow-lg shadow-[#3641f5]/30">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Thời gian họp</p>
                <p className="text-white text-2xl font-bold">09:00 - 11:30</p>
                <p className="text-slate-400 text-sm mt-1">
                  {document?.meetingDate || "Thứ Hai, 22/01/2024"}
                </p>
              </div>
            </div>

            <div className="sm:ml-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3641f5] text-white font-medium shadow-lg shadow-[#3641f5]/30 hover:shadow-xl hover:shadow-[#3641f5]/40 transition-shadow"
              >
                <Video className="w-4 h-4" />
                Tham gia cuộc họp
              </motion.button>
            </div>
          </div>

          {/* Meeting details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                  Phòng họp
                </p>
                <p className="text-white font-semibold">
                  {document?.meetingRoom || "Phòng họp A - Tầng 5"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                  Lãnh đạo tiếp nhận
                </p>
                <p className="text-white font-semibold">
                  {document?.leaderRecipent || "Nguyễn Văn An - Phó Giám đốc"}
                </p>
              </div>
            </div>
          </div>

          {/* Participants count */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3641f5] to-[#6366f1] border-2 border-slate-800 flex items-center justify-center text-white text-xs font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-slate-300 text-xs font-medium">
                +5
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-medium">9 người</span> được mời
              tham dự
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
