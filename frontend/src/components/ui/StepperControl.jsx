// StepperController.js
import React from "react";
import Button from "./Button";

export default function StepperController({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  loading,
}) {
  return (
    <div className="flex justify-between mt-8">
      {/* Back Button */}
      {currentStep > 1 ? (
        <Button
          type="button"
          onClick={onPrev}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Back
        </Button>
      ) : (
        <div></div>
      )}

      {/* Next / Submit Button */}
      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg shadow text-white transition ${
            loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      )}
    </div>
  );
}
