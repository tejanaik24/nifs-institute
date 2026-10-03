import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db/client";
import { courseRegistrations as t } from "@/lib/db/schema";
import { CertificateToolbar } from "./certificate-toolbar";
import { KUSUMA_SIGNATURE_SRC } from "@/lib/data/kusuma-signature";

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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap');
        @page { size: A4 landscape; margin: 0; }
        .cert-root { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 24px 0; background: #EFECE6; min-height: 100vh; }
        .cert {
          width: 297mm;
          height: 210mm;
          background: #FAF7F0;
          color: #1C1917;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          padding: 13mm 14mm 11mm;
          box-shadow: 0 20px 50px rgba(0,0,0,0.18);
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .cert .frame-outer { position: absolute; inset: 7mm; border: 2.2px solid #8B1E1E; pointer-events: none; }
        .cert .frame-gold { position: absolute; inset: 9.5mm; border: 1.2px solid #C5A059; pointer-events: none; }
        .cert .frame-inner { position: absolute; inset: 11mm; border: 0.5px solid #E5DAC4; pointer-events: none; }
        .cert .corner { position: absolute; width: 14mm; height: 14mm; pointer-events: none; }
        .cert .corner-tl { top: 9mm; left: 9mm; border-top: 2.5px solid #8B1E1E; border-left: 2.5px solid #8B1E1E; }
        .cert .corner-tr { top: 9mm; right: 9mm; border-top: 2.5px solid #8B1E1E; border-right: 2.5px solid #8B1E1E; }
        .cert .corner-bl { bottom: 9mm; left: 9mm; border-bottom: 2.5px solid #8B1E1E; border-left: 2.5px solid #8B1E1E; }
        .cert .corner-br { bottom: 9mm; right: 9mm; border-bottom: 2.5px solid #8B1E1E; border-right: 2.5px solid #8B1E1E; }
        .cert .body {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          z-index: 2;
        }
        @media print {
          nav, aside, .no-print { display: none !important; }
          main { padding: 0 !important; overflow: visible !important; background: transparent !important; }
          body { background: #FAF7F0 !important; }
          .cert-root { display: block !important; padding: 0 !important; margin: 0 !important; background: transparent !important; }
          .cert { box-shadow: none !important; margin: 0 auto !important; }
        }
      `}</style>
      <CertificateToolbar
        id={r.id}
        email={r.email}
        initialSentAt={r.certificateSentAt}
      />


      <div className="cert">
        <div className="frame-outer" />
        <div className="frame-gold" />
        <div className="frame-inner" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        <div className="body">
          {/* Header & Crest */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/nifs-official-logo-v3.png"
              alt="National Institute of Fire & Safety"
              style={{ width: "42mm", height: "auto", margin: "0 auto", display: "block" }}
            />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10.5pt", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B1E1E", fontWeight: 700, margin: "2mm 0 0" }}>
              National Institute of Fire &amp; Safety
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.2pt", letterSpacing: "0.18em", textTransform: "uppercase", color: "#78716C", margin: "0.8mm 0 0", fontWeight: 600 }}>
              Government Recognized • Premier Occupational Safety &amp; Disaster Management Institute • Estd. 2004
            </p>
          </div>

          {/* Certificate Title & Recipient */}
          <div style={{ marginTop: "-1mm" }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "30pt", fontWeight: 800, letterSpacing: "0.04em", color: "#1C1917", margin: "0", lineHeight: 1 }}>
              Certificate of Completion
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "1.5mm auto 0", width: "130mm" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #C5A059)" }} />
              <span style={{ color: "#C5A059", fontSize: "7pt", letterSpacing: "0.2em" }}>✦ ✦ ✦</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #C5A059, transparent)" }} />
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "12pt", color: "#57534E", margin: "2.5mm 0 0.5mm" }}>
              This is to certify that
            </p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "26pt", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1E1E", margin: "0.8mm 0", lineHeight: 1.1 }}>
              {r.name.toUpperCase()}
            </h2>

            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "12pt", lineHeight: 1.45, maxWidth: "215mm", margin: "1.5mm auto 0", color: "#292524" }}>
              has successfully demonstrated academic proficiency and fulfilled all professional curriculum standards in the executive credential program for
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "13.5pt", fontWeight: 700, letterSpacing: "0.05em", color: "#1C1917", margin: "1.5mm 0 0.5mm" }}>
              OCCUPATIONAL ERGONOMIC SAFETY
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.8pt", letterSpacing: "0.14em", textTransform: "uppercase", color: "#78716C", margin: "0 0 1.5mm", fontWeight: 500 }}>
              Credential Code: NIFS-ES • Academic Evaluation Board Verified
            </p>

            {/* Academic Pathway Endorsement Card */}
            <div style={{ background: "#F4EEE4", border: "1px solid #D9CBAC", borderRadius: "2px", padding: "1.8mm 4.5mm", maxWidth: "205mm", margin: "1.5mm auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", textAlign: "left" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.6pt", lineHeight: 1.4, color: "#44403C", margin: 0 }}>
                <strong style={{ color: "#8B1E1E" }}>ACADEMIC CREDIT PATHWAY:</strong> This certified unit is officially recognized towards prior learning assessment and credit transfer for NIFS Sanctioned University Programs — eligible for fast-track enrollment into the <strong>Advance Diploma in Industrial Safety (ADIS)</strong> and <strong>B.Sc. (Fire &amp; Industrial Safety)</strong>.
              </p>
              <div style={{ borderLeft: "1px solid #C5A059", paddingLeft: "3.5mm", whiteSpace: "nowrap", textAlign: "right" }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.2pt", fontWeight: 700, color: "#8B1E1E", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Admissions Office</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.2pt", color: "#57534E", margin: 0, fontWeight: 500 }}>nifsindia.net/courses</p>
              </div>
            </div>
          </div>

          {/* Footer with Verification, Gold Seal & Digital Signature */}
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end", padding: "0 4mm 1mm" }}>
            {/* Left: Date & Credential ID */}
            <div style={{ textAlign: "left", width: "65mm" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.5pt", letterSpacing: "0.1em", textTransform: "uppercase", color: "#78716C", margin: "0 0 0.5mm" }}>Date of Issuance</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "8.5pt", fontWeight: 700, color: "#1C1917", margin: "0 0 2mm" }}>{date}</p>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "8pt", fontWeight: 700, color: "#8B1E1E", margin: 0 }}>{certNo}</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.5pt", color: "#78716C", margin: "0.5mm 0 0" }}>Verify: nifsindia.net</p>
            </div>

            {/* Center: Official Seal Medal */}
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <svg width="68" height="68" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                {/* Gold Rosette Starburst */}
                <circle cx="50" cy="50" r="46" fill="#FBF8F1" stroke="#C5A059" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="#8B1E1E" strokeWidth="1" strokeDasharray="2 1.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#C5A059" strokeWidth="1" />
                {/* Circular Ribbon Text */}
                <path id="sealPath" d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
                <text fontSize="7" fontFamily="'Cinzel', serif" fontWeight="700" fill="#8B1E1E" letterSpacing="2.2">
                  <textPath href="#sealPath" startOffset="50%" textAnchor="middle">
                    NIFS INDIA ★ VERIFIED CREDENTIAL ★
                  </textPath>
                </text>
                {/* Center Crest Star */}
                <polygon points="50,37 53,44 60,45 55,50 56,57 50,53 44,57 45,50 40,45 47,44" fill="#C5A059" />
                <text x="50" y="65" fontSize="5.5" fontFamily="'Montserrat', sans-serif" fontWeight="700" fill="#78716C" textAnchor="middle" letterSpacing="0.8">
                  ESTD 2004
                </text>
              </svg>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6pt", letterSpacing: "0.14em", textTransform: "uppercase", color: "#78716C", margin: "1mm 0 0", fontWeight: 600 }}>
                Official Institute Seal
              </p>
            </div>

            {/* Right: Signature */}
            <div style={{ textAlign: "center", width: "65mm" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={KUSUMA_SIGNATURE_SRC}
                alt="Authorised Signatory"
                style={{ width: "42mm", height: "auto", display: "block", margin: "0 auto -3mm" }}
              />
              <div style={{ borderTop: "1.2px solid #1C1917", width: "48mm", margin: "0 auto 1.5mm" }} />
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "8pt", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1C1917", margin: 0 }}>
                Authorised Signatory
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "6.2pt", color: "#78716C", margin: "0.5mm 0 0", fontWeight: 500 }}>
                Controller of Academics &amp; Certification
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

