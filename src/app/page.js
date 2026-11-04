"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommitteesSection from "@/components/CommitteesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import MFooter from "@/components/MFooter";
import OldPhotoGallery from "@/components/OldPhotoGallery";
import FoundersSection from "@/components/FoundersSection";
import AllotmentTracker from "@/components/AllotmentTracker";
import CulturalGallery from "@/components/CulturalGallery";
import CampusAmbassadorLeaderboard from "@/components/CampusAmbassadorLeaderboard";
const DEEP = "#33120d";
const BASE = "#4a1c14";
const WINE = "#5a2419";

export default function Home() {

  return (
    <main className="w-full pt-20 min-h-screen">
      <Navbar />

      <div className="relative w-full overflow-hidden bg-[#4a1c14]">
        <div className="absolute inset-0 bg-[url('/assets/tkm-mun-26-background.png')] bg-cover bg-center opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a1c14]/95 via-[#4a1c14]/80 to-[#4a1c14]" aria-hidden="true" />
        <div className="candle-glow-1" />
        <HeroSection />
        <FoundersSection />
      </div>

      {/* Section tones alternate base > wine > deep > base > wine > deep > base > wine > deep. Each one fades in from
          the previous tone (see .tone-blend in globals.css), so there is no hard colour edge between sections. */}
      <div className="tone-blend relative w-full overflow-hidden" style={{ '--prev': BASE, '--tone': WINE }}>
        <AboutSection />
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="candle-glow-2" />
        <div className="tone-blend px-6" style={{ '--prev': WINE, '--tone': DEEP }}><AllotmentTracker /></div>
        <div className="tone-blend px-6" style={{ '--prev': DEEP, '--tone': BASE }}><CampusAmbassadorLeaderboard /></div>
        <div className="tone-blend px-6" style={{ '--prev': BASE, '--tone': WINE }}><CommitteesSection /></div>
        <div className="tone-blend px-6" style={{ '--prev': WINE, '--tone': DEEP }}><TeamSection /></div>
        <div className="tone-blend px-6" style={{ '--prev': DEEP, '--tone': BASE }}><CulturalGallery /></div>
        <div className="tone-blend px-6" style={{ '--prev': BASE, '--tone': WINE }}><OldPhotoGallery /></div>
        <div className="tone-blend px-6" style={{ '--prev': WINE, '--tone': DEEP, '--tail': '160px', '--end': BASE }}><ContactSection /></div>
      </div>

      <MFooter />
    </main>
  );
}
