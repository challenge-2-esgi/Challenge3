'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const LANGUAGES = {
    FR: 'fr',
    EN: 'en',
}

const NAMESPACES = {
    DEFAULT: 'translation',
    VALIDATION: 'ns-validation',
}

function buildResources(language) {
    const prefix = './translations/' + language
    const resources = [
        {
            ns: NAMESPACES.DEFAULT,
            resource: import(prefix + '/global.json').then(
                ({ default: json }) => json
            ),
        },
        {
            ns: NAMESPACES.VALIDATION,
            resource: import(prefix + '/validation.json').then(
                ({ default: json }) => json
            ),
        },
    ]

    return resources.reduce(
        (prev, current) => ({ ...prev, [current.ns]: current.resource }),
        {}
    )
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
