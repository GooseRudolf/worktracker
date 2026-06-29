import { create } from "zustand";
import { uiStore } from "./uiStore";
import { vacancyApi } from "@/api/apiVacancies";
import { getApiError } from "@/api/getApiError";
import { DEF_ERROR, vacancyErrorMessages } from "@/types/errors";
import type { vacancyType } from "@/types/vacancyTypes";

type vacanciesState = {
    currentVacancieId: number|null
    setcurrentVacancieId: (currentVacancieId: number|null) => void;
}

export const vacanciesStore = create<vacanciesState>((set) => ({
    currentVacancieId:null,
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
export const getVacancyData = async(id:number)=>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        const res = await vacancyApi.getVacancy(id)
        return res
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}

export const addVacancy = async(body:vacancyType)=>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        await vacancyApi.createVacancy(body)
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}
export const changeVacancy = async(id:number, body:vacancyType)=>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        await vacancyApi.changeVacancy(id, body)
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}
export const deleteVacancy = async(id:number)=>{
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    setIsFetching(true)
    try {
        await vacancyApi.deleteVacancy(id)
    } catch (error: any) {
        setErrorMessage(getApiError(error, vacancyErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}