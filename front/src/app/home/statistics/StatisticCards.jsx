'use client'

import { Order } from '@/api'
import { useTranslation } from 'react-i18next'
import StatisticCard from './StatisticCard'

const StatisticCards = () => {
    const { t } = useTranslation()
    const { data, isLoading: fetchingOrder } = Order.useOrder('')

    const statistics = [
        {
            title: 'averageRatingsDeliverers',
            value: 10,
        },
        {
            title: 'averageDeliveryTime',
            value: 70,
        },
    ]

    return (
        <div className="mb-5 flex flex-row items-center justify-center gap-3">
            {statistics.map((statistic, index) => {
                console.log(statistic[0])
                return (
                    <div className="">
                        <StatisticCard
                            key={index}
                            title={t(`page.statistics.${statistic.title}`)}
                            value={statistic.value}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default StatisticCards
