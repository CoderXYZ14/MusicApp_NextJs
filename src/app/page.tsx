import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import WhyChooseUs from "@/components/WhyChooseUs";
import MusicSchoolTestimonialCards from "@/components/MusicSchoolTestimonialCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased ">
      <HeroSection />
      <FeaturedCourses />
      <div className="relative z-10">
        <WhyChooseUs />
      </div>
      <MusicSchoolTestimonialCards />
      <UpcomingWebinars />
    </main>
  );
}
