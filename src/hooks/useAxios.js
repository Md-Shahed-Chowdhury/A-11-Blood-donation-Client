import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

export const axiosInstance = axios.create({
  baseURL: "https://a-11-server-three.vercel.app",
});

const useAxios = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      config.headers.authorization = `bearer ${user?.accessToken || ""}`;
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxios;
