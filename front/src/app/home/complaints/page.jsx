'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import { role } from '@/constants'

const ComplaintsPage = () => {
    return <h1>complaints page</h1>
}

export default withRoleGuard([role.admin, role.support], ComplaintsPage)
