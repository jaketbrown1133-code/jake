import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "Undercover Outdoors — StruXure Motorized Pergolas | Hudson Valley, NY",
  description:
    "Hudson Valley's authorized StruXure dealer. Motorized louvered pergolas engineered for Northeast living — ICC certified, aircraft-grade aluminum, lifetime warranty.",
  keywords: "StruXure pergola, motorized louvered pergola, Hudson Valley pergola, smart pergola, Undercover Outdoors, Orange County NY, Ulster County NY, Dutchess County NY",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
