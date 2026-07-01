import { logoutUser } from "@/store/authStore"
import { NavLink } from "react-router-dom"
import st from "./Navigation.module.scss"
import { useState } from "react"

export const Navigation = () => {
    const [ activeBurger, setActiveBurger] = useState<boolean>(false)
    return (
        <aside className={st.navigation}>
            <div className={`${st.burger} ${activeBurger?st.active:""}`}
            onClick={()=>setActiveBurger(!activeBurger)} >
                <div className={st.burger__line} ></div>
            </div>
            <div className={`${st.navigation__body} ${activeBurger?st.active:""}`}>
                <nav className={st.menu}>
                    <ul className={st.menu__body}>
                        <li className={st.menu__item}>
                            <NavLink to='dashboard'>Dashboard</NavLink>
                        </li>
                        <li className={st.menu__item}>
                            <NavLink to='leads'>List of leads</NavLink>
                        </li>
                    </ul>
                </nav>
                <button className={st.navigation__logout} onClick={logoutUser}>Logout</button>
            </div>
        </aside>
    )
}