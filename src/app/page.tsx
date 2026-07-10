'use client';

import Intro from "@/components/duluka/Intro";
import Sidebar from "@/components/duluka/Sidebar";
import Hero from "@/components/duluka/Hero";
import About from "@/components/duluka/About";
import ServerInfo from "@/components/duluka/ServerInfo";
import Rules from "@/components/duluka/Rules";
import Projects from "@/components/duluka/Projects";
import Connect from "@/components/duluka/Connect";
import Footer from "@/components/duluka/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#faf6f0] text-[#4a3b47]">
      <Intro />
      <Sidebar />
      {/* Main content with left padding on desktop to make room for sidebar */}
      <main className="flex-1 lg:pl-64">
        <Hero />
        <About />
        <Projects />
        <ServerInfo />
        <Rules />
        <Connect />
      </main>
      <div className="lg:pl-64">
        <Footer />
      </div>
    </div>
  );
}
