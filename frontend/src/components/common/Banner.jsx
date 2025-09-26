import React from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "../../assets/BannerImage.jpg"; 
import Button from "../ui/Button";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
      {/* Background Image */}
      <img
        src={BannerImage}
        alt="Tamil Matrimony Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-red-800/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg leading-snug">
            உங்களுக்குப் பொருத்தமான தமிழ்ப் பொருத்தத்தைக் கண்டறியவும்
          </h2>
          <p className="text-lg md:text-xl mb-6 text-gray-200 drop-shadow">
            உலகளவில் ஆயிரக்கணக்கான தமிழ் குடும்பங்களால் நம்பப்படுகிறது.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="font-bold text-lg"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}