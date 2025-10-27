"use client";
import React, { JSX, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectSection from "@/components/ProjectSection";
import EducationSection from "@/components/EducationSection";

export default function Portfolio(): JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 🖱️ Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* 🌈 Static gradient background */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 60%),
            linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)
          `,
        }}
      />

      {/* 🟣 Mouse-following glow */}
      <div
        className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none blur-3xl bg-purple-500/40 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      />

      {/* 🧠 Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-8">
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectSection />
        <EducationSection />

        <footer className="py-8 px-4 text-center text-gray-400 border-t border-purple-500/20">
          <p>© 2025 Darshan Boyat. Built with Next.js 15 & React.</p>
        </footer>
      </div>
    </div>
  );
}
