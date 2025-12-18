import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-100 py-16 px-6 md:px-20 text-center relative overflow-hidden">
      <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-8">
        Save Lives, Donate Blood
      </h1>
      <p className="text-lg md:text-xl text-red-600 mb-12">
        Join our community of lifesavers today!
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => navigate("/register")}
          className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Join as a Donor
        </button>

        <button
          onClick={() => navigate("/searchDonors")}
          className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition duration-300"
        >
          Search Donors
        </button>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply opacity-30 -z-10"></div>
    </div>
  );
};

export default Banner;
