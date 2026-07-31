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
  themeColor: "#f5f5f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <template
          data-pagesignal-direction="3ffde5fd"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: PageSignal is a conversation-first publication desk, not an indigo AI dashboard or developer tool.
OWN-WORLD: Cool proof stock, black ink, charcoal rules, safety orange, square controls, and flatplan navigation.
STORY: An operator asks or replays a reader question, checks the cited page, and acts on grounded evidence.
FIRST VIEWPORT: Light navigation at left; conversation and voice lead; the selected proof stays visible at right; nine pages run below.
FORM: Publication production flatplan, selected direction B, seed 3ffde5fd.
FINISH: The interface is calm, exacting, and unmistakably a publication-production workspace rather than an AI dashboard.
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
