'use client'

import { Order } from '@/api'
import Loader from '@/components/Loader'
import { useTranslation } from 'react-i18next'

const TopClients = ({ params }) => {
    const { t } = useTranslation()
    const { data, isLoading } = Order.useOrder('')

    const statistics = {
        topClients: [
            {
                firstname: 'Client 1',
                lastname: 'Client 1',
                nbOfOrders: 100,
            },
            {
                firstname: 'Client 2',
                lastname: 'Client 2',
                nbOfOrders: 200,
            },
            {
                firstname: 'Client 3',
                lastname: 'Client 3',
                nbOfOrders: 300,
            },
            {
                firstname: 'Client 4',
                lastname: 'Client 4',
                nbOfOrders: 400,
            },
            {
                firstname: 'Client 5',
                lastname: 'Client 5',
                nbOfOrders: 500,
            },
            {
                firstname: 'Client 6',
                lastname: 'Client 6',
                nbOfOrders: 600,
            },
        ],
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-2xl font-bold">
                {t('page.statistics.titleTopClients')}
            </h1>
            {isLoading ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
                            <thead class="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-xs uppercase">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        {t('page.statistics.rank')}
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {t('page.statistics.firstname')}
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {t('page.statistics.lastname')}
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {t('page.statistics.nbOfOrders')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {statistics.topClients.map((client, index) => {
                                    return (
                                        <tr class="odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b odd:bg-white">
                                            <th
                                                scope="row"
                                                class="text-gray-900 whitespace-nowrap px-6 py-4 font-medium dark:text-white"
                                            >
                                                {index + 1}
                                            </th>
                                            <td class="px-6 py-4">
                                                {client.firstname}
                                            </td>
                                            <td class="px-6 py-4">
                                                {client.lastname}
                                            </td>
                                            <td class="px-6 py-4">
                                                {client.nbOfOrders}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TopClients
