"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import musicSchoolContent from "../data/music_school_content";

const WhyChooseUs = () => {
  return (
    <div className="w-full">
      <StickyScroll content={musicSchoolContent} />
    </div>
  );
};

export default WhyChooseUs;
