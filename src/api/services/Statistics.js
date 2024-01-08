import { useQuery } from '@tanstack/react-query'
import client from '../client'

const prefix = ''

export default {
    useActiveDeliverers: () =>
        useQuery({
            queryKey: ['activeDeliverers'],
            queryFn: async () => {
                const res = await client.get(
                    prefix + '/active-deliverers-count',
                    {
                        authorization: true,
                    }
                )
                return res.data
            },
            retry: false,
        }),
    useAverageDeliveryTile: () =>
        useQuery({
            queryKey: ['averageDeliveryTime'],
            queryFn: async () => {
                const res = await client.get(
                    prefix + '/average-delivery-time',
                    {
                        authorization: true,
                    }
                )
                return res.data
            },
            retry: false,
        }),
    useDeliveriesPerDay: () =>
        useQuery({
            queryKey: ['deliveriesPerDay'],
            queryFn: async () => {
                const res = await client.get(prefix + '/deliveries-per-day', {
                    authorization: true,
                })
                return res.data
            },
            retry: false,
        }),

    useAverageDelivererRating: () =>
        useQuery({
            queryKey: ['averageDelivererRating'],
            queryFn: async () => {
                const res = await client.get(
                    prefix + '/average-deliverer-rating',
                    {
                        authorization: true,
                    }
                )
                return res.data
            },
            retry: false,
        }),

    useNewUsersCount: () =>
        useQuery({
            queryKey: ['newUsersCount'],
            queryFn: async () => {
                const res = await client.get(prefix + '/new-users-count', {
                    authorization: true,
                })
                return res.data
            },
            retry: false,
        }),
}
