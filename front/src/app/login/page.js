'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useToken from './useToken'
import Button from '@/components/Button'
import Input from '@/components/Input'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL
    const { token, setToken } = useToken()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(backUrl + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        if (res.ok) {
            const json = await res.json()
            setToken(json.token)
            router.push('/')
        } else {
            console.error(await res.text())
        }
    }

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

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium">
                                        Email
                                    </label>
                                    <Input
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        required
                                        type="email"
                                        placeholder="Enter your email"
                                        icon={
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.5">
                                                    <path
                                                        d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                        fill=""
                                                    />
                                                </g>
                                            </svg>
                                        }
                                        iconPosition="right"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium">
                                        Password
                                    </label>
                                    <Input
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        required
                                        type="password"
                                        placeholder="6+ Characters, 1 Capital letter"
                                        icon={
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.5">
                                                    <path
                                                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                        fill=""
                                                    />
                                                </g>
                                            </svg>
                                        }
                                        iconPosition="right"
                                    />
                                </div>
                                <Button
                                    className="mb-5 w-full"
                                    type="submit"
                                    size="large"
                                >
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
