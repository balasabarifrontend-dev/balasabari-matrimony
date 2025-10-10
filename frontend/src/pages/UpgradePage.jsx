// src/pages/UpgradePage.jsx
import React, { useEffect, useState } from "react";
import { planService } from "../services/planService";
import { 
  CheckBadgeIcon, 
  StarIcon, 
  ShieldCheckIcon,
  HeartIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  BoltIcon,
  TrophyIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";

export default function UpgradePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Enhanced mock plans data
  const enhancedPlans = [
    {
      id: 1,
      name: "Basic",
      description: "Perfect for starting your matrimony journey",
      price: "0",
      duration: "Forever",
      featured: false,
      popular: false,
      icon: UsersIcon,
      color: "gray",
      features: [
        "Create Basic Profile",
        "Browse Limited Profiles",
        "Send 5 Interests Monthly",
        "Basic Search Filters",
        "Email Support"
      ],
      buttonText: "Start Free"
    },
    {
      id: 2,
      name: "Premium",
      description: "Most popular choice for serious seekers",
      price: "2,999",
      duration: "3 months",
      featured: true,
      popular: true,
      icon: StarIcon,
      color: "red",
      features: [
        "Unlimited Profile Views",
        "Priority in Search Results",
        "Send Unlimited Interests",
        "Advanced Search Filters",
        "View Contact Details",
        "Dedicated Support",
        "Profile Highlighting",
        "Compatibility Reports"
      ],
      savings: "Save 40%",
      buttonText: "Go Premium"
    },
    {
      id: 3,
      name: "Elite",
      description: "Ultimate experience with personalized service",
      price: "9,999",
      duration: "6 months",
      featured: true,
      popular: false,
      icon: TrophyIcon,
      color: "purple",
      features: [
        "All Premium Features",
        "Personal Matchmaking",
        "Video Profile",
        "Background Verification",
        "Astrology Matching",
        "Family Mediation",
        "24/7 Priority Support",
        "Profile Featured Daily",
        "Verified Badge"
      ],
      savings: "Save 50%",
      buttonText: "Go Elite"
    }
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError("");
        // Use mock data for now
        setPlans(enhancedPlans);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError(err.message || "Failed to load plans");
        setPlans(enhancedPlans); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId) => {
    try {
      setSelectedPlan(planId);
      // Simulate payment process
      console.log("Selected plan:", planId);
      
      // Show success message
      const selectedPlan = enhancedPlans.find(p => p.id === planId);
      setTimeout(() => {
        alert(`🎉 Success! You've selected the ${selectedPlan.name} plan. Redirecting to payment...`);
        setSelectedPlan(null);
      }, 1000);
      
    } catch (err) {
      console.error("Error selecting plan:", err);
      alert("Failed to select plan. Please try again.");
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <SparklesIcon className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold">Upgrade Your Matrimony Experience</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Match Faster
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
            Unlock premium features and get noticed by the best matches. Join thousands of successful couples who found love through our platform.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "3x", label: "More Responses" },
            { number: "85%", label: "Success Rate" },
            { number: "24h", label: "Priority Support" },
            { number: "500+", label: "Monthly Matches" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-2xl font-bold text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 text-center max-w-2xl mx-auto shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading premium plans...</p>
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No plans available</h3>
            <p className="text-gray-500">Please check back later for available plans</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group border-2 ${
                    plan.popular 
                      ? 'border-yellow-400 bg-gradient-to-b from-white to-yellow-50 scale-105' 
                      : plan.color === 'gray'
                      ? 'border-gray-200 bg-white'
                      : 'border-red-200 bg-white'
                  } hover:scale-105`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                        <StarIcon className="w-4 h-4" />
                        <span>MOST POPULAR</span>
                      </div>
                    </div>
                  )}

                  {/* Savings Badge */}
                  {plan.savings && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold rotate-12 shadow-lg">
                      {plan.savings}
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' 
                        : plan.color === 'gray'
                        ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                        : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h2 className={`text-3xl font-bold text-center mb-2 ${
                    plan.popular ? 'text-yellow-600' : 'text-gray-800'
                  }`}>
                    {plan.name}
                  </h2>

                  {/* Plan Description */}
                  <p className="text-gray-600 text-center mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className={`text-4xl font-bold ${
                        plan.popular ? 'text-yellow-600' : 'text-gray-800'
                      }`}>
                        ₹{plan.price}
                      </span>
                      <span className="text-gray-500 text-lg">/{plan.duration}</span>
                    </div>
                    {plan.price !== "0" && (
                      <p className="text-green-600 text-sm font-semibold mt-2">
                        One-time payment • No hidden fees
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckBadgeIcon className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={selectedPlan === plan.id}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 hover:from-yellow-500 hover:to-yellow-600'
                        : plan.price === "0"
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                        : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                    }`}
                  >
                    {selectedPlan === plan.id ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>{plan.buttonText}</span>
                        <BoltIcon className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Guarantee Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <h3 className="font-bold text-gray-800">7-Day Money Back</h3>
                  <p className="text-sm text-gray-600">100% satisfaction guarantee</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <EyeIcon className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-bold text-gray-800">Secure Payment</h3>
                  <p className="text-sm text-gray-600">SSL encrypted transactions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600" />
                <div className="text-left">
                  <h3 className="font-bold text-gray-800">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I upgrade later?",
                answer: "Yes! You can upgrade from Basic to Premium or Elite at any time."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards, UPI, net banking, and popular wallets."
              },
              {
                question: "Is my payment secure?",
                answer: "Absolutely! We use bank-level encryption and never store your card details."
              },
              {
                question: "Can I get a refund?",
                answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 transition-colors">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}