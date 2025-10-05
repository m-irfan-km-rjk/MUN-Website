import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommitteesSection from "@/components/CommitteesSection";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CommitteesSection />
      <TeamSection />
      {/* We can add the Pricing and Contact sections next */}
    </main>
  );
}

