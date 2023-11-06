import storage from '@/services/storage'
import axios from 'axios'

// TODO: token expired interceptor

function buildClient() {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACK_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // token interceptor
    client.interceptors.request.use(
        (config) => {
            if (config.authorization) {
                const token = storage.getToken
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token
                }
            }

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    return client
}

const client = buildClient()

export default client
