import React, { use } from 'react';
import { MyContext } from '../provider/ContextProvider';
import useAxios from '../hooks/useAxios';

const AllFundings = () => {
    const {user} = use(MyContext);
    const axiosInstance = useAxios();
    const donorEmail = user.email;
    const donorName = user.displayName;
    const handleSubmit = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const donation = {
        donorEmail,
        amount,
        donorName
    }
    console.log(donation)
    axiosInstance.post('/give-fund',donation)
    .then(data=>{
        window.location.href = data.data.url;
    });
    
  };

  return (
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
  );
};

export default AllFundings;