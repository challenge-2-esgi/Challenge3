'use client'

import { useTranslation } from 'react-i18next'

import Sidebar from '@/components/Sidebar'
import '@/i18n'
import route from '../../constants/route'

export default () => {
    const { t } = useTranslation()

    const menuItems = [
        {
            title: t('sidebar.item.dashboard'),
            path: route.DASHBOARD,
            icon: null,
        },
    ]

    return <Sidebar items={menuItems} />
}
