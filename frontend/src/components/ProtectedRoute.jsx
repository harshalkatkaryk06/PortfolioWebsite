import { Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const toastShown = useRef(false);

  useEffect(() => {
    if (!token && !toastShown.current) {
      toast.error("Please login first");
      toastShown.current = true;
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;