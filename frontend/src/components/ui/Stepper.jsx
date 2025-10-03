import React from "react";

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="relative flex items-center w-full mb-8">
      {/* Full-width background line */}
      <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0 rounded" />

      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep - 1 === index;
        const isCompleted = currentStep - 1 > index;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative z-10">
            {/* Filled connector line */}
            {index !== 0 && (
              <div
                className="absolute top-5 h-1 z-0 rounded"
                style={{
                  width: isCompleted ? "100%" : "0%",
                  backgroundColor: isCompleted ? "#DC2626" : "transparent",
                  transition: "width 0.5s ease",
                  left: "-50%",
                }}
              />
            )}

            {/* Step circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold transition-all duration-300
                ${isCompleted ? "bg-red-500" : isActive ? "bg-red-600 scale-110 shadow-lg" : "bg-gray-300"}
              `}
            >
              {stepNumber}
            </div>

            {/* Step label */}
            <span
              className={`mt-2 text-center text-sm font-medium transition-colors duration-300
                ${isActive ? "text-red-600" : isCompleted ? "text-red-500" : "text-gray-500"}
              `}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
