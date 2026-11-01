"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommitteesSection from "@/components/CommitteesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import MFooter from "@/components/MFooter";
import OldPhotoGallery from "@/components/OldPhotoGallery";
import Countdown from "@/components/Countdown";
import FoundersSection from "@/components/FoundersSection";
import AllotmentTracker from "@/components/AllotmentTracker";
import CulturalGallery from "@/components/CulturalGallery";
import CampusAmbassadorLeaderboard from "@/components/CampusAmbassadorLeaderboard";
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
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#FEF8E2] from-0% via-[#B49D91] via-35% via-[#7A5147] via-70% to-[#582119] to-100%">
        <div className="candle-glow-1" />
        <HeroSection newsList={newsList} loading={loading} error={error} />
        <FoundersSection />
        <Countdown />
      </div>

      {/* About: solid site theme so body text stays readable */}
      <div className="relative w-full overflow-hidden bg-[#582119]">
        <AboutSection />
      </div>

      {/* Lower realm: oxblood */}
      <div className="relative w-full overflow-hidden bg-oxblood px-6">
        <div className="candle-glow-2" />
        <AllotmentTracker />
        <CampusAmbassadorLeaderboard />
        <CommitteesSection />
        <TeamSection />
        <CulturalGallery />
        <OldPhotoGallery />
        <ContactSection />
      </div>

      <MFooter />
    </main>
  );
}
