import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Caveat } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Duluka Studio — by ScotcsDuluka",
  description:
    "Duluka Studio — สตูดิโอส่วนตัวของ ScotcsDuluka. โปรเจกต์ screen capture, Magisk mods, เว็บทดลอง, Minecraft server และ TTML lyrics. เปิดซอร์สทั้งหมดบน GitHub.",
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
    title: "Duluka Studio",
    description: "สตูดิโอส่วนตัวของ ScotcsDuluka — โปรเจกต์เปิดซอร์สหลากหลาย",
    siteName: "Duluka Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duluka Studio",
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
        className={`${miSansThai.variable} ${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
