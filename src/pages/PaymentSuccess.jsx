import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.post(`/payment-success?session_id=${sessionId}`);
  }, [axiosInstance, sessionId]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-285px)]">
      <div className="flex flex-col items-center">
        <h2 className="text-green-700 text-4xl">Payment successful</h2>
        <button className="btn bg-red-400 mt-5">Back</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
