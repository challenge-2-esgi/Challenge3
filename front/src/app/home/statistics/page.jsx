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
                <StatisticCards />
                <Spacer />
                <div className="flex justify-center">
                    <DeliveriesPerDay />
                    <NewClientsPerDay />
                </div>
            </div>
        </>
    )
}

export default Statistics
