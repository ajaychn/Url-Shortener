import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Dashboard from "../pages/dashboard/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes