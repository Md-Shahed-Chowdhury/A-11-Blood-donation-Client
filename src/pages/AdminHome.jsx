import { useContext, useEffect, useState } from "react";
import { MyContext } from "../provider/ContextProvider";
import useAxios from "../hooks/useAxios";
import { FaUsers, FaTint, FaDollarSign } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useContext(MyContext);
  const axiosInstance = useAxios();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalFundings, setTotalFundings] = useState(0);

  useEffect(() => {
    axiosInstance.get("/users").then((res) => {
      setTotalUsers(res.data.length);
    });

    axiosInstance.get("/blood-requests").then((res) => {
      setTotalRequests(res.data.length);
    });

    axiosInstance.get("/all-fundings").then((res) => {
      setTotalFundings(res.data.length);
    });
  }, [axiosInstance]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-red-100 p-6 rounded-xl mb-8">
        <h1 className="text-2xl font-bold text-red-700">
          Welcome, {user?.displayName}
        </h1>
        <p className="text-gray-600">Here is an overview of the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <div className="p-4 bg-red-100 rounded-full">
            <FaUsers className="text-2xl text-red-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{totalUsers}</h2>
            <p className="text-gray-500">Total Donors</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <div className="p-4 bg-red-100 rounded-full">
            <FaTint className="text-2xl text-red-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{totalRequests}</h2>
            <p className="text-gray-500">Total Blood Requests</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <div className="p-4 bg-red-100 rounded-full">
            <FaDollarSign className="text-2xl text-red-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{totalFundings}</h2>
            <p className="text-gray-500">Total Fundings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
