import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coop's Calc - Free Online Calculator",
  description: "Free online calculator for basic math operations. Simple, fast, and easy-to-use calculator for addition, subtraction, multiplication, and division.",
  keywords: [
    "calculator",
    "online calculator",
    "free calculator",
    "math calculator",
    "basic calculator",
    "addition calculator",
    "subtraction calculator",
    "multiplication calculator",
    "division calculator",
    "simple calculator",
    "web calculator",
    "digital calculator",
    "arithmetic calculator",
    "math tools",
    "calculation",
    "compute",
    "numbers",
    "mathematics",
    "Coop's Calc"
  ],
  authors: [{ name: "Coop's Calc" }],
  creator: "Coop's Calc",
  publisher: "Coop's Calc",
  robots: "index, follow",
  openGraph: {
    title: "Coop's Calc - Free Online Calculator",
    description: "Free online calculator for basic math operations. Simple, fast, and easy-to-use.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Coop's Calc - Free Online Calculator",
    description: "Free online calculator for basic math operations. Simple, fast, and easy-to-use.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}



