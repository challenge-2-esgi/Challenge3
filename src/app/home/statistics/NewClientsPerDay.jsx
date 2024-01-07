'use client'

import { Order } from '@/api'
import Loader from '@/components/Loader'
import { useTranslation } from 'react-i18next'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const NewClientsPerDay = ({ params }) => {
    const { t } = useTranslation()
    const { data, isLoading } = Order.useOrder('')

    const statistics = {
        nbOfNewClientsPerDay: [
            {
                date: new Date().toLocaleDateString(),
                nbOfNewClients: 100,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfNewClients: 200,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfNewClients: 300,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfNewClients: 400,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfNewClients: 500,
            },
            {
                date: new Date().toLocaleDateString(),
                nbOfNewClients: 600,
            },
        ],
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-2xl font-bold">
                {t('page.statistics.titleNewClientsPerDay')}
            </h1>
            {isLoading ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <LineChart
                    width={500}
                    height={300}
                    data={statistics.nbOfNewClientsPerDay}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="nbOfNewClients" />
                    <Tooltip />
                    <Line
                        name={t('page.statistics.date')}
                        type="monotone"
                        dataKey="date"
                        stroke="#8884d8"
                        activeDot={{ r: 14 }}
                    />
                    <Line
                        name={t('page.statistics.nbOfNewClients')}
                        type="monotone"
                        dataKey="nbOfNewClients"
                        stroke="#82ca9d"
                    />
                </LineChart>
            )}
        </div>
    )
}

export default NewClientsPerDay
