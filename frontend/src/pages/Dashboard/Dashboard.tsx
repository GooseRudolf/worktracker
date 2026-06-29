import { useEffect, useState } from "react"
import st from "./Dashboard.module.scss"
import { getDasgboard, vacanciesStore } from "@/store/vacanciesStore"
import { dashboardInit, type DashboardStats, type vacancyType } from "@/types/vacancyTypes"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const [boardData, setBoardData] = useState<DashboardStats>(dashboardInit)
    useEffect(() => {
        const initDashboard = async () => {
            const dashboardData = await getDasgboard()
            setBoardData(dashboardData)
            console.log(dashboardData)
        }
        void initDashboard()
    }, [])
    const navigate = useNavigate()
    const setVacancieId = vacanciesStore((state) => state.setcurrentVacancieId)
    const redirectToForm = (id:number|null)=>{
        setVacancieId(id)
        navigate("/leadform")
    }
    return (
        <div className={st.dashboard}>
            <h2>Dashboard</h2>
            <div className="cards">
                <div className="">Всего: {boardData.total}</div>
                <div className="">Интервью: {boardData.interview}</div>
                <div className="">Офферы: {boardData.offer}</div>
                <div className="">Активно: {boardData.active}</div>
            </div>
            <div className="last">
                <div className="">Последние 5 записей</div>
                <div className="">
                    {boardData.latest&&boardData.latest.map((elem: vacancyType) => (
                        <div key={elem.id} onClick={()=>redirectToForm(elem.id ?? null)}>
                            {elem.company} ({elem.position})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}