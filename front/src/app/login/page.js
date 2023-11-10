'use client'

import LanguagePicker from '@/components/LanguagePicker'
import { t_LANGUAGES } from '@/i18n'
import { useTranslation } from 'react-i18next'
import LoginForm from './LoginForm'
import { t } from 'i18next'

export default () => {
    const { i18n, t } = useTranslation()
    return (
        <div className="shadow-default rounded-sm bg-white">
            <LanguagePicker
                className="absolute right-8"
                defaultLanguage={i18n.language}
                languages={Object.values(t_LANGUAGES)}
                onChange={(language) => {
                    i18n.changeLanguage(language)
                }}
            />
            <div className="flex h-screen flex-wrap items-center justify-center">
                <div className="w-full border-stroke shadow-lg xl:w-1/2">
                    <div className="sm:p-12.5 xl:p-17.5 w-full p-4">
                        <h2 className="sm:text-title-xl2 mb-9 mt-5 text-2xl font-bold">
                            {t('login_form.title')}
                        </h2>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
