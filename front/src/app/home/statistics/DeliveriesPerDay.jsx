'use client'

import { Order } from '@/api'
import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { t_NAMESPACES } from '@/i18n'

const DeliveriesPerDay = ({ params }) => {
    const { t } = useTranslation()
    const { data, isLoading: fetchingOrder } = Order.useOrder('')

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
        <div>
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
                <Legend />
                <Line
                    label="Date de livraisons"
                    type="monotone"
                    dataKey="date"
                    stroke="#8884d8"
                    activeDot={{ r: 14 }}
                />
                <Line
                    label="Nombre de livraisons"
                    type="monotone"
                    dataKey="nbOfDeliveries"
                    stroke="#82ca9d"
                />
            </LineChart>
        </div>
    )
}

export default DeliveriesPerDay
