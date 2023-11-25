'use client'

import { hasOneOfRoles } from '@/app/utils/role'
import Error from '@/components/Error'
import useStore from '@/store'
import { useTranslation } from 'react-i18next'

const withRoleGuard = (roles, Component) => {
    return (props) => {
        const { t } = useTranslation()
        const user = useStore((state) => state.loggedinUser)

        if (!hasOneOfRoles(user, roles)) {
            return (
                <div className="flex h-80 w-full items-center justify-center pt-6">
                    <Error
                        title={t('error.title')}
                        description={t('error.description')}
                    />
                </div>
            )
        }

        return <Component {...props} />
    }
}

export default withRoleGuard
