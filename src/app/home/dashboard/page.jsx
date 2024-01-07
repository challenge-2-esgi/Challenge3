'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import { role } from '@/constants'
import { Fragment } from 'react'
import Statistics from '../statistics/page'

function DashboardPage() {
    return (
        <Fragment>
            <Statistics />
        </Fragment>
    )
}

export default withRoleGuard([role.admin], DashboardPage)
