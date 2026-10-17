import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Playfair_Display, Caveat, Archivo_Black } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// MiSans Thai — primary font for Thai text (uploaded by user, Xiaomi MiSans Thai)
// Note: MiSans Thai is a Thai-script-only subset (46KB). For Latin characters,
// Geist Sans is used as fallback. The browser auto-selects per character.
const miSansThai = localFont({
  src: "./fonts/MiSansThai.ttf",
  variable: "--font-mi-sans-thai",
  display: "swap",
  weight: "400",
});

// Geist Sans — fallback for Latin/English text (MiSans Thai has no Latin glyphs)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Duluka Studio — โปรเจกต์ของ ScotcsDuluka",
  description:
    "เว็บรวมโปรเจกต์ของ ScotcsDuluka ทั้งเครื่องมืออัดหน้าจอ, HyperOS mods, งานทดลองบนเว็บ, Minecraft และไฟล์เนื้อเพลง TTML แต่ละ repo มีสถานะและเงื่อนไขการใช้งานต่างกัน.",
  keywords: [
    "Duluka Studio",
    "ScotcsDuluka",
    "NVIDIA ShadowPlay",
    "HyperOS Mods",
    "Magisk Module",
    "Minecraft Server",
    "TTML Lyrics",
    "VB.NET",
    "FFmpeg",
  ],
  authors: [{ name: "ScotcsDuluka" }],
  openGraph: {
    title: "Duluka Studio™ — by ScotcsDuluka",
    description: "โปรเจกต์และงานทดลองของ ScotcsDuluka ตั้งแต่เครื่องมือ Windows ไปจนถึง Minecraft และงานเว็บ",
    siteName: "Duluka Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duluka Studio™",
    description: "โปรเจกต์ของ ScotcsDuluka: screen capture, HyperOS mods, Minecraft และ TTML lyrics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${miSansThai.variable} ${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} ${archivoBlack.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
