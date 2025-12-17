import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../provider/ContextProvider";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(MyContext);
  const axiosInstance = useAxios();

  const [editable, setEditable] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/${user.email}`)
        .then((res) => setDbUser(res.data));
    }
  }, [user, axiosInstance]);

  if (!dbUser) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedData = {
      name: form.name.value,
      district: form.district.value,
      upazila: form.upazila.value,
      bloodGroup: form.bloodGroup.value,
    };

    const res = await axiosInstance.patch(
      `/updateProfile/${dbUser.email}`,
      updatedData
    );

    if (res.data.modifiedCount > 0) {
      setDbUser({ ...dbUser, ...updatedData });
      setEditable(false);
      toast.success("Profile updated");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">Profile</h2>

        {!editable ? (
          <button onClick={() => setEditable(true)} className="btn btn-error">
            Edit
          </button>
        ) : (
          <button form="profileForm" type="submit" className="btn btn-success">
            Save
          </button>
        )}
      </div>

      <form id="profileForm" onSubmit={handleSubmit} className="space-y-4">
        <img
          src={dbUser.photoUrl}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
        />

        <div>
          <label className="label">Name</label>
          <input
            name="name"
            defaultValue={dbUser.name}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            value={dbUser.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            defaultValue={dbUser.bloodGroup}
            disabled={!editable}
            className="input input-bordered w-full"
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">District</label>
          <select
            name="district"
            defaultValue={dbUser.district}
            disabled={!editable}
            className="input input-bordered w-full"
          >
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            name="upazila"
            defaultValue={dbUser.upazila}
            disabled={!editable}
            className="input input-bordered w-full"
          >
            {upazilas.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Profile;
