import { Pagination } from "@/components/Pagination/Pagination"
import { getVacancies, searchVacancies, vacanciesStore } from "@/store/vacanciesStore"
import type { vacancyType } from "@/types/vacancyTypes"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import st from './Leads.module.scss'

export const Leads = () => {
    const [searchInp, setsearchInp] = useState<string>("")
    const [searchStatus, setsearchStatus] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [vacanciesList, setVacanciesList] = useState<vacancyType[]>([])

    const navigate = useNavigate()
    const setVacancieId = vacanciesStore((state) => state.setcurrentVacancieId)
    useEffect(() => {
        const initLeads = async () => {
            const res = await getVacancies(page)
            setTotalPage(Math.ceil(res.count / 2))
            setVacanciesList(res.results)
        }
        void initLeads()
    }, [page])
    useEffect(() => {
        const sortBySearch = async () => {
            let body: any = {}
            if (searchInp) body.search = searchInp
            if (searchStatus) body.status = searchStatus
            const res = await searchVacancies(body)
            setTotalPage(Math.ceil(res.count / 2))
            setVacanciesList(res.results)
        }
        void sortBySearch()
    }, [searchInp, searchStatus])
    const redirectToForm = (id:number|null)=>{
        setVacancieId(id)
        navigate("/leadform")
    }
    return (
        <div className={st.listLeads}>
            <h2 className={st.listLeads__title}>Leads</h2>
            <div className={st.listLeads__instruments}>
                <input type="text" placeholder="search" value={searchInp}
                    onChange={(e) => setsearchInp(e.target.value)} />
                <select value={searchStatus} onChange={(e) => setsearchStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="saved">saved</option>
                    <option value="applied">applied</option>
                    <option value="interview">interview</option>
                    <option value="offer">offer</option>
                    <option value="rejected">rejected</option>
                </select>
                <button onClick={()=>redirectToForm(null)}>Add vacantion</button>
            </div>
            <div className={st.listLeads__items}>
                {vacanciesList && vacanciesList.map((elem: vacancyType) => (
                    <div key={elem.id} className={st.listLeads__item}
                    onClick={()=>redirectToForm(elem.id ?? null)}>
                        {elem.company} ({elem.position})
                    </div>
                ))}
            </div>
            <Pagination page={page} total={totalPage} onChange={setPage} />
        </div>
    )
}