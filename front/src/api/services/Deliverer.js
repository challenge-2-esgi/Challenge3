import { useQuery } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'

const prefix = 'deliverers'

export default {
    useDeliverers: () =>
        useQuery({
            queryKey: ['deliverers'],
            queryFn: async () => {
                const res = await client.get('deliverers', { authorization: true })
                return res.data
            },
        }),
    useDeliverer: (id) =>
        useQuery({
            queryKey: ['deliverer', id],
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
