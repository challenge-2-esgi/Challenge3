import { useQuery } from '@tanstack/react-query'
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
}
