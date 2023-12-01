'use client'

import { Order } from '@/api'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { t_NAMESPACES } from '@/i18n'
import DeliveriesPerDay from './DeliveriesPerDay'
import StatisticCards from './StatisticCards'

const Statistics = ({ params }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading: fetchingOrder } = Order.useOrder('')

    return (
        <>
            <div className="flex w-full flex-col">
                <p className="mb-5 text-center text-xl font-bold">
                    {t('page.dashboard.main_title')}
                </p>
                <StatisticCards />
                <DeliveriesPerDay />
            </div>
        </>
    )
}

export default Statistics
