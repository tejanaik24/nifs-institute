"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded bg-[#DC1711] px-4 py-2 font-medium text-white">
      Print / Save as PDF
    </button>
  );
}
