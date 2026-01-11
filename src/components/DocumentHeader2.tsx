import { Calendar, Hash } from "lucide-react";
function QuickStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl px-4 py-3 min-w-[160px]">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3641f5]/10 to-[#8b5cf6]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#3641f5]" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">
          {value}
        </p>
      </div>
    </div>
  );
}
export default function DocumentHeader2({ document }: { document?: any }) {
  return (
    <div className="flex">
      <div className="mb-14 relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#3641f5] text-white">
            {document.docLabel}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {document.docSourceNo}
          </span>
          {document.notation && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200 text-slate-500">
              {document.notation}
            </span>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-4xl">
          {document.brief}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
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
        </div>
      </div>
      <div className="flex lg:flex-col gap-3">
        <QuickStat
          icon={Hash}
          label="Số hiệu"
          value={document?.docNumber || "N/A"}
        />
        <QuickStat
          icon={Calendar}
          label="Ngày văn bản"
          value={document?.documentDate || "N/A"}
        />
        <QuickStat
          icon={Building2}
          label="Nguồn"
          value={document?.docSourceNo || "N/A"}
        />
      </div>
    </div>
  );
}
