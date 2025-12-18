import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router";

const MyDonation = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchRequests = async (page = 1, status = "") => {
    const query = new URLSearchParams({
      page,
      ...(status && { status }),
    }).toString();

    const res = await axiosInstance.get(
      `/all-blood-request-paginated?${query}`
    );

    setRequests(res.data.requests);
    setTotalPages(res.data.totalPages);
    setCurrentPage(res.data.page);
  };

  useEffect(() => {
    fetchRequests(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const updateStatus = async (id, status) => {
    await axiosInstance.patch(`/update-donation-status/${id}`, { status });
    fetchRequests(currentPage, statusFilter);
  };

  const deleteRequest = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    await axiosInstance.delete(`/delete-donation-request/${id}`);
    fetchRequests(currentPage, statusFilter);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          My All Donation Requests
        </h2>

        {/* Status Filter */}
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {requests.length > 0 ? (
        <>
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
                    <td>{req.district}, {req.upazila}</td>
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
                        onClick={() => navigate(`/pendingDetails/${req._id}`)}
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
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No donation requests found.
        </p>
      )}
    </div>
  );
};

export default MyDonation;
