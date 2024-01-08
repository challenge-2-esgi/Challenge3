import { useMutation } from '@tanstack/react-query'
import client from '../client'

export default {
    useLogin: ({ onSuccess = (token) => {}, onError = () => {} }) =>
        useMutation({
            mutationFn: async (data) => {
                const res = await client.post('login', data)
                return res.data
            },
            onSuccess: (data) => {
                onSuccess(data.token)
            },
            onError: (error) => {
                onError(error)
            },
        }),
}
