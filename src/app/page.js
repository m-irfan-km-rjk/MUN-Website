"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommitteesSection from "@/components/CommitteesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import MFooter from "@/components/MFooter";
import OldPhotoGallery from "@/components/OldPhotoGallery";
import { useState, useEffect } from "react";

export default function Home() {

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const req = await fetch("/api/dashboard/news");
      const data = await req.json();
      setNewsList(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-full pt-20 min-h-screen">
      <Navbar />

      {/* Upper realm: cream → taupe → oxblood */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#FEF8E2] via-[#A48E81] via-40% to-[#4B1C14]">
        <div className="candle-glow-1" />
        <HeroSection newsList={newsList} loading={loading} />
        <AboutSection />
      </div>

      {/* Lower realm: oxblood */}
      <div className="relative w-full overflow-hidden bg-oxblood px-6">
        <div className="candle-glow-2" />
        <CommitteesSection />
        <TeamSection />
        <OldPhotoGallery />
        <ContactSection />
      </div>

      <MFooter />
    </main>
  );
}
