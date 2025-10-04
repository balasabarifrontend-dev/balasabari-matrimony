import React, { useState, useEffect } from "react";
import Button from "../ui/Button";

import BannerImage1 from "../../assets/BannerImage1.jpg";
import BannerImage2 from "../../assets/BannerImage2.png";
import BannerImage3 from "../../assets/BannerImage3.jpg";
import BannerImage4 from "../../assets/BannerImage4.jpg";

const bannerImages = [BannerImage1, BannerImage2, BannerImage3, BannerImage4];

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

  return (
    <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
      {/* Background Image with smooth transition */}
      <img
        src={bannerImages[currentIndex]}
        alt="Tamil Matrimony Banner"
        className={`absolute inset-0 w-full h-full object-cover z-0 transform transition-all duration-700 ease-in-out ${
          fade ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
        }`}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-red-800/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg leading-snug">
            Find the right match for you
          </h2>
          <p className="text-lg md:text-xl mb-6 text-gray-200 drop-shadow">
            Trusted by thousands of Tamil families worldwide.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="font-bold text-lg bg-yellow-400 hover:bg-red-600"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
