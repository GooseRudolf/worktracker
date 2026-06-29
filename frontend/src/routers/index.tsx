import { createBrowserRouter, Navigate } from "react-router-dom"
import { GuestRoute } from "./guest.route"
import { ProtectedRoute } from "./protected.route"
import { AuthLayout } from "@/layouts/AuthLayout"
import { MainLayout } from "@/layouts/MainLayout"
import { LoginForm, FogotPassword } from "@/pages/Auth/Login"
import { EmailConfirm, RegistrationForm } from "@/pages/Auth/Registration"
import { Dashboard } from "@/pages/Dashboard/Dashboard"
import { Leads } from "@/pages/Leads/Leads"
import {LeadForm} from "@/pages/LeadForm/LeadForm"


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
                    { index: true, element: <Navigate to="/dashboard" replace /> },
                    { path: "/dashboard", element: <Dashboard/> },
                    { path: "/leads", element: <Leads/> },
                    { path: "/leadform", element: <LeadForm/> },
                ]
            }
        ]
    }
])