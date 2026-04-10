import type { Metadata } from "next";
import { Inter, Outfit, Syncopate } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: "The Athlete Lab | Youth Athletic Training | Pembroke & Hanover, MA",
  description:
    "Purpose-driven speed, strength, and conditioning for youth athletes ages 2–17. Programs for all ages in Pembroke and Hanover, Massachusetts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${syncopate.variable}`}>
      <body>{children}</body>
    </html>
  );
}
