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
    "Youth speed, strength, and conditioning training for ages 2 to 17 on the South Shore of Massachusetts. Programs in Pembroke and Hanover, MA. Book a session today.",
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
