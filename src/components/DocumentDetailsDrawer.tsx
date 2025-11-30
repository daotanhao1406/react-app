import { useState } from "react";
import {
  Drawer,
  Tabs,
  Tag,
  Badge,
  Typography,
  Divider,
  Empty,
  Space,
  Button,
  Skeleton,
  Avatar,
  ConfigProvider,
} from "antd";
import {
  FileOutlined,
  DownloadOutlined,
  EyeOutlined,
  LinkOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  SendOutlined,
  BuildOutlined,
  FieldTimeOutlined,
  FolderOutlined,
  LockOutlined,
  SwapOutlined,
  CloudUploadOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileImageOutlined,
  PaperClipOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { Document, Attachment } from "../data/document";
import {
  formatFileSize,
  getUrgencyLabel,
  getSecurityLabel,
  getStatusLabel,
} from "../data/document";

const { Text, Paragraph } = Typography;

interface DocumentDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  document: Document | null;
  loading?: boolean;
}

const customTheme = {
  token: {
    colorTextSecondary: "#f0b90b",
    colorTextDescription: "#f0b90b",
  },
};

const getUrgencyTagStatus = (level: Document["urgencyLevel"]) => {
  const statusMap: Record<
    Document["urgencyLevel"],
    "default" | "warning" | "error"
  > = {
    normal: "default",
    urgent: "warning",
    very_urgent: "error",
  };
  return statusMap[level];
};

const getSecurityTagStatus = (level: Document["securityLevel"]) => {
  const statusMap: Record<
    Document["securityLevel"],
    "default" | "processing" | "warning" | "error"
  > = {
    public: "default",
    internal: "processing",
    confidential: "warning",
    secret: "error",
  };
  return statusMap[level];
};

const getStatusBadgeStatus = (status: Document["status"]) => {
  const statusMap: Record<
    Document["status"],
    "default" | "processing" | "success" | "error"
  > = {
    pending: "default",
    processing: "processing",
    completed: "success",
    rejected: "error",
  };
  return statusMap[status];
};

const getFileIcon = (fileType: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    pdf: <FilePdfOutlined />,
    xlsx: <FileExcelOutlined />,
    xls: <FileExcelOutlined />,
    docx: <FileWordOutlined />,
    doc: <FileWordOutlined />,
    png: <FileImageOutlined />,
    jpg: <FileImageOutlined />,
    jpeg: <FileImageOutlined />,
  };
  return iconMap[fileType.toLowerCase()] || <FileOutlined />;
};

function InfoItem({
  label,
  value,
  icon,
  fullWidth = false,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-xs opacity-40">{icon}</span>}
        <span className="text-xs uppercase tracking-wider opacity-50">
          {label}
        </span>
      </div>
      <div>{value}</div>
    </div>
  );
}

function InfoGroup({
  children,
  columns = 2,
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-x-8 gap-y-5`}>
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="opacity-50">{icon}</span>
      <Text strong className="!text-sm uppercase tracking-wide opacity-70">
        {title}
      </Text>
    </div>
  );
}

function GeneralInfoTab({ document }: { document: Document }) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader title="Thông Tin Văn Bản" icon={<FileTextOutlined />} />
        <InfoGroup columns={2}>
          <InfoItem
            label="Số ký hiệu"
            icon={<FileTextOutlined />}
            value={
              <Text strong className="!text-base">
                {document.documentNumber}
              </Text>
            }
          />
          <InfoItem
            label="Loại văn bản"
            icon={<FolderOutlined />}
            value={<Tag>{document.documentType}</Tag>}
          />
          <InfoItem
            label="Đơn vị ban hành"
            icon={<BuildOutlined />}
            value={<Text>{document.issuingAuthority}</Text>}
            fullWidth
          />
          <InfoItem
            label="Ngày văn bản"
            icon={<CalendarOutlined />}
            value={<Text>{document.documentDate}</Text>}
          />
        </InfoGroup>
      </section>

      <Divider className="!my-0" />

      <section>
        <SectionHeader title="Thông Tin Xử Lý" icon={<ClockCircleOutlined />} />
        <InfoGroup columns={2}>
          <InfoItem
            label="Độ khẩn cấp"
            icon={<FieldTimeOutlined />}
            value={
              <Tag color={getUrgencyTagStatus(document.urgencyLevel)}>
                {getUrgencyLabel(document.urgencyLevel)}
              </Tag>
            }
          />
          <InfoItem
            label="Trạng thái"
            icon={<ClockCircleOutlined />}
            value={
              <Badge
                status={getStatusBadgeStatus(document.status)}
                text={getStatusLabel(document.status)}
              />
            }
          />
          <InfoItem
            label="Ngày đến"
            icon={<CalendarOutlined />}
            value={<Text>{document.arrivalDate}</Text>}
          />
          <InfoItem
            label="Hạn xử lý"
            icon={<CalendarOutlined />}
            value={<Text>{document.deadline}</Text>}
          />
        </InfoGroup>
      </section>

      <Divider className="!my-0" />

      <section>
        <SectionHeader
          title="Phân Loại & Chuyển Giao"
          icon={<SafetyCertificateOutlined />}
        />
        <InfoGroup columns={2}>
          <InfoItem
            label="Lĩnh vực"
            icon={<FolderOutlined />}
            value={<Tag>{document.field}</Tag>}
          />
          <InfoItem
            label="Độ mật"
            icon={<LockOutlined />}
            value={
              <Tag color={getSecurityTagStatus(document.securityLevel)}>
                {getSecurityLabel(document.securityLevel)}
              </Tag>
            }
          />
          <InfoItem
            label="Hình thức chuyển"
            icon={<SwapOutlined />}
            value={<Text>{document.transferMethod}</Text>}
          />
          <InfoItem
            label="Hình thức sao lưu"
            icon={<CloudUploadOutlined />}
            value={<Text>{document.backupMethod}</Text>}
          />
        </InfoGroup>
      </section>

      <Divider className="!my-0" />

      <section>
        <SectionHeader title="Trích Yếu Nội Dung" icon={<FileTextOutlined />} />
        <div className="rounded-lg p-4 bg-black/[0.02] dark:bg-white/[0.02]">
          <Paragraph
            ellipsis={{ rows: 4, expandable: true, symbol: "Xem thêm" }}
            className="!mb-0 !leading-relaxed"
          >
            {document.excerpt}
          </Paragraph>
        </div>
      </section>

      <Divider className="!my-0" />

      <section>
        <SectionHeader title="Thông Tin Người Ký" icon={<UserOutlined />} />
        <div className="flex items-center gap-4">
          <Avatar size={52} icon={<UserOutlined />} className="shrink-0" />
          <div className="space-y-0.5">
            <Text strong className="!text-base block">
              {document.signatoryName}
            </Text>
            <Text type="secondary" className="!text-sm">
              {document.signatoryPosition}
            </Text>
          </div>
        </div>
      </section>

      <Divider className="!my-0" />

      <section>
        <SectionHeader title="File Đính Kèm" icon={<PaperClipOutlined />} />
        <div className="flex items-center gap-4">
          <Badge count={document.attachments.length} showZero>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
              <FileOutlined className="text-2xl opacity-60" />
            </div>
          </Badge>
          <div className="flex-1">
            <Text strong className="block">
              {document.attachments.length} file đính kèm
            </Text>
            <Text type="secondary" className="!text-sm">
              Tổng dung lượng:{" "}
              {formatFileSize(
                document.attachments.reduce(
                  (acc, file) => acc + file.fileSize,
                  0
                )
              )}
            </Text>
          </div>
          {document.attachments.length > 0 && (
            <Button type="text" icon={<RightOutlined />}>
              Xem
            </Button>
          )}
        </div>
      </section>

      <Divider className="!my-0" />

      <section>
        <SectionHeader title="Văn Bản Liên Quan" icon={<LinkOutlined />} />
        {document.relatedDocuments.length > 0 ? (
          <div className="space-y-2">
            {document.relatedDocuments.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
                onClick={() => console.log("Navigate to:", item.id)}
                data-testid={`link-related-doc-${item.id}`}
              >
                <LinkOutlined className="opacity-40 shrink-0" />
                <div className="flex-1 min-w-0">
                  <Text strong className="block truncate text-sm">
                    {item.documentNumber}
                  </Text>
                  <Text type="secondary" className="!text-xs block truncate">
                    {item.title}
                  </Text>
                </div>
                <RightOutlined className="opacity-30 text-xs" />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Text type="secondary">Không có văn bản liên quan</Text>
              }
            />
          </div>
        )}
      </section>
    </div>
  );
}

function AttachmentCard({
  attachment,
  isSelected,
  onSelect,
}: {
  attachment: Attachment;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
        isSelected
          ? "bg-black/[0.04] dark:bg-white/[0.06] ring-1 ring-black/10 dark:ring-white/10"
          : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
      }`}
      onClick={onSelect}
      data-testid={`select-attachment-${attachment.id}`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] shrink-0">
        <span className="text-xl opacity-60">
          {getFileIcon(attachment.fileType)}
        </span>
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <Text strong className="block truncate">
          {attachment.fileName}
        </Text>
        <div className="flex items-center gap-2 flex-wrap">
          <Text type="secondary" className="!text-xs">
            {attachment.pageCount} trang
          </Text>
          <span className="opacity-20">•</span>
          <Text type="secondary" className="!text-xs">
            {formatFileSize(attachment.fileSize)}
          </Text>
          <span className="opacity-20">•</span>
          <Text type="secondary" className="!text-xs uppercase">
            {attachment.fileType}
          </Text>
        </div>
      </div>
      <Space size="small">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Preview file:", attachment.fileName);
          }}
          data-testid={`button-preview-${attachment.id}`}
        />
        <Button
          type="text"
          size="small"
          icon={<DownloadOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Download file:", attachment.fileName);
          }}
          data-testid={`button-download-${attachment.id}`}
        />
      </Space>
    </div>
  );
}

function PreviewTab({ document }: { document: Document }) {
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(
    document.attachments.length > 0 ? document.attachments[0] : null
  );

  if (document.attachments.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="space-y-1 text-center">
              <Text>Không có file đính kèm</Text>
              <br />
              <Text type="secondary" className="!text-xs">
                Văn bản này không có file đính kèm nào
              </Text>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Text strong className="!text-sm uppercase tracking-wide opacity-70">
            Danh Sách File ({document.attachments.length})
          </Text>
          <Button
            type="link"
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => console.log("Download all files")}
          >
            Tải tất cả
          </Button>
        </div>
        <div className="space-y-2">
          {document.attachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              attachment={attachment}
              isSelected={selectedFile?.id === attachment.id}
              onSelect={() => setSelectedFile(attachment)}
            />
          ))}
        </div>
      </div>

      {selectedFile && (
        <>
          <Divider className="!my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="opacity-60">
                  {getFileIcon(selectedFile.fileType)}
                </span>
                <Text strong>{selectedFile.fileName}</Text>
              </div>
              <Button
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => console.log("Download:", selectedFile.fileName)}
                data-testid="button-download-preview"
              >
                Tải xuống
              </Button>
            </div>
            <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.02] p-8">
              <div className="flex flex-col items-center justify-center py-12 space-y-5">
                <div className="flex items-center justify-center w-24 h-24 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10">
                  <span className="text-5xl opacity-30">
                    {getFileIcon(selectedFile.fileType)}
                  </span>
                </div>
                <div className="text-center space-y-1">
                  <Text className="block">{selectedFile.fileName}</Text>
                  <Text type="secondary" className="!text-sm">
                    {selectedFile.pageCount} trang •{" "}
                    {formatFileSize(selectedFile.fileSize)}
                  </Text>
                </div>
                <Button type="primary" icon={<EyeOutlined />} size="large">
                  Mở xem trước
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton.Input active size="small" style={{ width: 120 }} />
        <div className="grid grid-cols-2 gap-5">
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
        </div>
      </div>
      <Divider />
      <div className="space-y-4">
        <Skeleton.Input active size="small" style={{ width: 140 }} />
        <div className="grid grid-cols-2 gap-5">
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
        </div>
      </div>
      <Divider />
      <div className="space-y-4">
        <Skeleton.Input active size="small" style={{ width: 100 }} />
        <Skeleton active paragraph={{ rows: 3 }} title={false} />
      </div>
    </div>
  );
}

export default function DocumentDetailsDrawer({
  open,
  onClose,
  document,
  loading = false,
}: DocumentDetailsDrawerProps) {
  const tabItems = document
    ? [
        {
          key: "general",
          label: (
            <span
              className="flex items-center gap-2"
              data-testid="tab-general-info"
            >
              <FileTextOutlined />
              Thông Tin Chung
            </span>
          ),
          children: <GeneralInfoTab document={document} />,
        },
        {
          key: "preview",
          label: (
            <span className="flex items-center gap-2" data-testid="tab-preview">
              <PaperClipOutlined />
              Xem Trước File
              {document.attachments.length > 0 && (
                <Badge count={document.attachments.length} size="small" />
              )}
            </span>
          ),
          children: <PreviewTab document={document} />,
        },
      ]
    : [];

  return (
    <ConfigProvider theme={customTheme}>
      <Drawer
        title={
          document ? (
            <div className="flex items-center gap-2">
              <SendOutlined />
              <span>{document.documentNumber}</span>
            </div>
          ) : (
            "Chi tiết văn bản"
          )
        }
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
        destroyOnClose
        data-testid="drawer-document-details"
        extra={
          document && (
            <Badge
              status={getStatusBadgeStatus(document.status)}
              text={getStatusLabel(document.status)}
            />
          )
        }
      >
        {loading ? (
          <LoadingSkeleton />
        ) : document ? (
          <Tabs
            defaultActiveKey="general"
            items={tabItems}
            className="document-drawer-tabs"
          />
        ) : (
          <Empty description="Không tìm thấy thông tin văn bản" />
        )}
      </Drawer>
    </ConfigProvider>
  );
}
