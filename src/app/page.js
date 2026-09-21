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
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const req = await fetch("/api/dashboard/news");
      const data = req.ok ? await req.json() : null;
      if (Array.isArray(data)) {
        setNewsList(data);
      } else {
        // Expected when the news backend is unavailable; the Dispatch bar shows its fallback.
        console.warn(`News unavailable (HTTP ${req.status}); showing the default announcement.`);
        setError(true);
      }
    } catch (err) {
      console.warn("News request failed; showing the default announcement.", err);
      setError(true);
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

      {/* Hero: the gradient is only a backdrop and ends on the About band's colour */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#FEF8E2] via-[#A48E81] via-45% to-[#5A362E]">
        <div className="candle-glow-1" />
        <HeroSection newsList={newsList} loading={loading} error={error} />
      </div>

      {/* About: solid dark umber so body text stays readable */}
      <div className="relative w-full overflow-hidden bg-[#5A362E]">
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
