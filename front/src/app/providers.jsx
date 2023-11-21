'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const TOAST_DURATION = 2000 // 2 seconds

const Providers = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster
                position="top-center"
                toastOptions={{ duration: TOAST_DURATION }}
            />
            {children}
        </QueryClientProvider>
    )
}

export default Providers
