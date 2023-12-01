import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'

const prefix = 'ratings'

export default {
    useRatings: () => {
        return useQuery({
            queryKey: ['ratings'],
            queryFn: async () => {
                const res = await client.get(prefix, { authorization: true })
                return res.data
            },
        })
    },
    useRating: (id) => {
        return useQuery({
            queryKey: ['rating', id],
            queryFn: async () => {
                const res = await client.get(prefix + '/' + id, {
                    authorization: true,
                })
                return res.data
            },
        })
    },
    useAdd: (onSuccess, onError) => {
        return useMutation({
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
        })
    },
    useUpdate: (id, onSuccess, onError) => {
        return useMutation({
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
        })
    },
    useDelete: (id, onSuccess, onError) => {
        return useMutation({
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
        })
    },
}
