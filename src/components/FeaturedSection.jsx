import React from "react";
import { FaHeartbeat, FaUsers, FaSearch } from "react-icons/fa";

const FeaturedSection = () => {
  const features = [
    {
      icon: <FaHeartbeat className="text-red-600 w-10 h-10 mb-4" />,
      title: "Save Lives",
      description:
        "By donating blood, you can help save multiple lives and make a real difference in your community.",
    },
    {
      icon: <FaUsers className="text-red-600 w-10 h-10 mb-4" />,
      title: "Join a Community",
      description:
        "Connect with a network of donors and recipients. Be part of a lifesaving community.",
    },
    {
      icon: <FaSearch className="text-red-600 w-10 h-10 mb-4" />,
      title: "Find Donors Easily",
      description:
        "Search for available blood donors in your area quickly and efficiently when needed.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-700">Why Choose Us?</h2>
        <p className="mt-2 text-lg text-gray-600">
          Our platform is designed to make blood donation easier and more impactful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-red-50 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 text-center"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold text-red-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
