import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../provider/ContextProvider";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useContext(MyContext);
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosInstance.get("/my-blood-request").then((res) => {
      // latest 3 requests
      setRequests(res.data.slice(0, 3));
    });
  }, [axiosInstance]);

  const updateStatus = async (id, status) => {
    await axiosInstance.patch(`/update-donation-status/${id}`, { status });
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status } : r
      )
    );
  };

  const deleteRequest = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    await axiosInstance.delete(`/delete-donation-request/${id}`);
    setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, <span className="text-red-600">{user?.displayName}</span>
      </h1>

      {requests.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            My Recent Donation Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>{req.address}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td className="capitalize">{req.status}</td>

                    <td className="flex gap-2">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(req._id, "done")
                            }
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(req._id, "canceled")
                            }
                            className="btn btn-xs btn-warning"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => deleteRequest(req._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>

                      <button className="btn btn-xs btn-info">
                        View
                      </button>

                      <button className="btn btn-xs bg-black text-white">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <Link to="/dashboard/my-donation">
              <button className="btn btn-outline btn-error">
                View My All Requests
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
