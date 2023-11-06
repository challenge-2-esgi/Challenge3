import storage from '@/services/storage'

export const createAuthSlice = (set) => ({
    isAuthenticated: (() => (storage.getToken() == null ? false : true))(),
    login: (token) => {
        storage.storeToken(token)
        return set((state) => ({ isAuthenticated: true }))
    },
    logout: () => {
        storage.removeToken()
        return set((state) => ({ isAuthenticated: false }))
    },
})
