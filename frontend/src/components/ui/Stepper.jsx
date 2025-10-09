import React from "react";

export default function Stepper({ steps, currentStep, stepOffset = 1 }) {
  return (
    <div className="w-full mb-8">
      {/* Container with grid layout for perfect alignment */}
      <div className="relative grid items-center" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        
        {/* Base line behind all steps */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0" />

        {steps.map((label, index) => {
          const stepNumber = index + stepOffset;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
            >
              {/* Step circle container */}
              <div className="flex items-center justify-center w-full relative">
                {/* Left connector - for all except first step */}
                {!isFirst && (
                  <div
                    className="absolute top-1/2 right-1/2 h-1 z-0 w-full"
                    style={{
                      backgroundColor: isCompleted ? "#DC2626" : "#D1D5DB",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                
                {/* Right connector - for all except last step */}
                {!isLast && (
                  <div
                    className="absolute top-1/2 left-1/2 h-1 z-0 w-full"
                    style={{
                      backgroundColor: stepNumber < currentStep ? "#DC2626" : "#D1D5DB",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}

                {/* Step circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-4 border-white transition-all duration-300 relative z-10
                    ${
                      isCompleted
                        ? "bg-red-500 text-white"
                        : isActive
                        ? "bg-red-600 text-white scale-110 shadow-lg"
                        : "bg-gray-300 text-gray-700"
                    }
                  `}
                >
                  {stepNumber}
                </div>
              </div>

              {/* Step label */}
              <span
                className={`mt-2 text-center text-sm font-medium transition-colors duration-300 px-1
                  ${
                    isActive
                      ? "text-red-600 font-semibold"
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
    </div>
  );
}