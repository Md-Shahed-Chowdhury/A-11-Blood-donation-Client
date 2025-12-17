import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MyContext } from "../provider/ContextProvider";
import useAxios from "../hooks/useAxios";

const CreateDonation = () => {
  const { user } = useContext(MyContext);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  // fetch district & upazila
  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const districtName = districts.find(
      (d) => d.id == selectedDistrictId
    )?.name;

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      hospitalName: form.hospitalName.value,
      address: form.address.value,
      district: districtName,
      upazila: form.upazila.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      message: form.message.value,
      status: "pending",
      createdAt: new Date(),
    };

    axiosInstance.post("/add-blood-request", donationRequest).then((data) => {
      if (data.data.insertedId) {
        toast.success("Donation request created successfully!");
        form.reset();
        setSelectedDistrictId("");
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Create Donation Request
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        
        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            className="input input-bordered w-full"
            required
          />
        </div>
      
        <div>
          <label className="label">District</label>
          <select
            className="select select-bordered w-full"
            required
            onChange={(e) => setSelectedDistrictId(e.target.value)}
          >
            <option value="" disabled selected>
              Select District
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="label">Upazila</label>
          <select
            name="upazila"
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled selected>
              Select Upazila
            </option>
            {upazilas
              .filter((u) => u.district_id == selectedDistrictId)
              .map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Full Address</label>
          <input
            type="text"
            name="address"
            className="input input-bordered w-full"
            required
          />
        </div>

        

        
        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select blood group
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

       
        <div>
          <label className="label">Request Message</label>
          <textarea
            name="message"
            rows="4"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading} className="btn btn-error w-full">
          {loading ? "Requesting..." : "Request Donation"}
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
