import instance from './apiConfig'
import type { vacancyType } from '@/types/vacancyTypes'


export const vacancyApi = {
    async getPageVacancies(page: number) {
        const response = await instance.get('/vacancies/', { params: { page } })
        return response.data
    },
    async getVacancy(id: number) {
        const response = await instance.get(`/vacancies/${id}`)
        return response.data
    },
    async createVacancy(body:vacancyType) {
        const response = await instance.post('/vacancies/', body)
        return response.data
    },
    async changeVacancy(id:number, body:vacancyType) {
        const response = await instance.put(`/vacancies/${id}/`, body)
        return response.data
    },
    async deleteVacancy(id: number) {
        const response = await instance.delete(`/vacancies/${id}/`)
        return response.data
    },

    async getDashboard() {
        const response = await instance.get('/vacancies/dashboard')
        return response.data
    },
    async searchVacancies(params?: { search?: string; status?: string }) {
        const response = await instance.get('/vacancies', { params })
        return response.data
    }
}