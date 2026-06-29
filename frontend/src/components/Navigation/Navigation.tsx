import { logoutUser } from "@/store/authStore"
import { NavLink } from "react-router-dom"

export const Navigation = () =>{
    return (
        <div className="">
            <nav className="">
                <ul>
                    <li className="">
                        <NavLink to='dashboard'>Dashboard</NavLink>
                    </li>
                    <li className="">
                        <NavLink to='leads'>List of leads</NavLink>
                    </li>
                </ul>
            </nav>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}