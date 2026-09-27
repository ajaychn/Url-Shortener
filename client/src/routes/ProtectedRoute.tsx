import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../services/authApi";

const ProtectedRoute = () => {
  const location = useLocation();

  const { data, isLoading, isError } = useGetMeQuery();
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