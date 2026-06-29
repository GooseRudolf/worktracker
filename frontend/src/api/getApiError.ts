import axios from "axios"

export function getApiError(error: unknown, dict: Record<string, string>, defaultMessage: string) {
    if (!axios.isAxiosError(error))
        return defaultMessage

    const apiError = error.response?.data?.errors?.[0]
    if (!apiError)
        return defaultMessage

    return dict[apiError.code] ?? apiError.message.detail ?? defaultMessage
}