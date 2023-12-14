import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import 'tailwindcss/tailwind.css'
import i18n, { t_LANGUAGES, t_LANGUAGES_NAMES } from '../src/i18n'

const WithiI18next = (Story, context) => {
    const { locale } = context.globals

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale])

    return (
        <I18nextProvider i18n={i18n}>
            <Story />
        </I18nextProvider>
    )
}

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    globalTypes: {
        locale: {
            name: 'Locale',
            description: 'Internationalization locale',
            toolbar: {
                icon: 'globe',
                items: Object.values(t_LANGUAGES).map((lng) => ({
                    value: lng,
                    title: t_LANGUAGES_NAMES[lng],
                })),
                showName: true,
            },
        },
    },
    parameters: {
        i18n,
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [WithiI18next],
}

export default preview
