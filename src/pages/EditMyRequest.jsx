import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const EditMyRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [request, setRequest] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  // fetch district & upazila
  useEffect(() => {
    fetch("/district.json")
      .then(res => res.json())
      .then(data => setDistricts(data));

    fetch("/upazila.json")
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  // fetch blood request
  useEffect(() => {
    axiosInstance.get(`/pendingDetails/${id}`).then(res => {
      setRequest(res.data);

      const districtObj = districts.find(d => d.name === res.data?.district);
      if (districtObj) {
        setSelectedDistrictId(districtObj.id);
      }
    });
  }, [id, axiosInstance, districts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      recipientName: form.recipientName.value || request.recipientName,
      hospitalName: form.hospitalName.value || request.hospitalName,
      address: form.address.value || request.address,
      district: form.district.value || request.district,
      upazila: form.upazila.value || request.upazila,
      bloodGroup: form.bloodGroup.value || request.bloodGroup,
      donationDate: form.donationDate.value || request.donationDate,
      donationTime: form.donationTime.value || request.donationTime,
      message: form.message.value || request.message,
    };

    const res = await axiosInstance.patch(
      `/update-blood-request/${id}`,
      updatedData
    );

    if (res.data.modifiedCount > 0) {
      toast.success("Donation request updated");
      navigate("/dashboard");
    }
  };

  if (!request) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-6">
        Edit Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Read only fields */}
        <div>
          <label className="label">Requester Name</label>
          <input value={request.requesterName} disabled className="input w-full bg-gray-100" />
        </div>

        <div>
          <label className="label">Requester Email</label>
          <input value={request.requesterEmail} disabled className="input w-full bg-gray-100" />
        </div>

        {/* Editable fields */}
        <div>
          <label className="label">Recipient Name</label>
          <input name="recipientName" defaultValue={request.recipientName} className="input w-full" />
        </div>

        <div>
          <label className="label">Hospital Name</label>
          <input name="hospitalName" defaultValue={request.hospitalName} className="input w-full" />
        </div>

        <div>
          <label className="label">Address</label>
          <input name="address" defaultValue={request.address} className="input w-full" />
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            name="district"
            className="input w-full"
            defaultValue={request.district}
            onChange={(e) => {
              const districtObj = districts.find(d => d.name === e.target.value);
              setSelectedDistrictId(districtObj?.id || null);
            }}
          >
            {districts.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label">Upazila</label>
          <select name="upazila" defaultValue={request.upazila} className="input w-full">
            {upazilas
              .filter(u => u.district_id === selectedDistrictId)
              .map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <select name="bloodGroup" defaultValue={request.bloodGroup} className="input w-full">
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="donationDate" defaultValue={request.donationDate} className="input" />
          <input type="time" name="donationTime" defaultValue={request.donationTime} className="input" />
        </div>

        <div>
          <label className="label">Message</label>
          <textarea name="message" defaultValue={request.message} className="textarea w-full"></textarea>
        </div>

        <button className="btn btn-error w-full">Update Request</button>
      </form>
    </div>
  );
};

export default EditMyRequest;
