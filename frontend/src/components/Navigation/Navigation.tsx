import { logoutUser } from "@/store/authStore"

export const Navigation = () =>{
    return (
        <div className="">
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}