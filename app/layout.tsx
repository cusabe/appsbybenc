import type { Metadata } from "next";
import { Nunito_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Font pair: swap these two imports to try another pairing (see /style-tile).
const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading-face",
  subsets: ["latin"],
});

const bodyFont = Nunito_Sans({
  variable: "--font-body-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apps by Ben C",
  description:
    "Ben C, a full-stack web and software developer in Canberra, Australia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script sets data-theme before React loads.
    <html
      lang="en-AU"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
