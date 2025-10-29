import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommitteesSection from "@/components/CommitteesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import MFooter from "@/components/MFooter";
import OldPhotoGallery from "@/components/OldPhotoGallery";
import NewsFeed from "@/components/NewsFeed";
import NewsSlider from "@/components/NewsFeed";

export default function Home() {

  const newsList = [
    { id: 1, title: "New AI Course", content: "We’ve added a new AI course!" },
    { id: 2, title: "Hackathon Alert", content: "Join the biggest hackathon this December!" },
  ];

  return (
    <main>
      <Navbar />
      <HeroSection />
      <NewsSlider newsList={newsList}/>
      <AboutSection />
      <CommitteesSection />
      <TeamSection />
      <OldPhotoGallery />
      <ContactSection />
      <MFooter />
    </main>
  );
}