import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "@/routers/index"
import { ErrorPanel } from "@/components/Error/ErrorPanel";
import { Loader } from "@/components/Loader/Loader";
import { uiStore } from "@/store/uiStore";
import { getMe } from "./store/userStore";
import { authStore } from "./store/authStore";

export const App = () => {
    const isFetching = uiStore((state) => state.isFetching);
    const errorMessage = uiStore((state) => state.errorMessage);
    const cleanError = uiStore((state) => state.setErrorMessage);
    const isAuth = authStore((state)=>state.isAuth)
    useEffect(() => {
        async function bootstrapAuth() { if (isAuth) await getMe()  }
        void bootstrapAuth()
    }, [isAuth])
    return (
        <div className="">
            <ErrorPanel msg={errorMessage} cleanError={cleanError} type={0} />
            {isFetching && <Loader />}
            <RouterProvider router={router} />
        </div>
    )
}