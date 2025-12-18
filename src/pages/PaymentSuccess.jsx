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
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-green-700 text-4xl">Payment successful</h2>
      </div>
    </div>
  );
};

export default PaymentSuccess;
