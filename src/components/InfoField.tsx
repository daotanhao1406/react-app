import React from "react";

export default function InfoField({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <span className="text-sm text-gray-500 sm:w-36 flex-shrink-0">
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          highlight ? "text-[#3641f5]" : "text-gray-800"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
