import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../services/authApi";

import { skipToken } from "@reduxjs/toolkit/query";
import { hasSession } from "../utils/authSession";



const ProtectedRoute = () => {
  const { data, isLoading, isError } = useGetMeQuery(hasSession() ? undefined : skipToken);
  const location = useLocation();
  
  
  if (!hasSession()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;