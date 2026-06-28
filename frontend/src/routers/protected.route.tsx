import { authStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
    const isAuth = authStore(s => s.isAuth)
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}