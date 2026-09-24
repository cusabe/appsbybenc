import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Placeholder font; the real heading/body pair arrives in Phase 2.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apps by Ben C",
  description:
    "Ben C, a full-stack web and software developer in Canberra, Australia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
