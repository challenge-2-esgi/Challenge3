'use client'

import { Order } from '@/api'
import Loader from '@/components/Loader'
import { useTranslation } from 'react-i18next'

const StatisticCard = ({ title, value, loading }) => {
    const { t } = useTranslation()
    const { data, isLoading: fetchingOrder } = Order.useOrder('')
    return (
        <div>
            <div className="mx-auto flex h-24 w-96 flex-col items-center justify-center bg-white shadow-lg">
                {loading ? (
                    <Loader size="small" />
                ) : (
                    <>
                        <span className="text-gray-400 text-sm text-black">
                            {t(title)}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                            {value}
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default StatisticCard
