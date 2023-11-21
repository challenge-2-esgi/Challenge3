import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'

const prefix = 'users'

export default {
    useLoggedInUser: () =>
        useQuery({
            queryKey: ['loggedInUser'],
            queryFn: async () => {
                const res = await client.get(prefix + '/current', {
                    authorization: true,
                })
                return res.data
            },
            retry: false,
        }),

    useUsers: () =>
        useQuery({
            queryKey: ['uses'],
            queryFn: async () => {
                const res = await client.get('users', { authorization: true })
                return res.data
            },
        }),

    useUser: (id) =>
        useQuery({
            queryKey: ['user', id],
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
