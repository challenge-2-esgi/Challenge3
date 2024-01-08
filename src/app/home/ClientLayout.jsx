'use client'

import LanguagePicker from '@/components/LanguagePicker'
import UserDropdown from '@/components/UserDropdown'
import route from '@/constants/route'
import { t_LANGUAGES } from '@/i18n'
import useStore from '@/store'
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import SidebarItems from './SidebarItems'
import UserLoader from './UserLoader'
import { useEffect } from 'react'

const ClientLayout = ({ children }) => {
    const { i18n } = useTranslation()

    const isAuthenticated = useStore((state) => state.isAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) {
            redirect(route.LOGIN, 'replace')
        }
    }, [isAuthenticated])

    return (
        <UserLoader>
            <div className="flex h-screen overflow-hidden">
                <SidebarItems />
                <div className="flex w-full flex-col">
                    <header className="realtive z-10 flex w-full items-center justify-end bg-white pr-10 drop-shadow-sm">
                        <UserDropdown />
                        <LanguagePicker
                            className="absolute left-8"
                            defaultLanguage={i18n.language}
                            languages={Object.values(t_LANGUAGES)}
                            onChange={(language) => {
                                i18n.changeLanguage(language)
                            }}
                        />
                    </header>
                    <main className="relative z-0 h-full w-full overflow-auto bg-whiten p-10">
                        {children}
                    </main>
                </div>
            </div>
        </UserLoader>
    )
}

export default ClientLayout
