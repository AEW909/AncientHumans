import type { ReactNode } from "react";

type ReportPageProps = {
  children: ReactNode;
  className?: string;
  pageNumber: number;
  title: string;
};

export function ReportPage({ children, className = "", pageNumber, title }: ReportPageProps) {
  return (
    <section className={`report-page ${className}`} aria-label={`Page ${pageNumber}: ${title}`}>
      {children}
      <footer className="report-page-footer">
        <span>Ancient Human Relatives</span>
        <span>{String(pageNumber).padStart(2, "0")}</span>
      </footer>
    </section>
  );
}

export function ReportKicker({ children }: { children: ReactNode }) {
  return <p className="report-kicker">{children}</p>;
}

export function ReportTitle({ children }: { children: ReactNode }) {
  return <h2 className="report-title">{children}</h2>;
}

export function ReportPanel({ title, children, tone = "gold" }: { title: string; children: ReactNode; tone?: "gold" | "teal" | "rust" | "navy" }) {
  return (
    <div className={`report-panel report-panel-${tone}`}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
