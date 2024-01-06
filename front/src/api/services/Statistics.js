import { useQuery } from '@tanstack/react-query';
import client from '../client';

const prefix = '';

export default {
    useDeliveriesPerDay: () =>
        useQuery({
            queryKey: ['deliveriesPerDay'],
            queryFn: async () => {
                const res = await client.get(prefix + '/deliveries-per-day', {
                    authorization: true,
                });
                return res.data;
            },
            retry: false,
        }),

    useAverageDelivererRating: () =>
        useQuery({
            queryKey: ['averageDelivererRating'],
            queryFn: async () => {
                const res = await client.get(prefix + '/average-deliverer-rating', {
                    authorization: true,
                });
                return res.data;
            },
            retry: false,
        }),

    useNewUsersCount: () =>
        useQuery({
            queryKey: ['newUsersCount'],
            queryFn: async () => {
                const res = await client.get(prefix + '/new-users-count', {
                    authorization: true,
                });
                return res.data;
            },
            retry: false,
        }),
};
