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
            <h2 className={st.dashboard__title}>Панель управления</h2>
            <div className={st.dashboard__cards}>
                <div className={st.dashboard__card}>Всего: {boardData.total}</div>
                <div className={st.dashboard__card}>Интервью: {boardData.interview}</div>
                <div className={st.dashboard__card}>Офферы: {boardData.offer}</div>
                <div className={st.dashboard__card}>Активно: {boardData.active}</div>
            </div>
            <div className={st.topList}>
                <div className={st.topList__title}>Последние 5 записей</div>
                <div className={st.topList__items}>
                    {boardData.latest&&boardData.latest.map((elem: vacancyType) => (
                        <div key={elem.id} className={st.topList__item}
                            onClick={()=>redirectToForm(elem.id ?? null)}>
                            {elem.company} ({elem.position})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}