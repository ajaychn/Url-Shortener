import { useNavigate } from "react-router-dom";
import {useLogoutMutation,} from "../services/authApi";
import { useAppDispatch } from "../store/hooks";
import { urlApi } from "../services/urlApi";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { clearUser } from "../features/auth/authSlice";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      dispatch(urlApi.util.resetApiState());

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 px-4 shadow">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <span className="text-xl font-bold">URL Shortener</span>

        <div className="flex items-center gap-4">
          <span className="text-sm">
            Hi, <strong>{user?.name}</strong>
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