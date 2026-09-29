import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db/client";
import { courseRegistrations as t } from "@/lib/db/schema";
import { PrintButton } from "./print-button";

// A4 landscape certificate, pre-filled. Open, press Print, choose "Save as PDF", then email it.
export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isInteger(n)) notFound();
  const [r] = await db.select().from(t).where(eq(t.id, n)).limit(1);
  if (!r || !r.examSubmittedAt) notFound();

  const date = r.examSubmittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const certNo = `NIFS-ES-${String(r.id).padStart(5, "0")}`;

  return (
    <div className="cert-root">
      <style>{`
        @page{size:A4 landscape;margin:0}
        .cert-root{display:flex;flex-direction:column;align-items:center;gap:16px}
        .cert{width:297mm;height:210mm;background:#FAF8F4;color:#141414;position:relative;padding:14mm;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .cert .frame{position:absolute;inset:8mm;border:1.5px solid #DC1711}.cert .frame2{position:absolute;inset:10.5mm;border:1px solid #d9d3c7}
        .cert .body{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center;padding:6mm 10mm}
        .serif{font-family:'Playfair Display',Georgia,serif;font-style:italic}
        .eyebrow{font-size:9pt;letter-spacing:.28em;text-transform:uppercase;color:#DC1711;font-weight:600}
        @media print{nav,aside,.no-print{display:none!important}main{padding:0!important;overflow:visible!important}body{background:#FAF8F4!important}.cert-root{display:block}}
      `}</style>
      <div className="no-print flex items-center gap-4 text-sm">
        <PrintButton />
        <span className="text-[var(--dash-text-muted)]">Choose &ldquo;Save as PDF&rdquo;, then email it to {r.email}</span>
      </div>

      <div className="cert">
        <div className="frame" />
        <div className="frame2" />
        <div className="body">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nifs-official-logo-v3.png" alt="NIFS" style={{ width: "26mm", margin: "0 auto" }} />
            <p className="eyebrow" style={{ marginTop: "4mm" }}>National Institute of Fire &amp; Safety</p>
          </div>
          <div>
            <p className="serif" style={{ fontSize: "40pt", lineHeight: 1.1, margin: 0 }}>Certificate of Completion</p>
            <p style={{ margin: "6mm 0 3mm", fontSize: "11pt", color: "#6b675f" }}>This is to certify that</p>
            <p className="serif" style={{ fontSize: "34pt", lineHeight: 1.1, margin: 0, color: "#DC1711" }}>{r.name}</p>
            <p style={{ margin: "6mm auto 0", maxWidth: "190mm", fontSize: "12pt", lineHeight: 1.6 }}>
              has successfully completed the free online course <strong>Ergonomic Safety (NIFS ES)</strong>, including the assignment and the final assessment, scoring <strong>{r.score ?? 0} out of 20</strong>.
            </p>
          </div>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end", fontSize: "9.5pt" }}>
            <div style={{ textAlign: "left" }}><p style={{ margin: 0 }}>Date</p><p style={{ margin: 0, fontWeight: 600 }}>{date}</p></div>
            <div><p className="serif" style={{ margin: 0, fontSize: "11pt" }}>Certificate no. {certNo}</p><p style={{ margin: 0, color: "#6b675f" }}>nifsindia.net</p></div>
            <div style={{ textAlign: "right" }}><div style={{ borderTop: "1px solid #141414", width: "52mm", marginBottom: "2mm", marginLeft: "auto" }} /><p style={{ margin: 0 }}>Authorised signatory</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
