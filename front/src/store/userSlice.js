'use client'

const initialState = {
    loggedinUser: null,
}

export const createUserSlice = (set) => ({
    ...initialState,
    setUser: (data) => {
        return set(() => ({ loggedinUser: data }))
    },
    resetUser: () => set(initialState),
})
