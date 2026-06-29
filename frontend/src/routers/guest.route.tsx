import { authStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router-dom"

export const GuestRoute = () => {
    const isAuth = authStore(s => s.isAuth)
    return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />
}