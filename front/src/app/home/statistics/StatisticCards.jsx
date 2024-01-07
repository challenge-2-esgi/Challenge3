'use client'

import { Order } from '@/api'
import { useTranslation } from 'react-i18next'
import StatisticCard from './StatisticCard'
import Statistics from '@/api/services/Statistics'

const StatisticCards = () => {
    const { t } = useTranslation()
    const { data: activeDeliverers, isLoading: fetchingActiveDeliverers } =
        Statistics.useActiveDeliverers('')
    const { data: averageDelivererRating, isLoading: fetchingAverageRating } =
        Statistics.useAverageDelivererRating('')
        const { data: averageDeliveryTime, isLoading: fetchingAverageDeliveryTime } =
        Statistics.useAverageDeliveryTile('')
    const { data: deliveriesPerDay, isLoading: fetchingDeliveriesPerDay } =
        Statistics.useDeliveriesPerDay('')

    console.log(deliveriesPerDay)
    return (
        <div className="mb-5 flex flex-row items-center justify-center gap-3">
            <div>
                {averageDelivererRating && (
                    <StatisticCard
                        title={t(`page.statistics.averageRatingsDeliverers`)}
                        value={averageDelivererRating?.averageRating?.toFixed(
                            1
                        )}
                    />
                )}
            </div>
            <div>
                {activeDeliverers && (
                    <StatisticCard
                        title={t(`page.statistics.activeDeliverers`)}
                        value={activeDeliverers?.activeDeliverersCount}
                    />
                )}
            </div>
            <div>
                {averageDeliveryTime && (
                    <StatisticCard
                        title={t(`page.statistics.averageDeliveryTime`)}
                        value={averageDeliveryTime?.averageDeliveryTime}
                    />
                )}
            </div>
        </div>
    )
}

export default StatisticCards
