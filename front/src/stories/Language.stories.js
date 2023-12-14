import Language from '@/components/Language'
import { t_LANGUAGES } from '@/i18n'

export default {
    title: 'Components/Language',
    component: Language,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        code: {
            options: [...Object.values(t_LANGUAGES)],
        },
    },
}

export const English = {
    args: {
        code: t_LANGUAGES.EN,
    },
}

export const French = {
    args: {
        code: t_LANGUAGES.FR,
    },
}
