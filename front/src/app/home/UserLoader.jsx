'use client'

import { User } from '@/api'
import Loader from '@/components/Loader'
import useStore from '@/store'
import { Fragment, useEffect } from 'react'
import ServerError from './ServerError'

const UserLoader = ({ children }) => {
    const setUser = useStore((state) => state.setUser)
    const { isLoading, error, data } = User.useLoggedInUser()
    useEffect(() => {
        if (data != null) {
            setUser(data)
        }
    }, [data])

    if (isLoading) {
        return <Loader className="h-screen" size="large" />
    }

    if (error) {
        return <ServerError />
    }

    return <Fragment>{children}</Fragment>
}

export default UserLoader
