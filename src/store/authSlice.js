import storage from '@/services/storage'

export const createAuthSlice = (set, get) => ({
    isAuthenticated: (() => (storage.getToken() == null ? false : true))(),
    login: (token) => {
        storage.storeToken(token)
        return set((state) => ({ isAuthenticated: true }))
    },
    logout: () => {
        storage.removeToken()
        get().reset()
        return set((state) => ({ isAuthenticated: false }))
    },
})
