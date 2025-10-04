import React from "react";

export default function Stepper({ steps, currentStep, stepOffset = 1 }) {
  return (
    <div className="relative flex items-center w-full mb-8">
      {/* Base line behind all steps */}
      <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0 rounded" />

      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Connector line (behind the circle) */}
            {index !== 0 && (
              <div
                className="absolute top-5 h-1 z-0 rounded"
                style={{
                  left: "-50%",
                  width: "100%",
                  backgroundColor:
                    stepNumber <= currentStep ? "#DC2626" : "transparent",
                  transition: "background-color 0.5s ease",
                }}
              />
            )}

            {/* Step circle (above the line) */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 relative z-10
                ${
                  isCompleted
                    ? "bg-red-500 text-white line-through"
                    : isActive
                    ? "bg-red-600 text-white scale-110 shadow-lg"
                    : "bg-gray-300 text-gray-700"
                }
              `}
            >
              {stepNumber}
            </div>

            {/* Step label */}
            <span
              className={`mt-2 text-center text-sm font-medium transition-colors duration-300
                ${
                  isActive
                    ? "text-red-600"
                    : isCompleted
                    ? "text-red-500"
                    : "text-gray-500"
                }
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
