import { useState } from "react";
import { Button, Space } from "antd";
import type { Document } from "./data/document";
import DocumentDetailsDrawer from "./components/DocumentDetailsDrawer";

// todo: remove mock functionality
const mockDocument: Document = {
  id: "1",
  documentNumber: "CV-2024/1234-UBND",
  issuingAuthority: "Ủy ban Nhân dân Thành phố Hà Nội",
  documentDate: "15/11/2024",
  excerpt:
    "Về việc triển khai kế hoạch phát triển kinh tế - xã hội năm 2025, đẩy mạnh cải cách hành chính và nâng cao chất lượng dịch vụ công trực tuyến cho người dân và doanh nghiệp trên địa bàn thành phố. Văn bản này yêu cầu các cơ quan, đơn vị liên quan chuẩn bị báo cáo chi tiết về tình hình thực hiện nhiệm vụ trong năm qua và đề xuất phương hướng hoạt động cho năm tiếp theo.",
  documentType: "Công văn",
  urgencyLevel: "urgent",
  deadline: "30/11/2024",
  arrivalDate: "16/11/2024",
  field: "Hành chính",
  securityLevel: "internal",
  status: "processing",
  transferMethod: "Văn thư điện tử",
  backupMethod: "Lưu trữ số",
  signatoryName: "Nguyễn Văn An",
  signatoryPosition: "Phó Chủ tịch UBND",
  attachments: [
    {
      id: "att1",
      fileName: "Ke_hoach_2025.pdf",
      fileSize: 2458624,
      pageCount: 15,
      fileType: "pdf",
      url: "/files/ke-hoach-2025.pdf",
    },
    {
      id: "att2",
      fileName: "Phu_luc_so_lieu.xlsx",
      fileSize: 524288,
      pageCount: 3,
      fileType: "xlsx",
      url: "/files/phu-luc.xlsx",
    },
    {
      id: "att3",
      fileName: "Bieu_mau_bao_cao.docx",
      fileSize: 156432,
      pageCount: 5,
      fileType: "docx",
      url: "/files/bieu-mau.docx",
    },
  ],
  relatedDocuments: [
    {
      id: "rel1",
      documentNumber: "QD-2023/456-UBND",
      title: "Quyết định phê duyệt kế hoạch 2024",
    },
    {
      id: "rel2",
      documentNumber: "BC-2024/789-STC",
      title: "Báo cáo tình hình ngân sách",
    },
  ],
};

// todo: remove mock functionality
const mockDocumentNoAttachments: Document = {
  ...mockDocument,
  id: "2",
  documentNumber: "TB-2024/5678-BTC",
  issuingAuthority: "Bộ Tài chính",
  urgencyLevel: "very_urgent",
  securityLevel: "confidential",
  status: "pending",
  attachments: [],
  relatedDocuments: [],
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<Document | null>(null);

  const showDrawer = (doc: Document, withLoading = false) => {
    if (withLoading) {
      setLoading(true);
      setOpen(true);
      setCurrentDoc(null);
      setTimeout(() => {
        setCurrentDoc(doc);
        setLoading(false);
      }, 1500);
    } else {
      setCurrentDoc(doc);
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
    setCurrentDoc(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 text-gray-900">
            Document Details Drawer
          </h1>
          <p className="text-gray-500">
            Component hiển thị chi tiết văn bản với 2 tab: Thông tin chung và
            Xem trước file đính kèm.
          </p>
        </div>

        <Space wrap size="middle">
          <Button
            type="primary"
            size="large"
            onClick={() => showDrawer(mockDocument)}
            data-testid="button-open-drawer-full"
          >
            Mở Drawer (Đầy đủ)
          </Button>
          <Button
            size="large"
            onClick={() => showDrawer(mockDocumentNoAttachments)}
            data-testid="button-open-drawer-no-attachments"
          >
            Mở Drawer (Không có file)
          </Button>
          <Button
            size="large"
            onClick={() => showDrawer(mockDocument, true)}
            data-testid="button-open-drawer-loading"
          >
            Mở Drawer (Loading)
          </Button>
        </Space>

        <DocumentDetailsDrawer
          open={open}
          onClose={onClose}
          document={currentDoc}
          loading={loading}
        />
      </div>
    </div>
  );
}
