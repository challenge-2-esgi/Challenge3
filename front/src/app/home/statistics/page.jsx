'use client'

import { Order } from '@/api'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { t_NAMESPACES } from '@/i18n'
import DeliveriesPerDay from './DeliveriesPerDay'
import StatisticCards from './StatisticCards'
import NewClientsPerDay from './NewClientsPerDay'
import TopClients from './TopClients'
import Separator from '../../../components/Separator'
import Spacer from '../../../components/Spacer'

const Statistics = ({ params }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading: fetchingOrder } = Order.useOrder('')

    return (
        <>
            <div className="flex w-full flex-col">
                <p className="text-center text-xl font-bold">
                    {t('page.dashboard.main_title')}
                </p>
                <Separator />
                <StatisticCards />
                <Spacer />
                <div className="flex">
                    <DeliveriesPerDay />
                    <NewClientsPerDay />
                </div>
                <Separator />
                <TopClients />
            </div>
        </>
    )
}

export default Statistics
