// src/components/common/CategoryNav.jsx
import React from "react";
import Button from "../ui/Button";

export default function CategoryNav() {
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
    "Christian",
    "Muslim",
  ];

  return (
    <div className="w-full bg-gray-100 border-t border-b">
      <div className="max-w-7xl mx-auto px-6 flex space-x-3 overflow-x-auto py-3 scrollbar-hide">
        {categories.map((cat, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="whitespace-nowrap shadow-sm text-sm"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}
