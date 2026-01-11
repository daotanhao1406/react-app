import {
  Building2,
  Calendar,
  Edit3,
  FileText,
  Hash,
  MessageSquare,
  Send,
  Sparkles,
  StickyNote,
  User,
} from "lucide-react";
import GeneralInfoCard from "../components/GeneralInfo";
import InfoField from "../components/InfoField";
import InfoSection from "../components/InfoSection";
import { Card, Divider, Tag } from "antd";
import MeetingInfoSection from "../components/MeetingInfoSection";
import InfoCard from "../components/InfoCard";
import InfoRow from "../components/InfoRow";
import "../index.css";
import DocumentHeader from "../components/DocumentHeader";
import MeetingInfoCard from "../components/MeetingInfoCard";
import { motion } from "framer-motion";
import { InfoCircleFilled, InfoOutlined } from "@ant-design/icons";

const document = {
  docLabel: "Công văn đến",
  docSourceNo: "CV-2024-001234",
  notation: "Mật",
  documentDate: "15/01/2024",
  receivedDate: "17/01/2024",
  docNumber: "56/UBND-VP",
  sender: "Ủy ban Nhân dân Thành phố",
  editor: "Nguyễn Văn An",
  editingOrganization: "Văn phòng UBND",
  brief:
    "Về việc triển khai kế hoạch phát triển kinh tế - xã hội năm 2024 và các nhiệm vụ trọng tâm cần thực hiện trong quý I",
  notes: "Cần xử lý trước ngày 25/01/2024. Báo cáo kết quả về Văn phòng UBND.",
  meetingTime: "09:00 - 11:30, 20/01/2024",
  meetingRoom: "Phòng họp A1 - Tầng 3",
  leaderRecipient: "Ông Trần Minh Hoàng - Phó Chủ tịch UBND",
  urgentLevel: "urgent",
  presidentRecipients: "Chủ tịch, Các Phó Chủ tịch UBND",
  suggestPresidentRecipients: "Phó Chủ tịch phụ trách Kinh tế",
  language: "Tiếng Việt",
  pages: 12,
  attachments: [
    { name: "Ke_hoach_KTXH_2024.pdf", size: "2.4 MB", type: "pdf" },
    { name: "Phu_luc_chi_tieu.xlsx", size: "856 KB", type: "xlsx" },
    { name: "Bao_cao_tom_tat.docx", size: "1.2 MB", type: "docx" },
  ],
  relatedDocs: [
    {
      title: "Kế hoạch phát triển kinh tế - xã hội giai đoạn 2021-2025",
      docNumber: "42/KH-UBND",
      date: "10/01/2024",
      type: "Kế hoạch",
    },
    {
      title: "Báo cáo tổng kết năm 2023",
      docNumber: "128/BC-UBND",
      date: "05/01/2024",
      type: "Báo cáo",
    },
    {
      title: "Chỉ thị về tăng cường kỷ luật hành chính",
      docNumber: "03/CT-UBND",
      date: "02/01/2024",
      type: "Chỉ thị",
    },
  ],
};

function InfoItem({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: any;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          highlight
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p
          className={`text-sm font-medium ${
            highlight ? "text-primary" : "text-foreground"
          } break-words`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};
function SectionCard({
  title,
  icon: Icon,
  children,
  className = "",
  accent = false,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`relative bg-card rounded-xl border border-card-border overflow-hidden ${
        accent ? "urgency-glow" : ""
      } ${className}`}
    >
      {accent && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
      )}
      <div
        className={`flex items-center gap-3 px-5 py-4 border-b border-card-border ${
          accent ? "bg-primary/5" : "bg-muted/30"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            accent
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5 relative">{children}</div>
    </motion.div>
  );
}

export default function DocumentDetailsPage() {
  return (
    <div className="relative min-h-screen w-full ">
      <DocumentHeader document={document} isDark={false} />
      <div className="flex w-full gap-20 relative">
        <div className="absolute inset-0 grid-background grid-fade pointer-events-none" />
      </div>
      <div className="grid grid-cols-2 gap-12 w-full px-12">
        <div className="col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                {/* <div className="w-1.5 h-7 bg-[#3641f5] rounded-full" /> */}
                <InfoCircleFilled />
                <h2 className="text-xl font-semibold text-slate-800">
                  Thông tin chung
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoField label="Nhãn văn bản" value={document.docLabel} />
                <InfoField
                  label="Số hiệu nguồn"
                  value={document.docSourceNo}
                  highlight
                />
                <InfoField label="Ký hiệu" value={document.notation} />
                <InfoField label="Ngày văn bản" value={document.documentDate} />
                <InfoField label="Ngày nhận" value={document.receivedDate} />
                <InfoField
                  label="Số văn bản"
                  value={document.docNumber}
                  highlight
                />
              </div>
              <Divider className="my-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 space-y-4">
                <InfoField label="Người soạn thảo" value={document.editor} />
                <InfoField
                  label="Đơn vị biên tập"
                  value={document.editingOrganization}
                />
              </div>
            </div>
          </motion.div>
          {/* <GeneralInfoCard document={document} /> */}
        </div>
        <div className="col-span-1">
          {/* <MeetingInfoSection document={document} /> */}
          <MeetingInfoCard document={document} isDark={false} />
        </div>
      </div>
    </div>
  );
}
