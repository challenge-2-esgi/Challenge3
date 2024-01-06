'use client'

import Loader from '@/components/Loader'
import { useTranslation } from 'react-i18next'

const StatisticCard = ({ title, value, loading = false }) => {
    const { t } = useTranslation()
    return (
        <div>
            <div className="mx-auto flex h-24 w-72 flex-col items-center justify-center bg-white shadow-lg">
                {loading ? (
                    <Loader size="medium" />
                ) : (
                    <>
                        <span className="text-gray-400 text-sm text-black">
                            {title}
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
