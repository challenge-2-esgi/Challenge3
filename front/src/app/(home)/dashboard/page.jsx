'use client'

import Button from '@/components/Button'
import useStore from '@/store'
import { Fragment } from 'react'

function DashboardPage() {
    const logoutAction = useStore((state) => state.logout)

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default DashboardPage
