// src/pages/UpgradePage.jsx
import React, { useEffect, useState } from "react";
import { planService } from "../services/planService";

export default function UpgradePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await planService.getActivePlans();
        setPlans(result || []);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError(err.message || "Failed to load plans");
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId) => {
    try {
      // Implement plan selection/payment logic
      console.log("Selected plan:", planId);
      alert(`You selected plan ${planId}. Payment integration coming soon!`);
    } catch (err) {
      console.error("Error selecting plan:", err);
      alert("Failed to select plan. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-2 text-red-700">
        Upgrade Your Membership
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Choose the plan that works best for you
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : plans.length === 0 ? (
        <p className="text-center text-gray-500">No plans available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border p-6 rounded-lg shadow-lg bg-white text-center hover:scale-105 transition-transform duration-300 ${
                plan.featured ? 'border-2 border-yellow-400 relative' : 'border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                    POPULAR
                  </span>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-red-600 mb-2">{plan.name}</h2>
              
              {plan.price && (
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-800">₹{plan.price}</span>
                  {plan.duration && (
                    <span className="text-gray-600 ml-2">/{plan.duration}</span>
                  )}
                </div>
              )}

              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6 text-left">
                {plan.features && plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.featured 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.featured ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}