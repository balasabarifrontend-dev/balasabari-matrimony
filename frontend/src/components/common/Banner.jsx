// src/components/common/Banner.jsx
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

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

const bannerTexts = [
  {
    title: "Find Your Perfect Tamil Match",
    subtitle: "Trusted by thousands of Tamil families worldwide for authentic and compatible matches.",
    cta: "Find Your Match Now"
  },
  {
    title: "Join Successful Tamil Couples",
    subtitle: "500+ happy marriages and counting. Start your journey to forever love.",
    cta: "Start Your Journey"
  },
  {
    title: "Authentic Tamil Matrimony",
    subtitle: "Verified profiles from respected Tamil families across the globe.",
    cta: "Browse Profiles"
  },
  {
    title: "Your Soulmate Awaits",
    subtitle: "Advanced matching algorithm to find your perfect life partner.",
    cta: "Discover Matches"
  },
  {
    title: "Traditional Values, Modern Approach",
    subtitle: "Blending cultural heritage with contemporary matchmaking.",
    cta: "Join Today"
  },
  {
    title: "Safe & Secure Matchmaking",
    subtitle: "Your privacy and security are our highest priority.",
    cta: "Get Started"
  },
  {
    title: "Lifetime of Happiness Begins Here",
    subtitle: "Find your perfect partner and build beautiful memories together.",
    cta: "Find Love Now"
  }
];

export default function Banner({ selectedMenu, onGetStarted }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

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
    let interval;
    if (isAutoPlay && selectedMenu == null && !isHovering) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, selectedMenu, isHovering]);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
      setFade(true);
    }, 300);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
      setFade(true);
    }, 300);
  };

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <section 
      className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImages[currentIndex]}
          alt="Tamil Matrimony Banner"
          className={`w-full h-full object-cover transform transition-all duration-1000 ease-out ${
            fade ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } group-hover:scale-105`}
        />
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-transparent" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 md:px-12">
        <div className="max-w-4xl text-center transform transition-all duration-700 ease-out">
          {/* Animated Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20 animate-pulse">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-yellow-300 text-sm font-semibold">500+ Successful Matches</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            <span className={`inline-block transform transition-all duration-700 delay-200 ${
              fade ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {bannerTexts[currentIndex].title.split(' ')[0]}
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              <span className={`inline-block transform transition-all duration-700 delay-400 ${
                fade ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {bannerTexts[currentIndex].title.split(' ').slice(1).join(' ')}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-600 ${
            fade ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {bannerTexts[currentIndex].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-700 delay-800 ${
            fade ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Button
              variant="primary"
              size="xl"
              className="font-bold text-lg px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border-2 border-yellow-400/30"
              onClick={onGetStarted}
            >
              <span className="flex items-center space-x-2">
                <span>💖</span>
                <span>{bannerTexts[currentIndex].cta}</span>
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              className="font-bold text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              onClick={toggleAutoPlay}
            >
              <span className="flex items-center space-x-2">
                {isAutoPlay ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                <span>{isAutoPlay ? 'Pause' : 'Play'}</span>
              </span>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto transform transition-all duration-700 delay-1000 ${
            fade ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300">10K+</div>
              <div className="text-white/80 text-sm">Verified Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300">50+</div>
              <div className="text-white/80 text-sm">Cities Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300">99%</div>
              <div className="text-white/80 text-sm">Satisfied Families</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Progress Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-5000 ease-linear"
          style={{ 
            width: isAutoPlay && !isHovering ? '100%' : '0%',
            animation: isAutoPlay && !isHovering ? 'progress 5s linear' : 'none'
          }}
        />
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
              index === currentIndex 
                ? 'bg-yellow-400 scale-125 border-yellow-300 shadow-lg' 
                : 'bg-white/50 hover:bg-white border-white/30'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}