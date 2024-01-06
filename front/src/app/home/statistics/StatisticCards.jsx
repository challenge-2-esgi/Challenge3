'use client'

import { Order } from '@/api'
import { useTranslation } from 'react-i18next'
import StatisticCard from './StatisticCard'
import Statistics from '@/api/services/Statistics'

const StatisticCards = () => {
    const { t } = useTranslation()
    const { data: averageDelivererRating, isLoading: fetchingAverageRating } =
        Statistics.useAverageDelivererRating('')
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
                {deliveriesPerDay && (
                    <StatisticCard
                        title={t(`page.statistics.averageDeliveryTime`)}
                        value={deliveriesPerDay?.deliveriesCount?.toFixed(
                            1
                        )}
                    />
                )}
            </div>
            <div>
                {deliveriesPerDay && (
                    <StatisticCard
                        title={t(`page.statistics.totalDeliverers`)}
                        value={deliveriesPerDay?.deliveriesCount}
                    />
                )}
            </div>
            <div>
                {deliveriesPerDay && (
                    <StatisticCard
                        title={t(`page.statistics.totalClients`)}
                        value={deliveriesPerDay?.deliveriesCount}
                    />
                )}
            </div>
        </div>
    )
}

export default StatisticCards
