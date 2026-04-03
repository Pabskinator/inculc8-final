"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import StrategicValueSection from "@/components/sections/StrategicValueSection";
import TrustProofSection from "@/components/sections/TrustProofSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const setMousePos = useAppStore((state) => state.setMousePos);
  const setScrollProgress = useAppStore((state) => state.setScrollProgress);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos(x, y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMousePos]);

  useEffect(() => {
    const handleScroll = () => setScrollProgress(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress]);

  return (
    <main className="relative w-full bg-cream">
      <HeroSection />
      <SolutionsSection />
      <StrategicValueSection />
      <TrustProofSection />
      <MissionVisionSection />
      <ContactSection />
    </main>
  );
}
