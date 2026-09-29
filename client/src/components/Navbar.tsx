import { useNavigate } from "react-router-dom";
import {authApi, useGetMeQuery, useLogoutMutation,} from "../services/authApi";
import { useAppDispatch } from "../store/hooks";
import { urlApi } from "../services/urlApi";
import { clearSession } from "../utils/authSession";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {data} = useGetMeQuery()

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearSession();  
      dispatch(authApi.util.resetApiState());
      dispatch(urlApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="navbar bg-base-100 px-4 shadow">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <span className="text-xl font-bold">URL Shortener</span>

        <div className="flex items-center gap-4">
          <span className="text-sm">
            Hi, <strong>{data?.data.name}</strong>
          </span>

          <button
            className="btn btn-error btn-sm"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;