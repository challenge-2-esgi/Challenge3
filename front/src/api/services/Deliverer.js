import { useQuery } from '@tanstack/react-query'
import client from '../client'

const prefix = 'deliverers'

export default {
    useDeliverers: () =>
        useQuery({
            queryKey: ['deliverers'],
            queryFn: async () => {
                const res = await client.get(prefix)
                return res.data
            },
        }),
}
