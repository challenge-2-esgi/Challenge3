'use client'

import { create } from 'zustand'

import { createAuthSlice } from './authSlice'
import { createUserSlice } from './userSlice'

const resetSlice = (set, get) => ({
    reset: () => {
        get().resetUser()
    },
})
const useStore = create((...a) => ({
    ...createAuthSlice(...a),
    ...createUserSlice(...a),
    ...resetSlice(...a),
}))

export default useStore
