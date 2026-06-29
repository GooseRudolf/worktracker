import instance from './apiConfig'
import type { userLoginType, userRegisterType } from '@/types/userTypes'
import type { vacancyType } from '@/types/vacancyTypes'

export const authApi = {
    async registerUser(body: userRegisterType) {
        const response = await instance.post('/users/', body)
        return response.data
    },
    async logIn(body: userLoginType) {
        const response = await instance.post('/users/login/', body)
        return response.data
    },
    async logOut(body: { "refresh": string }) {
        const response = await instance.post('/users/logout/', body)
        return response.data
    },
    async resetPassword(body: { "email": string }) {
        const response = await instance.post('/users/resetpassword/', body)
        return response.data
    },
    async refreshToken(refresh: string) {
        const response = await instance.post('/token/refresh/', { refresh: refresh })
        return response.data
    }
}

export const userApi = {
    async getMe() {
        const response = await instance.get("/users/me/")
        return response.data
    },
}

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
        const response = await instance.patch(`/vacancies/${id}/`, body)
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