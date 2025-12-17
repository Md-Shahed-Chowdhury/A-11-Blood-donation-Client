import {  useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const SearchDonors = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [myDistrict, setMyDistrict] = useState(null);
  const [filteredData, setFilteredData] = useState({});
  const [searchedDonors, setSearchedDonors] = useState([]);
  const axiosInstance = useAxios();


  // fetch district & upazila data from public folder
  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const upazila = form.upazila.value;
    const district = districts.find(
      (district) => myDistrict == district.id
    ).name;
    const bloodGroup = form.bloodGroup.value;
    const filter = {
      upazila,
      district,
      bloodGroup,
    };
    setFilteredData({ ...filter });
  };
  useEffect(() => {
    if (!filteredData.bloodGroup) return;
    axiosInstance
      .post("/viewSearchedDonors", filteredData)
      .then((data) => setSearchedDonors([...data.data]));
  }, [filteredData, axiosInstance]);
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        Search Blood Donors
      </h1>

      <form
        onSubmit={handleSearch}
        className="bg-white shadow-lg rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div>
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            id="bloodGroup"
            className="input"
            name="bloodGroup"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="label">District</label>
          <select
            name="district"
            className="input"
            defaultValue=""
            onChange={(e) => setMyDistrict(e.target.value)}
            required
          >
            <option value="" disabled>
              District
            </option>

            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select name="upazila" className="input" defaultValue="" required>
            <option value="" disabled>
              Upazila
            </option>

            {upazilas
              .filter((upazila) => upazila.district_id == myDistrict)
              .map((upa) => (
                <option key={upa.id} value={upa.name}>
                  {upa.name}
                </option>
              ))}
          </select>
        </div>


        <div className="flex items-end">
          <button type="submit" className="btn btn-error w-full">
            Search
          </button>
        </div>
      </form>

      <div className="mt-10">
        {searchedDonors.length === 0 ? (
          <p className="text-center text-gray-500">
            No donors to show. Please search using the form above.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedDonors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={donor.photoUrl}
                    alt={donor.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {donor.name}
                    </h3>
                    <p className="text-sm text-gray-500">{donor.email}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Blood Group:</span>{" "}
                    <span className="text-red-600 font-semibold">
                      {donor.bloodGroup}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">District:</span>{" "}
                    {donor.district}
                  </p>
                  <p>
                    <span className="font-medium">Upazila:</span>{" "}
                    {donor.upazila}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
