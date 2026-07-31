import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "PageSignal | Ask your publication",
  description:
    "Ask a publication by text or voice, check cited pages, and compare model behavior.",
  openGraph: {
    title: "PageSignal",
    description:
      "Ask questions, check cited pages, and review the details readers cannot find.",
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
