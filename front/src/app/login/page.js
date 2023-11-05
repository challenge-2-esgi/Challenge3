'use client'

import LoginForm from './LoginForm'

export default () => {
    return (
        <>
            <div className="shadow-default rounded-sm bg-white">
                <div className="flex h-screen flex-wrap items-center justify-center">
                    <div className="border-stroke w-full shadow-lg xl:w-1/2">
                        <div className="sm:p-12.5 xl:p-17.5 w-full p-4">
                            <span className="mb-1.5 block font-medium">
                                Authentication
                            </span>
                            <h2 className="sm:text-title-xl2 mb-9 text-2xl  font-bold">
                                Se connecter
                            </h2>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
