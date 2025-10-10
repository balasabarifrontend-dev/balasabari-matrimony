// src/pages/ServicesPage.jsx
import React, { useEffect, useState } from "react";
import { serviceService } from "../services/serviceService";
import { 
  StarIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  HeartIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon
} from "@heroicons/react/24/solid";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock services data with enhanced details
  const enhancedServices = [
    {
      id: 1,
      name: "Premium Matchmaking",
      description: "Personalized matchmaking with dedicated relationship manager and advanced compatibility analysis",
      price: "25,000",
      duration: "3 months",
      category: "premium",
      featured: true,
      popular: true,
      icon: HeartIcon,
      features: ["Dedicated Manager", "Advanced Matching", "Priority Support", "Unlimited Profiles"],
      badge: "Most Popular"
    },
    {
      id: 2,
      name: "Profile Verification",
      description: "Complete background verification and profile authentication for enhanced trust and security",
      price: "5,000",
      duration: "One-time",
      category: "verification",
      featured: true,
      icon: ShieldCheckIcon,
      features: ["Background Check", "Document Verification", "Trust Badge", "Enhanced Visibility"]
    },
    {
      id: 3,
      name: "Photo Shoot Service",
      description: "Professional matrimony photography with expert guidance for perfect profile pictures",
      price: "8,000",
      duration: "2 hours",
      category: "photography",
      icon: PhotoIcon,
      features: ["Professional Photographer", "Multiple Outfits", "Digital Copies", "Editing Included"]
    },
    {
      id: 4,
      name: "Astrology Matching",
      description: "Detailed horoscope matching and compatibility analysis by certified astrologers",
      price: "3,000",
      duration: "48 hours",
      category: "astrology",
      icon: StarIcon,
      features: ["Detailed Report", "Compatibility Score", "Remedies Suggested", "Expert Consultation"]
    },
    {
      id: 5,
      name: "Family Mediation",
      description: "Professional mediation services for family discussions and marriage negotiations",
      price: "12,000",
      duration: "As needed",
      category: "consultation",
      icon: UsersIcon,
      features: ["Experienced Mediator", "Confidential", "Multiple Sessions", "Documentation Support"]
    },
    {
      id: 6,
      name: "Relationship Counseling",
      description: "Pre-marital counseling and relationship guidance for a strong foundation",
      price: "6,000",
      duration: "4 sessions",
      category: "consultation",
      icon: ChatBubbleLeftRightIcon,
      features: ["Certified Counselor", "Personalized Sessions", "Confidential", "Practical Guidance"]
    }
  ];

  const categories = [
    { id: "all", name: "All Services", count: enhancedServices.length },
    { id: "premium", name: "Premium", count: enhancedServices.filter(s => s.category === "premium").length },
    { id: "verification", name: "Verification", count: enhancedServices.filter(s => s.category === "verification").length },
    { id: "photography", name: "Photography", count: enhancedServices.filter(s => s.category === "photography").length },
    { id: "astrology", name: "Astrology", count: enhancedServices.filter(s => s.category === "astrology").length },
    { id: "consultation", name: "Consultation", count: enhancedServices.filter(s => s.category === "consultation").length }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");
        // Use mock data for now
        setServices(enhancedServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message || "Failed to load services");
        setServices(enhancedServices); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = selectedCategory === "all" 
    ? enhancedServices 
    : enhancedServices.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Matrimony Services
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
            Enhance your matchmaking journey with our exclusive services designed to help you find your perfect life partner
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "500+", label: "Happy Couples" },
            { number: "98%", label: "Success Rate" },
            { number: "50+", label: "Cities Served" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-2xl font-bold text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white border-red-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-600"
              } hover:scale-105`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-80">({category.count})</span>
            </button>
          ))}
        </div>

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
              <p className="text-gray-600">Loading premium services...</p>
            </div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group border ${
                    service.popular ? 'border-yellow-300' : 'border-gray-200'
                  } hover:border-red-300 hover:-translate-y-2`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                        <StarIcon className="w-4 h-4" />
                        <span>{service.badge}</span>
                      </div>
                    </div>
                  )}

                  {/* Featured Ribbon */}
                  {service.featured && !service.popular && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold rotate-12 shadow-lg">
                      Featured
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      service.popular 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' 
                        : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Service Details */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-green-600">
                        ₹{service.price}
                      </span>
                      {service.duration && (
                        <span className="text-gray-500 flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 group-hover:scale-105 ${
                    service.popular
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 hover:from-yellow-500 hover:to-yellow-600'
                      : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                  } shadow-lg hover:shadow-xl`}>
                    Get Started Now
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Personalized Assistance?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Our relationship experts are here to help you choose the perfect service for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                📞 Call Us Now
              </button>
              <button className="bg-yellow-400 text-red-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
                💬 Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}