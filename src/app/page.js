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
export default function Home() {

  return (
    <main className="w-full pt-20 min-h-screen">
      <Navbar />

      <div className="relative w-full overflow-hidden bg-[#24130f]">
        <div className="absolute inset-0 bg-[url('/assets/tkm-mun-26-background.png')] bg-cover bg-center opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#24130f]/95 via-[#582119]/80 to-[#24130f]/95" aria-hidden="true" />
        <div className="candle-glow-1" />
        <HeroSection />
        <FoundersSection />
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
