"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen"; // Use the one that works
import OfflineGame from "./components/OfflineGame";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import LookbookSection from "./components/LookbookSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      // Set a flag in sessionStorage so we don't show loading on every navigation
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <>
      {isFirstVisit && <LoadingScreen />}
      <OfflineGame />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <LookbookSection />
      <ContactSection />
      <Footer />
    </>
  );
}
