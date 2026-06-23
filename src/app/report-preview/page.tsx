import { MockReport } from "@/components/report/MockReport";
import { mockReport } from "@/data/mockReport";

export const metadata = {
  title: "Mock Report Preview | Ancient Human Relatives",
  description: "An 8-page magazine-style mock field report preview.",
};

export default function ReportPreviewPage() {
  return <MockReport report={mockReport} />;
}
