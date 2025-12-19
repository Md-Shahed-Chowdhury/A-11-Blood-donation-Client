import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-50 via-red-100 to-red-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-red-700 leading-tight mb-6">
            Save Lives, <br />
            <span className="text-red-600">Donate Blood</span>
          </h1>

          <p className="text-lg md:text-xl text-red-600 mb-10 max-w-xl">
            Join our community of lifesavers today and make a real difference by
            helping those in need.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="relative z-10 bg-red-600 text-white font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-100"
            >
              Join as a Donor
            </button>

            <button
              onClick={() => navigate("/searchDonors")}
              className="bg-white text-red-600 font-semibold px-7 py-3 rounded-xl border-2 border-red-600 shadow-md hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-300"
            >
              Search Donors
            </button>
          </div>
        </div>

        {/* Right Visual Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🩸</div>
            <h3 className="text-2xl font-bold text-red-700 mb-2">
              Every Drop Counts
            </h3>
            <p className="text-gray-600">
              A single donation can save up to three lives. Be a hero today.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default Banner;
