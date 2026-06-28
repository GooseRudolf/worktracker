import { createBrowserRouter, Navigate } from "react-router-dom"
import { GuestRoute } from "./guest.route"
import { ProtectedRoute } from "./protected.route"
import { AuthLayout } from "@/layouts/AuthLayout"
import { MainLayout } from "@/layouts/MainLayout"
import { Profile } from "@/pages/Profile/Profile"
import { LoginForm, FogotPassword } from "@/pages/Auth/Login"
import { EmailConfirm, RegistrationForm } from "@/pages/Auth/Registration"


export const router = createBrowserRouter([
    {
        element: <GuestRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: "/login", element: <LoginForm/> },
                    { path: "/registration", element: <RegistrationForm/> },
                    { path: "/emailconfirm", element: <EmailConfirm/> },
                    { path: "/forgotpassword", element: <FogotPassword/> }
                ]
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { index: true, element: <Navigate to="/profile" replace /> },
                    { path: "/profile", element: <Profile/> },
                ]
            }
        ]
    }
])