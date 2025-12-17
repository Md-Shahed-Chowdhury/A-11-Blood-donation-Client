import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { MyContext } from "../provider/ContextProvider";
import { toast } from "react-toastify";

const PendingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { user } = useContext(MyContext);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [request, setRequest] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleStatusChange = () => {
    axiosInstance.patch(`/pendingRequestUpdate/${id}`).then((data) => {
      if (data.data.modifiedCount > 0) {
        toast("Status updated from pending to inprogress");
        setStatusUpdate(!statusUpdate);
      }
    });
  };

  useEffect(() => {
    axiosInstance.get(`/pendingDetails/${id}`).then((res) => {
      setRequest(res.data);
    });
  }, [axiosInstance, id, statusUpdate]);

  if (!request) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow mt-7">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Donation Request Details
      </h1>

      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold">Requester Name:</span>{" "}
          {request.requesterName}
        </p>

        <p>
          <span className="font-semibold">Requester Email:</span>{" "}
          {request.requesterEmail}
        </p>

        <p>
          <span className="font-semibold">Recipient Name:</span>{" "}
          {request.recipientName}
        </p>

        <p>
          <span className="font-semibold">Hospital Name:</span>{" "}
          {request.hospitalName}
        </p>

        <p>
          <span className="font-semibold">Address:</span> {request.address}
        </p>

        <p>
          <span className="font-semibold">Blood Group:</span>{" "}
          <span className="text-red-600 font-bold">{request.bloodGroup}</span>
        </p>

        <p>
          <span className="font-semibold">Donation Date:</span>{" "}
          {request.donationDate}
        </p>

        <p>
          <span className="font-semibold">Donation Time:</span>{" "}
          {request.donationTime}
        </p>

        <p>
          <span className="font-semibold">Request Message:</span>
          <br />
          {request.message}
        </p>

        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className="badge badge-warning">{request.status}</span>
        </p>

        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-8">
        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
            } else {
              setOpenModal(true);
            }
          }}
          className="btn btn-error w-full"
        >
          Donate
        </button>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Donation
            </h2>

            <div className="space-y-4">
              <div>
                <label className="label">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="label">Donor Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="btn btn-error flex-1"
                onClick={() => {
                  setOpenModal(false);
                  handleStatusChange();
                }}
              >
                Confirm Donation
              </button>

              <button
                className="btn btn-outline flex-1"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDetails;
