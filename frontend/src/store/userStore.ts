import { create } from "zustand"
import { uiStore } from "./uiStore"
import type { userData } from "@/types/userTypes"
import { getApiError } from "@/api/getApiError"
import { DEF_ERROR, userErrorMessages } from "@/types/errors"
import { userApi } from "@/api/api"


type userState = {
  user_id:string
  user:userData
  setUserId:(id:string)=>void
  setUser: (user: userData) => void;
}

export const userStore = create<userState>((set) => ({
    user_id:"",
    user:{ username:"", email:"" },
    setUserId:(id)=>set({user_id:id}),
    setUser: (user) => set({ user: user }),
}))

export async function getMe() {
    const { setIsFetching, setErrorMessage } = uiStore.getState()
    const { setUser } = userStore.getState()
    setIsFetching(true)
    try {
        const res = await userApi.getMe()
        setUser({username:res.username, email:res.email})
    } catch (error: any) {
        setErrorMessage(getApiError(error, userErrorMessages, DEF_ERROR))
    }
    finally { setIsFetching(false) }
}