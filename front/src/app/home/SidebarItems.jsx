'use client'

import { useTranslation } from 'react-i18next'

import Sidebar from '@/components/Sidebar'
import '@/i18n'
import route from '../../constants/route'
import useStore from '@/store'
import { role } from '@/constants'

export default () => {
    const { t } = useTranslation()

    const user = useStore((state) => state.loggedinUser)

    if (user == null) {
        return null
    }

    const menuItems = buildMenuItem(user.role, t)

    return <Sidebar items={menuItems} />
}

function buildMenuItem(userRole, t) {
    if (userRole === role.admin) {
        return [
            {
                title: t('sidebar.item.dashboard'),
                path: route.DASHBOARD,
                segment: route.segment.home.dashboard,
                icon: null,
            },
            {
                title: t('sidebar.item.fleet'),
                path: route.FLEET,
                segment: route.segment.home.fleet,
                icon: null,
            },
            {
                title: t('sidebar.item.users'),
                path: route.USERS,
                segment: route.segment.home.users,
                icon: null,
            },
            {
                title: t('sidebar.item.orders'),
                path: route.ORDERS,
                segment: route.segment.home.orders,
                icon: null,
            },
            {
                title: t('sidebar.item.ratings'),
                path: route.RATINGS,
                segment: route.segment.home.ratings,
            },
            {
                title: t('sidebar.item.deliverers'),
                path: route.DELIVERERS,
                segment: route.segment.home.deliverers,
                icon: null,
            },
            {
                title: t('sidebar.item.complaints'),
                path: route.COMPLAINTS,
                segment: route.segment.home.complaints,
                icon: null,
            },
        ]
    }

    if (userRole === role.support) {
        return [
            {
                title: t('sidebar.item.complaints'),
                path: route.COMPLAINTS,
                segment: route.segment.home.complaints,
                icon: null,
            },
        ]
    }

    return []
}
