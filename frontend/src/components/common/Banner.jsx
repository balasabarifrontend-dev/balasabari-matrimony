// src/components/common/Banner.jsx
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";

import BannerImage1 from "../../assets/BannerImage1.png";
import BannerImage2 from "../../assets/BannerImage2.png";
import BannerImage3 from "../../assets/BannerImage3.jpg";
import BannerImage4 from "../../assets/BannerImage4.png";
import BannerImage5 from "../../assets/BannerImage5.jpg";
import BannerImage6 from "../../assets/BannerImage6.jpg";
import BannerImage7 from "../../assets/BannerImage7.jpg";

const bannerImages = [
  BannerImage1, 
  BannerImage2, 
  BannerImage3, 
  BannerImage4,
  BannerImage5,
  BannerImage6,
  BannerImage7
];

export default function Banner({ selectedMenu, onGetStarted }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (selectedMenu != null) {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(selectedMenu % bannerImages.length);
        setFade(true);
      }, 300);
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu == null) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
          setFade(true);
        }, 300);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedMenu]);

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  return (
    <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
      {/* Background Image with smooth transition */}
      <img
        src={bannerImages[currentIndex]}
        alt="Tamil Matrimony Banner"
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
            Find Your Perfect Tamil Match
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow max-w-2xl mx-auto">
            Trusted by thousands of Tamil families worldwide for authentic and compatible matches.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="font-bold text-lg px-8 py-4 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onGetStarted}
          >
            Find Your Match Now
          </Button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-red-600 scale-125' 
                : 'bg-white/70 hover:bg-white'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}