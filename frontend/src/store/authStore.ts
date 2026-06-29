import { create } from "zustand"
import { authApi } from "@/api/apiUser"
import { uiStore } from "@/store/uiStore"
import { userStore } from "@/store/userStore"
import { authErrorMessages, DEF_ERROR } from "@/types/errors"
import type { userRegisterType, userLoginType } from "@/types/userTypes"
import { getApiError } from "@/api/getApiError"

type AuthState = {
  access: string;
  refresh: string;
  isAuth: boolean
  emailToConfirm: string
  setAccess: (access: string) => void;
  setRefresh: (refresh: string) => void;
  setIsAuth: (isAuth: boolean) => void
  setEmail: (email: string) => void
}

export const authStore = create<AuthState>((set) => ({
  access: "",
  refresh: "",
  isAuth: false,
  emailToConfirm: "",
  setAccess: (access) => set({ access: access }),
  setRefresh: (refresh) => set({ refresh: refresh }),
  setIsAuth: (isAuth) => set({ isAuth: isAuth }),
  setEmail: (email) => set({ emailToConfirm: email })
}))


export const registerUser = async(body: userRegisterType) => {
  const { setIsFetching, setErrorMessage } = uiStore.getState()
  const { setEmail } = authStore.getState()
  setIsFetching(true)
  try {
    await authApi.registerUser(body)
    setEmail(body.email)
  } catch (error: unknown) {
    setErrorMessage(getApiError(error, authErrorMessages, DEF_ERROR))
  }
  finally { setIsFetching(false) }

}

export const loginUser = async(body: userLoginType) => {
  const { setIsFetching, setErrorMessage } = uiStore.getState()
  const { setAccess, setRefresh, setIsAuth } = authStore.getState()
  const { setUserId } = userStore.getState()
  setIsFetching(true)
  try {
    const data = await authApi.logIn(body)
    setAccess(data.access)
    setRefresh(data.refresh)
    setIsAuth(true)
    setUserId(data.user.id)
  } catch (error: unknown) {
    setErrorMessage(getApiError(error, authErrorMessages, DEF_ERROR))
  }
  finally { setIsFetching(false) }
}

export const clearAuth = () => {
  const { setAccess, setRefresh, setIsAuth } = authStore.getState()
  setAccess("")
  setRefresh("")
  setIsAuth(false)
}

export const logoutUser = async() => {
  const { setIsFetching, setErrorMessage } = uiStore.getState()
  const { refresh } = authStore.getState()
  setIsFetching(true)
  try {
    await authApi.logOut({ 'refresh': refresh })
  } catch (error: unknown) {
    setErrorMessage(getApiError(error, authErrorMessages, DEF_ERROR))
  }
  finally { 
    clearAuth()
    setIsFetching(false) 
  }
}

export const resetPassword = async(email: string) => {
  const { setIsFetching, setErrorMessage } = uiStore.getState()
  const { setEmail } = authStore.getState()
  setIsFetching(true)
  try {
    await authApi.resetPassword({ 'email': email })
    setEmail(email)
  } catch (error: unknown) {
    setErrorMessage(getApiError(error, authErrorMessages, DEF_ERROR))
  }
  finally { setIsFetching(false) }
}

export const refreshToken = async() =>{
  const { refresh, setAccess, setRefresh } = authStore.getState()
  const data = await authApi.refreshToken(refresh)
  setAccess(data.access)
  setRefresh(data.refresh)
}