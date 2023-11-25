'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import { role } from '@/constants'
import { Fragment } from 'react'

function DashboardPage() {
    return (
        <Fragment>
            <h1 className="ml-4">Dashboard Page</h1>
        </Fragment>
    )
}

export default withRoleGuard([role.admin], DashboardPage)
