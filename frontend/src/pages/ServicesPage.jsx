// src/pages/ServicesPage.jsx
import React, { useEffect, useState } from "react";
import { serviceService } from "../services/serviceService";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await serviceService.getActiveServices();
        setServices(result || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message || "Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-700">
        Our Services
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg bg-white transition-all duration-300 hover:border-red-300"
            >
              <h2 className="text-xl font-semibold mb-3 text-red-600">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              {service.price && (
                <div className="mb-3">
                  <span className="text-lg font-bold text-green-600">
                    ₹{service.price}
                  </span>
                  {service.duration && (
                    <span className="text-sm text-gray-500 ml-2">• {service.duration}</span>
                  )}
                </div>
              )}
              
              {service.featured && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-3">
                  Featured
                </span>
              )}
              
              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Learn More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}