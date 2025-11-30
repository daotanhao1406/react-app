export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  fileType: string;
  url: string;
}

export interface RelatedDocument {
  id: string;
  documentNumber: string;
  title: string;
}

export interface Document {
  id: string;
  documentNumber: string;
  issuingAuthority: string;
  documentDate: string;
  excerpt: string;
  documentType: string;
  urgencyLevel: "normal" | "urgent" | "very_urgent";
  deadline: string;
  arrivalDate: string;
  field: string;
  securityLevel: "public" | "internal" | "confidential" | "secret";
  status: "pending" | "processing" | "completed" | "rejected";
  transferMethod: string;
  backupMethod: string;
  signatoryName: string;
  signatoryPosition: string;
  attachments: Attachment[];
  relatedDocuments: RelatedDocument[];
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getUrgencyLabel = (level: Document["urgencyLevel"]): string => {
  const labels: Record<Document["urgencyLevel"], string> = {
    normal: "Bình thường",
    urgent: "Khẩn",
    very_urgent: "Hỏa tốc",
  };
  return labels[level];
};

export const getSecurityLabel = (level: Document["securityLevel"]): string => {
  const labels: Record<Document["securityLevel"], string> = {
    public: "Công khai",
    internal: "Nội bộ",
    confidential: "Mật",
    secret: "Tuyệt mật",
  };
  return labels[level];
};

export const getStatusLabel = (status: Document["status"]): string => {
  const labels: Record<Document["status"], string> = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    completed: "Hoàn thành",
    rejected: "Từ chối",
  };
  return labels[status];
};
