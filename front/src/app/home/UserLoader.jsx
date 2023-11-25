'use client'

import { User } from '@/api'
import Loader from '@/components/Loader'
import useStore from '@/store'
import { Fragment, useEffect } from 'react'

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
        /**
         * TODO
         * add translation
         * create component for error message
         */
        return (
            <main className="m-auto flex h-60 items-center justify-center text-base">
                <p>
                    <strong>Uh oh, something went wrong Sorry!</strong> <br />
                    There was a problem with your request
                </p>
            </main>
        )
    }

    return <Fragment>{children}</Fragment>
}

export default UserLoader
