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
    <main>
      <Navbar />
      <HeroSection newsList={newsList} loading={loading} />
      <AboutSection />
      <CommitteesSection />
      <TeamSection />
      <OldPhotoGallery />
      <ContactSection />
      <MFooter />
    </main>
  );
}