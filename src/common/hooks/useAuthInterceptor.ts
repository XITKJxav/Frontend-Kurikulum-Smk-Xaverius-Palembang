import setupInterceptor from "@utils/authInterceptor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthInterceptor = (guard: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptor(guard, navigate);
  }, []);
};

export default useAuthInterceptor;
