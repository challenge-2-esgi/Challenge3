'use client'

import { create } from 'zustand'

import { createAuthSlice } from './authSlice'

const useStore = create((...a) => ({
    ...createAuthSlice(...a),
}))

export default useStore
