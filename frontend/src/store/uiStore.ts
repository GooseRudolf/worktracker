import { create } from "zustand";

interface uiType {
    isFetching: boolean;
    errorMessage: string

    setIsFetching: (isFetching: boolean) => void;
    setErrorMessage: (errorMessage: string) => void;
}

export const uiStore = create<uiType>()(
        (set) => ({
            isFetching:false,
            errorMessage:"",

            setIsFetching: (isFetching) => set({ isFetching: isFetching }),
            setErrorMessage:(errorMessage)=>set({errorMessage:errorMessage})
        })
)