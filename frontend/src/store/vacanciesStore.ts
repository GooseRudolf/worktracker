import { create } from "zustand";
import { uiStore } from "./uiStore";
import { vacancyApi } from "@/api/apiVacancies";
import { getApiError } from "@/api/getApiError";
import { DEF_ERROR, vacancyErrorMessages } from "@/types/errors";

type vacanciesState = {
    currentVacancieId: number
    setcurrentVacancieId: (currentVacancieId: number) => void;
}

export const vacanciesStore = create<vacanciesState>((set) => ({
    currentVacancieId:NaN,
    setcurrentVacancieId:(id) => set({ currentVacancieId: id }),
}))

export const getDasgboard = async() =>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        const res = await vacancyApi.getDashboard()
        return res
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}
export const getVacancies = async(page:number)=>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        const res = await vacancyApi.getPageVacancies(page)
        return res
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}

export const searchVacancies = async(params?: { search?: string; status?: string })=>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        const res = await vacancyApi.searchVacancies(params)
        return res
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}