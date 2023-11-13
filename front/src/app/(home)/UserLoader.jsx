'use client'

import { User } from '@/api'
import Loader from '@/components/Loader'
import { Fragment } from 'react'

const UserLoader = ({ children }) => {
    const { isLoading, error } = User.useLoggedInUser()

    if (isLoading) {
        return <Loader size="large" />
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
