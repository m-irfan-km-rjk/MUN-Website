"use client";

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
import { useState, useEffect } from "react";

export default function Home() {

  const [newsList,setNewsList] = useState([]);

  const fetchData = async () => {
    const req = await fetch("/api/dashboard/news");
    const data = await req.json();
    setNewsList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

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