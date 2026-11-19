#!/usr/bin/env node
/**
 * Daily lead & feedback report script for NIFS India.
 * Generates summary metrics, exports today's leads to CSV, and sends via WAHA.
 *
 * Usage:
 *   node scripts/lead-report.mjs [--dry-run] [--to <chatId>]
 */

import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Pool } = pg;

// Free course tag from src/components/sections/ergonomic-course/course-data.ts
const COURSE_TAG = "NIFS ES - Ergonomic Safety (Free)";
const DEFAULT_CHAT_ID = "120363424507737503@g.us";

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const toIndex = args.indexOf("--to");
  let chatId = DEFAULT_CHAT_ID;
  if (toIndex !== -1 && args[toIndex + 1]) {
    chatId = args[toIndex + 1];
  }
  return { dryRun, chatId };
}

function getDatabaseUrl() {
  let dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    const envLocalPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, "utf8");
      const match = content.match(/^DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/m);
      if (match) {
        dbUrl = match[1].trim();
      }
    }
  }
  if (!dbUrl) {
    console.error("Error: DATABASE_URL not found in environment or .env.local");
    process.exit(1);
  }
  return dbUrl;
}

function getWahaApiKey() {
  const wahaEnvPath = "C:\\claude code\\triv-v2\\.env";
  if (!fs.existsSync(wahaEnvPath)) {
    throw new Error(`WAHA env file not found at ${wahaEnvPath}`);
  }
  const content = fs.readFileSync(wahaEnvPath, "utf8");
  const match = content.match(/^WAHA_API_KEY=(.+)$/m);
  if (!match || !match[1].trim()) {
    throw new Error(`WAHA_API_KEY not found in ${wahaEnvPath}`);
  }
  return match[1].trim();
}

function csvEscape(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

async function main() {
  const { dryRun, chatId } = parseArgs();
  const dbUrl = getDatabaseUrl();
  const pool = new Pool({ connectionString: dbUrl });

  try {
    // 1. New leads today: count unique phones, split by free course vs website enquiries
    // Window: today 00:00 to now, Asia/Kolkata
    const newLeadsRes = await pool.query(
      `
      SELECT
        COUNT(DISTINCT phone) AS total_leads,
        COUNT(DISTINCT phone) FILTER (WHERE course != $1) AS website_leads,
        COUNT(DISTINCT phone) FILTER (WHERE course = $1) AS free_course_leads
      FROM nifs.enquiries
      WHERE status = 'submitted'
        AND ((created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Kolkata') >= date_trunc('day', NOW() AT TIME ZONE 'Asia/Kolkata')
      `,
      [COURSE_TAG]
    );

    const totalNewLeads = parseInt(newLeadsRes.rows[0]?.total_leads || "0", 10);
    const websiteLeads = parseInt(newLeadsRes.rows[0]?.website_leads || "0", 10);
    const freeCourseLeads = parseInt(newLeadsRes.rows[0]?.free_course_leads || "0", 10);

    // 2. Feedback saved today from nifs.lead_feedback:
    // count per outcome and per reason using each enquiry's LATEST row; per staff_name number of leads updated.
    const feedbackTodayRes = await pool.query(`
      WITH latest_today_feedback AS (
        SELECT DISTINCT ON (enquiry_id)
          enquiry_id,
          outcome,
          reason,
          staff_name,
          created_at
        FROM nifs.lead_feedback
        WHERE ((created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Kolkata') >= date_trunc('day', NOW() AT TIME ZONE 'Asia/Kolkata')
        ORDER BY enquiry_id, created_at DESC, id DESC
      )
      SELECT outcome, reason, staff_name
      FROM latest_today_feedback
    `);

    const feedbackRows = feedbackTodayRes.rows;
    const counsellorUpdatesCount = feedbackRows.length;

    const outcomeCounts = {};
    const reasonCounts = {};
    const staffCounts = {};

    for (const row of feedbackRows) {
      if (row.outcome) {
        outcomeCounts[row.outcome] = (outcomeCounts[row.outcome] || 0) + 1;
      }
      if (row.reason) {
        reasonCounts[row.reason] = (reasonCounts[row.reason] || 0) + 1;
      }
      if (row.staff_name && row.staff_name.trim()) {
        const staff = row.staff_name.trim();
        staffCounts[staff] = (staffCounts[staff] || 0) + 1;
      }
    }

    // 3. "Waiting": leads received in the last 7 days that have NO feedback row at all (count)
    const waitingRes = await pool.query(`
      SELECT COUNT(*) AS waiting_count
      FROM nifs.enquiries e
      WHERE e.status = 'submitted'
        AND ((e.created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Kolkata') >= (NOW() AT TIME ZONE 'Asia/Kolkata' - interval '7 days')
        AND NOT EXISTS (
          SELECT 1 FROM nifs.lead_feedback fb WHERE fb.enquiry_id = e.id
        )
    `);
    const waitingCount = parseInt(waitingRes.rows[0]?.waiting_count || "0", 10);

    // 4. Fetch all today's leads with latest feedback for the CSV attachment
    const todayLeadsRes = await pool.query(
      `
      SELECT
        e.id,
        e.name,
        e.phone,
        e.course,
        e.city,
        e.created_at AT TIME ZONE 'UTC' AS created_at,
        fb.outcome,
        fb.reason,
        fb.note,
        fb.staff_name,
        fb.feedback_created_at
      FROM nifs.enquiries e
      LEFT JOIN LATERAL (
        SELECT outcome, reason, note, staff_name, created_at AT TIME ZONE 'UTC' AS feedback_created_at
        FROM nifs.lead_feedback
        WHERE enquiry_id = e.id
        ORDER BY created_at DESC, id DESC
        LIMIT 1
      ) fb ON true
      WHERE e.status = 'submitted'
        AND ((e.created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Kolkata') >= date_trunc('day', NOW() AT TIME ZONE 'Asia/Kolkata')
      ORDER BY e.created_at DESC
      `
    );
    const todayLeads = todayLeadsRes.rows;

    // Date strings in Asia/Kolkata
    const now = new Date();
    const dateFormatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(now);

    const dateFileStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    // 5. Assemble WhatsApp message text
    const lines = [];
    lines.push(`*NIFS Leads - ${dateFormatted}*`);

    if (totalNewLeads > 0) {
      lines.push(`New leads today: ${totalNewLeads} (Website ${websiteLeads}, Free course ${freeCourseLeads})`);
    } else {
      lines.push("New leads today: 0");
    }

    if (counsellorUpdatesCount > 0) {
      lines.push(`Counsellor updates today: ${counsellorUpdatesCount}`);

      // Order of outcomes as defined in standard admissions workflow
      const OUTCOME_ORDER = [
        "Joined",
        "Visit booked",
        "Interested",
        "Call back later",
        "No answer",
        "Not interested",
      ];
      const outcomeParts = [];
      for (const outcome of OUTCOME_ORDER) {
        if (outcomeCounts[outcome] && outcomeCounts[outcome] > 0) {
          outcomeParts.push(`${outcome} ${outcomeCounts[outcome]}`);
        }
      }
      for (const [outcome, count] of Object.entries(outcomeCounts)) {
        if (!OUTCOME_ORDER.includes(outcome) && count > 0) {
          outcomeParts.push(`${outcome} ${count}`);
        }
      }
      if (outcomeParts.length > 0) {
        lines.push(outcomeParts.join(" | "));
      }

      const topReasons = Object.entries(reasonCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([reason, count]) => `${reason} ${count}`);
      if (topReasons.length > 0) {
        lines.push(`Top reasons: ${topReasons.join(", ")}`);
      }

      const counsellorList = Object.entries(staffCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([staff, count]) => `${staff} ${count}`);
      if (counsellorList.length > 0) {
        lines.push(`By counsellor: ${counsellorList.join(", ")}`);
      }
    }

    if (waitingCount > 0) {
      lines.push(`Leads waiting for feedback (last 7 days): ${waitingCount}`);
    }

    if (todayLeads.length > 0) {
      lines.push("Full list attached.");
    }

    const messageText = lines.join("\n");

    // 6. Generate CSV
    const outDir = path.resolve(process.cwd(), "scripts", "out");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const csvFilename = `NIFS-leads-${dateFileStr}.csv`;
    const csvPath = path.join(outDir, csvFilename);

    const csvHeaders = [
      "Date",
      "Name",
      "Phone",
      "Course",
      "Source",
      "City",
      "Outcome",
      "Reason",
      "Note",
      "Updated by",
      "Updated at",
    ];
    const headerRow = csvHeaders.map(csvEscape).join(",");

    const dataRows = todayLeads.map((row) => {
      const dateStr = row.created_at
        ? new Date(row.created_at).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          })
        : "";
      const source = row.course === COURSE_TAG ? "Free course" : "Website";
      const updatedAtStr = row.feedback_created_at
        ? new Date(row.feedback_created_at).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          })
        : "";

      return [
        csvEscape(dateStr),
        csvEscape(row.name ?? ""),
        csvEscape(row.phone ?? ""),
        csvEscape(row.course ?? ""),
        csvEscape(source),
        csvEscape(row.city ?? ""),
        csvEscape(row.outcome ?? ""),
        csvEscape(row.reason ?? ""),
        csvEscape(row.note ?? ""),
        csvEscape(row.staff_name ?? ""),
        csvEscape(updatedAtStr),
      ].join(",");
    });

    // UTF-8 BOM (\uFEFF) for Microsoft Excel compatibility
    const csvContent = "\uFEFF" + [headerRow, ...dataRows].join("\r\n");
    fs.writeFileSync(csvPath, csvContent, "utf8");

    if (dryRun) {
      console.log(messageText);
      console.log();
      console.log(`CSV path: ${csvPath}`);
      console.log(`CSV row count: ${todayLeads.length}`);
      return;
    }

    // 7. Send via WAHA (only when not --dry-run)
    const apiKey = getWahaApiKey();
    const wahaBase = "http://127.0.0.1:3001/api";

    // Send text
    let textRes;
    try {
      textRes = await fetch(`${wahaBase}/sendText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          session: "default",
          chatId,
          text: messageText,
        }),
      });
    } catch (err) {
      console.error(`WAHA is down or unreachable: ${err.message}`);
      process.exit(1);
    }

    if (!textRes.ok) {
      const errText = await textRes.text().catch(() => "");
      console.error(`WAHA sendText failed (HTTP ${textRes.status}): ${errText}`);
      process.exit(1);
    }

    // Send file
    const fileBase64 = fs.readFileSync(csvPath).toString("base64");
    let fileRes;
    try {
      fileRes = await fetch(`${wahaBase}/sendFile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          session: "default",
          chatId,
          file: {
            mimetype: "text/csv",
            filename: csvFilename,
            data: fileBase64,
          },
          caption: "",
        }),
      });
    } catch (err) {
      console.error(`WAHA is down or unreachable during sendFile: ${err.message}`);
      process.exit(1);
    }

    if (!fileRes.ok) {
      const errText = await fileRes.text().catch(() => "");
      console.error(`WAHA sendFile failed (HTTP ${fileRes.status}): ${errText}`);
      process.exit(1);
    }

    console.log(`Report sent successfully to ${chatId}`);
  } catch (err) {
    console.error("Script execution failed:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
