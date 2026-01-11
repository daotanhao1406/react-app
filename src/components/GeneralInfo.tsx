import { motion } from "framer-motion";
import {
  User,
  Building,
  Calendar,
  FileEdit,
  MessageSquare,
  Bookmark,
} from "lucide-react";

const InfoRow = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300"
  >
    <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-amber-100 group-hover:to-orange-50 transition-all duration-300">
      <Icon className="w-5 h-5 text-slate-600 group-hover:text-amber-600 transition-colors" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-slate-800 font-medium truncate">{value || "—"}</p>
    </div>
  </motion.div>
);

export default function GeneralInfoCard({ document }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
          <h2 className="text-xl font-bold text-slate-800">Thông tin chung</h2>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <InfoRow
          icon={Bookmark}
          label="Ký hiệu"
          value={document.notation}
          delay={0.1}
        />
        <InfoRow
          icon={Calendar}
          label="Ngày văn bản"
          value={document.documentDate}
          delay={0.15}
        />
        <InfoRow
          icon={Calendar}
          label="Ngày nhận"
          value={document.receivedDate}
          delay={0.2}
        />
        <InfoRow
          icon={User}
          label="Người gửi"
          value={document.sender}
          delay={0.25}
        />
        <InfoRow
          icon={FileEdit}
          label="Người soạn thảo"
          value={document.editor}
          delay={0.3}
        />
        <InfoRow
          icon={Building}
          label="Cơ quan soạn thảo"
          value={document.editingOrganization}
          delay={0.35}
        />
        <div className="md:col-span-2">
          <InfoRow
            icon={MessageSquare}
            label="Ghi chú"
            value={document.notes}
            delay={0.4}
          />
        </div>
      </div>
    </motion.div>
  );
}
