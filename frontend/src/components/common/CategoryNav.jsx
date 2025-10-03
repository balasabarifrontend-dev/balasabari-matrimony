import React, { useRef, useState } from "react";
import Button from "../ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // You may need to install @heroicons/react

export default function CategoryNav({ onSelect }) {
  const categories = [
    "Vanniyar",
    "Gounder",
    "Thevar",
    "Nadar",
    "Vellalar",
    "Kongu Vellalar",
    "Iyer",
    "Iyengar",
    "Chettiar",
    "Mudaliar",
    "Vanniyar",
    "Gounder",
    "Thevar",
    "Nadar",
    "Vellalar",
    "Kongu Vellalar",
    "Iyer",
    "Iyengar",
    "Chettiar",
    "Mudaliar",
    "Vanniyar",
    "Gounder",
    "Thevar",
    "Nadar",
    "Vellalar",
    "Kongu Vellalar",
    "Iyer",
    "Iyengar",
    "Chettiar",
    "Mudaliar",
  ];

  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (cat) => {
    setSelected(cat);
    if (onSelect) onSelect(cat);
  };

  return (
    <div className="relative w-full bg-gray-100 border-t border-b flex items-center">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-20 h-full px-2 bg-gray-100 hover:bg-gray-200 transition hidden md:flex items-center"
        onClick={() => scroll("left")}
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
      </button>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex space-x-3 overflow-x-auto py-3 px-6 scrollbar-hide scroll-smooth"
      >
        {categories.map((cat, idx) => (
          <Button
            key={idx}
            variant={selected === cat ? "solid" : "ghost"}
            className={`whitespace-nowrap shadow-sm text-sm transition ${
              selected === cat ? "bg-red-600 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 z-20 h-full px-2 bg-gray-100 hover:bg-gray-200 transition hidden md:flex items-center"
        onClick={() => scroll("right")}
      >
        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
