'use client';

import Intro from "@/components/duluka/Intro";
import TopBar from "@/components/duluka/TopBar";
import Cursor from "@/components/duluka/Cursor";
import Hero from "@/components/duluka/Hero";
import About from "@/components/duluka/About";
import ServerInfo from "@/components/duluka/ServerInfo";
import Rules from "@/components/duluka/Rules";
import Projects from "@/components/duluka/Projects";
import Connect from "@/components/duluka/Connect";
import Footer from "@/components/duluka/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-wx-paper text-wx-ink">
      <Intro />
      <Cursor />
      <TopBar />
      {/* spacer for fixed header (ticker ~29px + bar 56px) */}
      <div className="h-[87px] shrink-0" aria-hidden />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <ServerInfo />
        <Rules />
        <Connect />
      </main>
      <Footer />
      {/* film grain over everything */}
      <div className="wx-noise" aria-hidden />
    </div>
  );
}
