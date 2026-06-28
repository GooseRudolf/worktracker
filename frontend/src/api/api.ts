import axios from 'axios'
import type { userLoginType, userRegisterType } from '@/types/userTypes'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
    //withCredentials:true
})

export const authApi = {
    async registerUser(body: userRegisterType) {
        const response = await instance.post('users/', body)
        return response.data
    },
    async logIn(body:userLoginType){
        const response = await instance.post('users/login/', body)
        return response.data
    },
    async logOut( body:{"refresh":string}){
        const response = await instance.post('users/logout/', body)
        return response.data
    },
    async resetPassword(body:{"email":string}){
        const response = await instance.post('users/resetpassword/', body)
        return response.data
    },
    async refreshToken(refresh:string){
        const response = await instance.post('/token/refresh/', { refresh: refresh })
        return response.data
    }
}

export const userApi = {
    async getMe(token:string){
        const response = await instance.get("users/me/", {
                headers: { Authorization: `Bearer ${token}` }})
        return response.data
    },
}