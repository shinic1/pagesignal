import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Joomag Voice Lab — Independent product concept",
  description:
    "A grounded conversational publication experience with a multi-model evaluation and routing console.",
  openGraph: {
    title: "Joomag Voice Lab",
    description:
      "From reader question to grounded answer, approved action, and measurable learning.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f2ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
