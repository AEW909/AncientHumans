"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createReportDataFromStudentWork, getReportReadiness } from "@/lib/reportData";
import { loadStudentWork } from "@/lib/studentWorkStorage";
import type { StudentWork } from "@/types/studentWork";
import { MockReport } from "./MockReport";

type PdfState = "idle" | "confirming" | "generating" | "ready" | "error";
type GeneratedPdf = {
  name: string;
  url: string;
};

const loadingFacts = [
  "Checking every page image before the PDF is built.",
  "Freezing the report into eight A4 pages.",
  "Turning fossils, tools, DNA and debate into a downloadable file.",
  "Keeping the browser print fallback ready just in case.",
];

export function ReportPreviewClient() {
  const [source, setSource] = useState<"default" | "saved">("default");
  const [work, setWork] = useState<StudentWork | null>(null);
  const [pdfState, setPdfState] = useState<PdfState>("idle");
  const [generatedPdf, setGeneratedPdf] = useState<GeneratedPdf | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [loadingFactIndex, setLoadingFactIndex] = useState(0);

  useEffect(() => {
    const loaded = loadStudentWork();
    setSource(loaded.source);
    setWork(loaded.work);
  }, []);

  useEffect(() => {
    document.body.classList.add("report-preview-mode");

    return () => {
      document.body.classList.remove("report-preview-mode");
    };
  }, []);

  useEffect(() => {
    return () => {
      if (generatedPdf) {
        window.URL.revokeObjectURL(generatedPdf.url);
      }
    };
  }, [generatedPdf]);

  useEffect(() => {
    if (pdfState !== "generating") {
      return;
    }

    const timer = window.setInterval(() => {
      setLoadingFactIndex((index) => (index + 1) % loadingFacts.length);
    }, 1400);

    return () => window.clearInterval(timer);
  }, [pdfState]);

  const report = useMemo(() => work ? createReportDataFromStudentWork(work) : null, [work]);
  const readiness = useMemo(() => work ? getReportReadiness(work) : null, [work]);

  if (!work || !report || !readiness) {
    return (
      <main className="report-preview-shell">
        <div className="report-loading">Preparing report preview...</div>
      </main>
    );
  }

  async function handleGeneratePdf() {
    if (!report) {
      return;
    }

    setPdfState("generating");
    setPdfError(null);
    setLoadingFactIndex(0);

    try {
      if (window.localStorage.getItem("ancient-human-relatives-force-pdf-error") === "true") {
        throw new Error("Forced PDF failure for testing.");
      }

      const nextPdf = await generatePdfFromReport(report);

      setGeneratedPdf((current) => {
        if (current) {
          window.URL.revokeObjectURL(current.url);
        }

        return nextPdf;
      });
      setPdfState("ready");
    } catch (error) {
      setPdfError(error instanceof Error ? error.message : "Unknown PDF generation error.");
      setPdfState("error");
    }
  }

  return (
    <>
      <ReportStatusBanner readiness={readiness} source={source} />
      <MockReport
        report={report}
        source={source}
        readiness={readiness}
        toolbarActions={<button className="report-print-button" onClick={() => setPdfState("confirming")} type="button">Generate PDF</button>}
      />
      {pdfState !== "idle" && (
        <PdfGenerationDialog
          error={pdfError}
          generatedPdf={generatedPdf}
          loadingFact={loadingFacts[loadingFactIndex]}
          onBackToEdit={() => setPdfState("idle")}
          onConfirm={() => void handleGeneratePdf()}
          onPrintFallback={() => void printReport(report)}
          onReset={() => {
            setGeneratedPdf((current) => {
              if (current) {
                window.URL.revokeObjectURL(current.url);
              }

              return null;
            });
            setPdfError(null);
            setPdfState("idle");
          }}
          readiness={readiness}
          state={pdfState}
        />
      )}
    </>
  );
}

async function generatePdfFromReport(report: ReturnType<typeof createReportDataFromStudentWork>): Promise<GeneratedPdf> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const pages = Array.from(document.querySelectorAll<HTMLElement>(".report-page"));

  if (pages.length === 0) {
    throw new Error("No report pages were found.");
  }

  await waitForReportImages();

  document.body.classList.add("report-pdf-capture-mode");

  try {
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    const pdf = new jsPDF({
      compress: true,
      format: "a4",
      orientation: "portrait",
      unit: "mm",
    });

    for (let index = 0; index < pages.length; index += 1) {
      const canvas = await html2canvas(pages[index], {
        backgroundColor: null,
        logging: false,
        scale: Math.min(2, window.devicePixelRatio || 1.5),
        useCORS: true,
        windowHeight: pages[index].scrollHeight,
        windowWidth: pages[index].scrollWidth,
      });
      const imageData = canvas.toDataURL("image/jpeg", 0.92);

      if (index > 0) {
        pdf.addPage("a4", "portrait");
      }

      pdf.addImage(imageData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
    }

    const name = `${createPdfFileName(report)}.pdf`;
    const blob = pdf.output("blob");

    return {
      name,
      url: window.URL.createObjectURL(blob),
    };
  } finally {
    document.body.classList.remove("report-pdf-capture-mode");
  }
}

async function printReport(report: ReturnType<typeof createReportDataFromStudentWork>) {
  const originalTitle = document.title;
  document.title = createPdfFileName(report);
  await waitForReportImages();
  window.print();

  window.setTimeout(() => {
    document.title = originalTitle;
  }, 750);
}

function PdfGenerationDialog({
  error,
  generatedPdf,
  loadingFact,
  onBackToEdit,
  onConfirm,
  onPrintFallback,
  onReset,
  readiness,
  state,
}: {
  error: string | null;
  generatedPdf: GeneratedPdf | null;
  loadingFact: string;
  onBackToEdit: () => void;
  onConfirm: () => void;
  onPrintFallback: () => void;
  onReset: () => void;
  readiness: ReturnType<typeof getReportReadiness>;
  state: PdfState;
}) {
  const missingPreview = readiness.missingItems.slice(0, 5);
  const remainingCount = readiness.missingItems.length - missingPreview.length;
  const isDraft = readiness.status === "incomplete";

  return (
    <div className="report-pdf-overlay" role="dialog" aria-modal="true" aria-labelledby="report-pdf-title">
      <div className={state === "ready" ? "report-pdf-dialog report-pdf-dialog-wide" : "report-pdf-dialog"}>
        {state === "confirming" && (
          <>
            <p className="report-pdf-kicker">{isDraft ? "Draft PDF check" : "Ready to generate"}</p>
            <h2 id="report-pdf-title">Check before generating</h2>
            <p>
              {isDraft
                ? "This report still has missing answers. You can generate a draft PDF now, but it should be checked before submission."
                : "This will create a PDF file from the report preview. Check the pages first, then generate the final copy."}
            </p>
            {isDraft && (
              <div className="report-pdf-warning">
                <strong>Missing:</strong> {missingPreview.join(", ")}
                {remainingCount > 0 ? ` and ${remainingCount} more` : ""}.
              </div>
            )}
            <div className="report-pdf-actions">
              <button className="report-pdf-primary" onClick={onConfirm} type="button">
                {isDraft ? "Generate draft PDF" : "Generate PDF"}
              </button>
              <Link href="/quest">Back to web quest</Link>
              <button onClick={onBackToEdit} type="button">Keep reviewing</button>
            </div>
          </>
        )}

        {state === "generating" && (
          <div className="report-pdf-loading">
            <p className="report-pdf-kicker">Generating PDF</p>
            <h2 id="report-pdf-title">Building your report file</h2>
            <div className="report-pdf-loader" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>{loadingFact}</p>
          </div>
        )}

        {state === "ready" && generatedPdf && (
          <>
            <p className="report-pdf-kicker">{isDraft ? "Draft PDF ready" : "PDF ready"}</p>
            <h2 id="report-pdf-title">Review your generated PDF</h2>
            <p>Open the PDF to check every page. If anything looks wrong, go back to the web quest or use browser print as a fallback.</p>
            <div className="report-pdf-preview">
              <iframe src={generatedPdf.url} title="Generated field report PDF" />
            </div>
            <div className="report-pdf-actions">
              <a className="report-pdf-primary" href={generatedPdf.url} download={generatedPdf.name}>Download PDF</a>
              <a href={generatedPdf.url} target="_blank" rel="noreferrer">Open PDF</a>
              <button onClick={onPrintFallback} type="button">Use browser print</button>
              <button onClick={onReset} type="button">Back to report</button>
            </div>
          </>
        )}

        {state === "error" && (
          <>
            <p className="report-pdf-kicker">PDF generation failed</p>
            <h2 id="report-pdf-title">Use browser print instead</h2>
            <p>PDF generation failed. Use browser print instead.</p>
            {error && <p className="report-pdf-error">{error}</p>}
            <div className="report-pdf-actions">
              <button className="report-pdf-primary" onClick={onPrintFallback} type="button">Use browser print</button>
              <button onClick={onConfirm} type="button">Try again</button>
              <button onClick={onBackToEdit} type="button">Back to report</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

async function waitForReportImages() {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>(".report-document img"));

  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
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
            ? "The preview is using the saved local work from this browser. Generate the PDF here, then open it to check every page."
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
