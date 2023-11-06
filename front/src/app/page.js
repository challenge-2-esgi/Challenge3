'use client'

import Button from '@/components/Button'
import useStore from '@/store'
import { redirect } from 'next/navigation'

export default function Home() {
    const isAuthenticated = useStore((state) => state.isAuthenticated)
    const logoutAction = useStore((state) => state.logout)

    // TODO: add AccessGaurd
    if (!isAuthenticated) {
        redirect('login', 'replace')
    }

    return (
        <>
            <h1 className="ml-4">Challenge</h1>
            <Button
                className="ml-4 mt-4"
                size="medium"
                onClick={() => {
                    logoutAction()
                }}
            >
                logout
            </Button>
        </>
    )
}
