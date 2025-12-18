import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router";

const AllRequest = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRequests = async (page = 1) => {
    const res = await axiosInstance.get(
      `all-blood-request-paginated?page=${page}`
    );

    setRequests(res.data.requests);
    setTotalPages(res.data.totalPages);
    setCurrentPage(res.data.page);
  };

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  const updateStatus = async (id, status) => {
    await axiosInstance.patch(`/update-donation-status/${id}`, { status });
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

  const deleteRequest = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    await axiosInstance.delete(`/delete-donation-request/${id}`);
    fetchRequests(currentPage);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {requests.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            My All Donation Requests
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

                    <td className="flex gap-2 flex-wrap">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => updateStatus(req._id, "done")}
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => updateStatus(req._id, "canceled")}
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

                      <button
                        onClick={() =>
                          navigate(`/pendingDetails/${req._id}`)
                        }
                        className="btn btn-xs btn-info"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/dashboard/edit-my-request/${req._id}`)
                        }
                        className="btn btn-xs bg-black text-white"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`btn btn-sm ${
                  currentPage === num + 1 ? "btn-error" : ""
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRequest;
