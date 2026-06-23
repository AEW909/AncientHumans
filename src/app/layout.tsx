import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ancient Human Relatives",
  description: "A museum-style web quest into the branching human family tree.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
