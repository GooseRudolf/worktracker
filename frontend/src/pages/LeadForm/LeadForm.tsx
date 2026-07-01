import { useEffect, useState } from "react"
import { addVacancy, changeVacancy, deleteVacancy, getVacancyData, vacanciesStore } from "@/store/vacanciesStore"
import { vacancyInit, type vacancyType } from "@/types/vacancyTypes"
import st from './LeadForm.module.scss'

export const LeadForm = () => {
    const [form, setForm] = useState<vacancyType>(vacancyInit)

    const vacancieId = vacanciesStore(s => s.currentVacancieId)

    useEffect(() => {
        const load = async () => {
            if (!vacancieId) return
            const res = await getVacancyData(vacancieId)
            setForm(res)
        }
        void load()
    }, [vacancieId])

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value })
    const isEmpty = !vacancieId

    const addLead = async()=>{
        await addVacancy(form)
    }
    const changeLead = async()=>{
        if (vacancieId) await changeVacancy(vacancieId, form)
    }
    const deleteLead = async()=>{
        if (vacancieId) deleteVacancy(vacancieId)
    }
    return (
        <div className={st.leadForm}>
            <div className={st.leadForm__fielf}>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" value={form.company} onChange={onChange} />
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="position">Position</label>
                <input id="position" name="position" value={form.position} onChange={onChange} />
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={form.status} onChange={onChange}>
                    <option value="saved">saved</option>
                    <option value="applied">applied</option>
                    <option value="interview">interview</option>
                    <option value="offer">offer</option>
                    <option value="rejected">rejected</option>
                </select>
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="salary">Salary</label>
                <input id="salary" name="salary" value={form.salary ?? ""} onChange={onChange} />
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="url">URL</label>
                <input id="url" name="url" value={form.url ?? ""} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" value={form.notes ?? ""} onChange={onChange} />
            </div>
            
            {!isEmpty && (
                <>
                    <button className={st.leadForm__btn_save}
                        onClick={changeLead}>save</button>
                    <button className={st.leadForm__btn_delete}
                    onClick={deleteLead}>delete</button>
                </>
            )}

            {isEmpty && <button className={st.leadForm__btn_create}
            onClick={addLead}>create</button>}
        </div>
    )
}