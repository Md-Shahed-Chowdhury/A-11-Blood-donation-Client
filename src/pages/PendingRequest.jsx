import React, { useEffect, useState } from "react";
import { MyContext } from "../provider/ContextProvider";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router";

const PendingRequest = () => {
  const [pendingRequest, setPendingRequest] = useState([]);
  const axiosInstance = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axiosInstance.get("/pendingRequest");
        setPendingRequest(res.data);
      } catch (err) {
        console.error("Failed to fetch pending requests:", err);
      }
    };
    fetchPendingRequests();
  }, [axiosInstance]);

  const handleView = (id) => {
    // console.log(id)
    navigate(`/pendingDetails/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-center">
        Pending Blood Donation Requests
      </h1>

      {pendingRequest.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">
            No pending donation requests at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingRequest.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-red-600 mb-2">
                  {request.recipientName}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Location:</span>{" "}
                  {request.address}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Hospital:</span>{" "}
                  {request.hospitalName}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Date:</span>{" "}
                  {request.donationDate}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Time:</span>{" "}
                  {request.donationTime}
                </p>

                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {request.bloodGroup}
                </span>
              </div>

              <button
                onClick={() => handleView(request._id)}
                className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequest;
