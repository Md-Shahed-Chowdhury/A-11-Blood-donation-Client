import React, { use, useEffect, useState } from "react";
import { MyContext } from "../provider/ContextProvider";
import useAxios from "../hooks/useAxios";

const AllFundings = () => {
  const { user } = use(MyContext);
  const axiosInstance = useAxios();
  const [fundings, setFundings] = useState([]);

  const donorEmail = user.email;
  const donorName = user.displayName;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;

    const donation = {
      donorEmail,
      donorName,
      amount,
    };

    axiosInstance.post("/give-fund", donation).then((data) => {
      window.location.href = data.data.url;
    });
  };

  useEffect(() => {
    axiosInstance.get("/all-fundings").then((result) => {
      setFundings(result.data);
    });
  }, [axiosInstance]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      

      {/* Funding Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          All Fundings
        </h3>

        {fundings.length === 0 ? (
          <p className="text-center text-gray-500">
            No funding records found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Donor Email</th>
                  <th>Paid At</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {fundings.map((fund, index) => (
                  <tr key={fund._id}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">${fund.amount}</td>
                    <td>{fund.donorEmail}</td>
                    <td>
                      {new Date(fund.paidAt).toLocaleString()}
                    </td>
                    <td>
                      <span className="badge badge-success capitalize">
                        {fund.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Donate Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-semibold">Donation Amount</label>
            <input
              type="number"
              name="amount"
              min="1"
              placeholder="Enter amount"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-error w-full">
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllFundings;
