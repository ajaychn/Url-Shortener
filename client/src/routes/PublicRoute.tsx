import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../services/authApi";

import { skipToken } from "@reduxjs/toolkit/query";
import { hasSession } from "../utils/authSession";

const PublicRoute = () => {
  const { data, isLoading } = useGetMeQuery(hasSession() ? undefined : skipToken);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (data?.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;