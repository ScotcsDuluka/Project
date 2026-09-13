import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Caveat, Archivo_Black } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Duluka Studio™ — Weird Systems Division",
  description:
    "Duluka Studio™ — สตูดิโอแปลกๆ ส่วนตัวของ ScotcsDuluka. โปรเจกต์ screen capture, Magisk mods, เว็บทดลอง, Minecraft server และ TTML lyrics. เปิดซอร์สทั้งหมดบน GitHub.",
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
    title: "Duluka Studio™ — Weird Systems Division",
    description: "สตูดิโอแปลกๆ ของ ScotcsDuluka — โปรเจกต์เปิดซอร์สหลากหลาย",
    siteName: "Duluka Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duluka Studio™",
    description: "by ScotcsDuluka — screen capture, Magisk mods, Minecraft, TTML lyrics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} ${archivoBlack.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
