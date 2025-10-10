import React, { useRef, useState, useEffect } from "react";
import Button from "../ui/Button";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  SparklesIcon 
} from "@heroicons/react/24/solid";

export default function CategoryNav({ onSelect, religionFilter = "all" }) {
  const categories = [
    "Vanniyar", "Gounder", "Thevar", "Nadar", "Vellalar", 
    "Kongu Vellalar", "Iyer", "Iyengar", "Chettiar", "Mudaliar",
    "Pillai", "Naidu", "Reddy", "Kamma", "Brahmin", "Kshatriya",
    "Vaishya", "Viswakarma", "Nair", "Ezhava", "Maravar",
    "Kallar", "Agamudayar", "Balija", "Bestha", "Boyer", "Chakkiliyar"
  ];

  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // Check scroll position for arrow visibility
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current && !isScrolling) {
      setIsScrolling(true);
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      
      setTimeout(() => {
        checkScrollPosition();
        setIsScrolling(false);
      }, 300);
    }
  };

  const handleClick = (category) => {
    const newSelection = selected === category ? null : category;
    setSelected(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const clearSelection = () => {
    setSelected(null);
    if (onSelect) onSelect(null);
  };

  const handleScroll = () => {
    checkScrollPosition();
  };

  // Get unique categories (remove duplicates)
  const uniqueCategories = [...new Set(categories)];

  return (
    <div className="relative w-full bg-gradient-to-r from-red-50 via-white to-red-50 border-y border-red-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.3)_1px,transparent_0)] bg-[length:16px_16px]"></div>
      
      <div className="relative z-10 flex items-center justify-between py-4 px-2 md:px-6">
        {/* Section Header */}
        <div className="flex items-center space-x-3 min-w-0 flex-shrink-0 mr-4">
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-red-200 shadow-sm">
            <SparklesIcon className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Popular Communities
            </span>
          </div>
          
          {/* Selected Category Badge */}
          {selected && (
            <div className="flex items-center space-x-2 bg-red-600 text-white rounded-full px-3 py-1.5 animate-fadeIn">
              <span className="text-sm font-medium">{selected}</span>
              <button
                onClick={clearSelection}
                className="p-0.5 hover:bg-red-700 rounded-full transition-colors"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Container */}
        <div className="flex-1 relative">
          {/* Left Gradient Fade */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-red-50 to-transparent z-10 transition-opacity duration-300 ${
            showLeftArrow ? 'opacity-100' : 'opacity-0'
          }`}></div>

          {/* Right Gradient Fade */}
          <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-red-50 to-transparent z-10 transition-opacity duration-300 ${
            showRightArrow ? 'opacity-100' : 'opacity-0'
          }`}></div>

          {/* Left Arrow */}
          <button
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white group ${
              showLeftArrow ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
            onClick={() => scroll("left")}
            disabled={isScrolling}
          >
            <ChevronLeftIcon className="w-4 h-4 text-red-600 group-hover:text-red-700 transition-colors" />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-8 py-1"
          >
            {uniqueCategories.map((category, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`relative whitespace-nowrap text-sm font-medium transition-all duration-300 transform hover:scale-105 group ${
                  selected === category
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200 scale-105 border-red-600"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-red-700 border-red-200 hover:border-red-300 hover:shadow-md"
                } border rounded-full px-4 py-2 min-w-max shadow-sm`}
                onClick={() => handleClick(category)}
              >
                {/* Animated background for selected state */}
                {selected === category && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 animate-pulse-slow"></div>
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center space-x-1.5">
                  <span>{category}</span>
                  
                  {/* Community icon based on category */}
                  <span className={`text-xs transition-all duration-300 ${
                    selected === category ? 'opacity-90' : 'opacity-60 group-hover:opacity-100'
                  }`}>
                    {category.includes('Iyer') || category.includes('Iyengar') ? '🕉️' :
                     category.includes('Chettiar') ? '💼' :
                     category.includes('Gounder') ? '🌾' :
                     category.includes('Thevar') ? '⚔️' :
                     category.includes('Nadar') ? '🌴' :
                     category.includes('Vellalar') ? '🏡' : '👨‍👩‍👧‍👦'}
                  </span>
                </span>

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${
                  selected === category ? 'group-hover:opacity-20' : ''
                }`}></div>
              </Button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white group ${
              showRightArrow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
            onClick={() => scroll("right")}
            disabled={isScrolling}
          >
            <ChevronRightIcon className="w-4 h-4 text-red-600 group-hover:text-red-700 transition-colors" />
          </button>
        </div>

        {/* Results Count */}
        <div className="hidden lg:flex items-center space-x-2 min-w-0 flex-shrink-0 ml-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-red-200 shadow-sm">
            <span className="text-sm text-gray-600 font-medium">
              <span className="text-red-600 font-bold">{uniqueCategories.length}</span> Communities
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Instructions */}
      <div className="lg:hidden px-6 pb-2">
        <p className="text-xs text-gray-500 text-center">
          👈 Scroll to explore more communities 👉
        </p>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}