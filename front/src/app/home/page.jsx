'use client'

import Loader from '@/components/Loader'
import route from '@/constants/route'
import useStore from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isAdmin } from '../utils/role'

const HomePage = () => {
    const router = useRouter()
    const user = useStore((state) => state.loggedinUser)

    useEffect(() => {
        if (isAdmin(user)) {
            router.push(route.DASHBOARD)
        } else {
            router.push(route.COMPLAINTS)
        }
    }, [user])

    return <Loader className="h-1/2 bg-transparent" size="large" />
}

export default HomePage
