import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pergola Tech Pros — Luxury Motorized Pergolas, New York",
  description:
    "New York's premier motorized louvered pergola company. App-controlled aluminum pergolas with integrated LED lighting, 120MPH wind rating, and silent motors.",
  keywords: "motorized pergola, louvered pergola, New York pergola, smart pergola, aluminum pergola",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col" style={{ background: "#0d0b08" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
