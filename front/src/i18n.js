'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/translations/en/global.json'
import enValidation from '@/translations/en/validation.json'

import fr from '@/translations/fr/global.json'
import frValidation from '@/translations/fr/validation.json'

const LANGUAGES = {
    FR: 'fr',
    EN: 'en',
}

const NAMESPACES = {
    DEFAULT: 'translation',
    VALIDATION: 'ns-validation',
}

function buildResources(language) {
    return {
        [LANGUAGES.FR]: {
            [NAMESPACES.DEFAULT]: fr,
            [NAMESPACES.VALIDATION]: frValidation,
        },
        [LANGUAGES.EN]: {
            [NAMESPACES.DEFAULT]: en,
            [NAMESPACES.VALIDATION]: enValidation,
        },
    }[language]
}

i18n.use(initReactI18next).init({
    resources: {
        [LANGUAGES.FR]: buildResources(LANGUAGES.FR),
        [LANGUAGES.EN]: buildResources(LANGUAGES.EN),
    },
    lng: LANGUAGES.FR,
    fallbackLng: LANGUAGES.FR,
    interpolation: {
        escapeValue: false,
    },
})

export { LANGUAGES as t_LANGUAGES, NAMESPACES as t_NAMESPACES }

export default i18n
