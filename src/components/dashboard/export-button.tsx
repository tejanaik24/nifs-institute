"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";

interface ExportColumn {
  key: string;
  label: string;
}

interface ExportButtonProps {
  data: Record<string, any>[];
  filename?: string;
  columns?: ExportColumn[];
  label?: string;
}

export function ExportButton({
  data,
  filename = "nifs-export",
  columns,
  label = "Export to Excel / CSV",
}: ExportButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No records to export.");
      return;
    }

    // Determine columns to export
    const cols: ExportColumn[] =
      columns ||
      Object.keys(data[0] || {}).map((k) => ({
        key: k,
        label: k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, " $1"),
      }));

    // Generate CSV Header
    const headers = cols.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(",");

    // Generate CSV Rows
    const rows = data.map((row) =>
      cols
        .map((c) => {
          let val = row[c.key];
          if (val instanceof Date) {
            val = val.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            });
          } else if (val === null || val === undefined) {
            val = "";
          }
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(",")
    );

    // UTF-8 BOM (\uFEFF) ensures proper rendering in Microsoft Excel for all character encodings
    const csvContent = "\uFEFF" + [headers, ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().split("T")[0];
    link.href = url;
    link.setAttribute("download", `${filename}-${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-[var(--dash-border)] bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-xs transition-all hover:border-[#DC1711] hover:bg-red-50 hover:text-[#DC1711] cursor-pointer"
      title="Download spreadsheet (compatible with Microsoft Excel, Google Sheets)"
    >
      {downloaded ? (
        <>
          <Check size={14} className="text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Downloaded CSV!</span>
        </>
      ) : (
        <>
          <Download size={14} className="text-[#DC1711]" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
