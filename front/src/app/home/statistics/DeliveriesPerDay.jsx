'use client'

import { Order } from '@/api'
import Loader from '@/components/Loader'
import { useTranslation } from 'react-i18next'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const DeliveriesPerDay = ({ params }) => {
    const { t } = useTranslation()
    const { data, isLoading } = Order.useOrder('')

    const statistics = {
        nbOfDeliveriesPerDay: [
            {
                date: new Date().toLocaleDateString(),
                nbOfDeliveries: 100,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfDeliveries: 80,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfDeliveries: 30,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfDeliveries: 190,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfDeliveries: 1,
            },
        ],
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-2xl font-bold">
                {t('page.statistics.titleDeliveriesPerDay')}
            </h1>
            {isLoading ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <LineChart
                    width={500}
                    height={300}
                    data={statistics.nbOfDeliveriesPerDay}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="nbOfDeliveries" />
                    <Tooltip />
                    <Line
                        name={t('page.statistics.date')}
                        type="monotone"
                        dataKey="date"
                        stroke="#8884d8"
                        activeDot={{ r: 14 }}
                    />
                    <Line
                        name={t('page.statistics.nbOfDeliveries')}
                        type="monotone"
                        dataKey="nbOfDeliveries"
                        stroke="#82ca9d"
                    />
                </LineChart>
            )}
        </div>
    )
}

export default DeliveriesPerDay
