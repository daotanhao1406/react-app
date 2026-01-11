import React from "react";
import { motion } from "framer-motion";

export default function InfoSection({
  icon: Icon,
  title,
  children,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#3641f5]/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#3641f5]/5 transition-all duration-500">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3641f5] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#3641f5]/25">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </motion.div>
  );
}
