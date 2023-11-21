'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/translations/en/global.json'
import enValidation from '@/translations/en/validation.json'
import enModel from '@/translations/en/model.json'
import enForm from '@/translations/en/form.json'

import fr from '@/translations/fr/global.json'
import frValidation from '@/translations/fr/validation.json'
import frModel from '@/translations/fr/model.json'
import frForm from '@/translations/fr/form.json'

const LANGUAGES = {
    EN: 'en',
    FR: 'fr',
}
const NAMES = {
    [LANGUAGES.EN]: 'English',
    [LANGUAGES.FR]: 'Français',
}

const NAMESPACES = {
    DEFAULT: 'translation',
    VALIDATION: 'ns-validation',
    MODEL: 'ns-model',
    FORM: 'ns-form',
}

function buildResources(language) {
    return {
        [LANGUAGES.FR]: {
            [NAMESPACES.DEFAULT]: fr,
            [NAMESPACES.VALIDATION]: frValidation,
            [NAMESPACES.MODEL]: frModel,
            [NAMESPACES.FORM]: frForm,
        },
        [LANGUAGES.EN]: {
            [NAMESPACES.DEFAULT]: en,
            [NAMESPACES.VALIDATION]: enValidation,
            [NAMESPACES.MODEL]: enModel,
            [NAMESPACES.FORM]: enForm,
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

export {
    LANGUAGES as t_LANGUAGES,
    NAMES as t_LANGUAGES_NAMES,
    NAMESPACES as t_NAMESPACES,
}

export default i18n
