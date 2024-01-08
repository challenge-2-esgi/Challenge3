import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'

const prefix = 'orders'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    useOrders: (query) =>
        useQuery({
            queryKey: ['orders'],
            queryFn: async () => {
                const res = await client.get('orders?'+query, { authorization: true })
                return res.data
            },
        }),

    useOrder: (id) =>
        useQuery({
            queryKey: ['order', id],
            queryFn: async () => {
                const res = await client.get(prefix + '/' + id, {
                    authorization: true,
                })
                return res.data
            },
        }),

    useAdd: (onSuccess, onError) =>
        useMutation({
            mutationFn: async (data) => {
                const res = await client.post(prefix, data, {
                    authorization: true,
                })
                return res.data
            },
            onSuccess: () => {
                onSuccess()
            },
            onError: () => {
                onError()
            },
        }),

    useUpdate: (id, onSuccess, onError) =>
        useMutation({
            mutationFn: async (data) => {
                const res = await client.patch(prefix + '/' + id, data, {
                    authorization: true,
                })
                return res.data
            },
            onSuccess: () => {
                onSuccess()
            },
            onError: () => {
                onError()
            },
        }),

    useDelete: (id, onSuccess, onError) =>
        useMutation({
            mutationFn: async () => {
                const res = await client.delete(prefix + '/' + id, {
                    authorization: true,
                })
                return res.data
            },
            onSuccess: () => {
                onSuccess()
            },
            onError: () => {
                onError()
            },
        }),
}
