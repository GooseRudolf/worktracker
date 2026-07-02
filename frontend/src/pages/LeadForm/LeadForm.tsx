import { useEffect, useState } from "react"
import { addVacancy, changeVacancy, deleteVacancy, getVacancyData, vacanciesStore } from "@/store/vacanciesStore"
import { vacancyInit, type vacancyType } from "@/types/vacancyTypes"
import st from './LeadForm.module.scss'
import { useNavigate } from "react-router-dom"
import { uiStore } from "@/store/uiStore"

export const LeadForm = () => {
    const [form, setForm] = useState<vacancyType>(vacancyInit)
    const vacancieId = vacanciesStore(s => s.currentVacancieId)
    const navigator = useNavigate()
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
    const setError = uiStore.getState().setErrorMessage
    const addLead = async () => {
        if (form.company && form.position) {
            await addVacancy(form)
            navigator("/leads")
        }else{setError("Укажите название компании и должность")}

    }
    const changeLead = async () => {
        if (vacancieId) {
            if (form.company && form.position) {
                await changeVacancy(vacancieId, form)
                navigator("/leads")
            }else{setError("Укажите название компании и должность")}
        }
    }
    const deleteLead = async () => {
        if (vacancieId) {
            deleteVacancy(vacancieId)
            navigator("/leads")
        }
    }
    return (
        <div className={st.leadForm}>
            <div className={st.leadForm__fielf}>
                <label htmlFor="company">Название компании</label>
                <input id="company" name="company" value={form.company} onChange={onChange} />
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="position">Должность</label>
                <input id="position" name="position" value={form.position} onChange={onChange} />
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="status">Статус</label>
                <select id="status" name="status" value={form.status} onChange={onChange}>
                    <option value="saved">Сохранено</option>
                    <option value="applied">Добавлено</option>
                    <option value="interview">Интервью</option>
                    <option value="offer">Оффер</option>
                    <option value="rejected">Отказано</option>
                </select>
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="salary">Ставка</label>
                <input id="salary" name="salary" value={form.salary ?? ""} onChange={onChange} />
            </div>
            <div className={st.leadForm__fielf}>
                <label htmlFor="url">URL вакансии</label>
                <input id="url" name="url" value={form.url ?? ""} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="notes">Заметки</label>
                <textarea id="notes" name="notes" value={form.notes ?? ""} onChange={onChange} />
            </div>

            {!isEmpty && (
                <>
                    <button className={st.leadForm__btn_save}
                        onClick={changeLead}>Сохранить</button>
                    <button className={st.leadForm__btn_delete}
                        onClick={deleteLead}>Удалить</button>
                </>
            )}

            {isEmpty && <button className={st.leadForm__btn_create}
                onClick={addLead}>Создать</button>}
        </div>
    )
}