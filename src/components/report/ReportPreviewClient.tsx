"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createReportDataFromStudentWork, getReportReadiness } from "@/lib/reportData";
import { loadStudentWork } from "@/lib/studentWorkStorage";
import type { StudentWork } from "@/types/studentWork";
import { MockReport } from "./MockReport";

export function ReportPreviewClient() {
  const [source, setSource] = useState<"default" | "saved">("default");
  const [work, setWork] = useState<StudentWork | null>(null);

  useEffect(() => {
    const loaded = loadStudentWork();
    setSource(loaded.source);
    setWork(loaded.work);
  }, []);

  const report = useMemo(() => work ? createReportDataFromStudentWork(work) : null, [work]);
  const readiness = useMemo(() => work ? getReportReadiness(work) : null, [work]);

  if (!work || !report || !readiness) {
    return (
      <main className="report-preview-shell">
        <div className="report-loading">Preparing report preview...</div>
      </main>
    );
  }

  return (
    <>
      <ReportStatusBanner readiness={readiness} source={source} />
      <MockReport
        report={report}
        source={source}
        readiness={readiness}
        toolbarActions={<button className="report-print-button" onClick={() => printReport(report)} type="button">Download PDF</button>}
      />
    </>
  );
}

function printReport(report: ReturnType<typeof createReportDataFromStudentWork>) {
  const originalTitle = document.title;
  document.title = createPdfFileName(report);
  window.print();

  window.setTimeout(() => {
    document.title = originalTitle;
  }, 750);
}

function createPdfFileName(report: ReturnType<typeof createReportDataFromStudentWork>) {
  const name = sanitizeFilePart(report.student.name);
  const group = sanitizeFilePart(report.student.chosenGroupSlug);

  return `${name || "student"}-${group || "ancient-human-relatives"}-field-report`;
}

function sanitizeFilePart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ReportStatusBanner({
  readiness,
  source,
}: {
  readiness: ReturnType<typeof getReportReadiness>;
  source: "default" | "saved";
}) {
  const missingPreview = readiness.missingItems.slice(0, 5);
  const remainingCount = readiness.missingItems.length - missingPreview.length;

  return (
    <div className="report-status-banner print:hidden">
      <div>
        <strong>{source === "saved" ? "Using saved web quest answers" : "No saved web quest answers found"}</strong>
        <p>
          {readiness.status === "complete"
            ? "The preview is using the saved local work from this browser. Use Download PDF, then choose Save as PDF if your browser asks."
            : "The report still renders with placeholders where answers are missing. You can export a draft, but finish the missing items first for submission."}
        </p>
        {readiness.status === "incomplete" && (
          <p>
            Missing: {missingPreview.join(", ")}
            {remainingCount > 0 ? ` and ${remainingCount} more` : ""}.
          </p>
        )}
      </div>
      <Link href="/quest">Return to web quest</Link>
    </div>
  );
}
