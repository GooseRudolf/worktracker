import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "@/routers/index"
import { ErrorPanel } from "@/components/Error/ErrorPanel";
import { Loader } from "@/components/Loader/Loader";
import { uiStore } from "@/store/uiStore";

export const App = () => {
    const isFetching = uiStore((state) => state.isFetching);
    const errorMessage = uiStore((state) => state.errorMessage);
    const cleanError = uiStore((state) => state.setErrorMessage);
    useEffect(() => {
        // getMe()
    }, [])
    return (
        <div className="">
            <ErrorPanel msg={errorMessage} cleanError={cleanError} type={0} />
            {isFetching && <Loader />}
            <RouterProvider router={router} />
        </div>
    )
}