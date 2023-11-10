import LanguagePicker from '@/components/LanguagePicker'
import { t_LANGUAGES } from '@/i18n'
import { useTranslation } from 'react-i18next'

export default {
    title: 'Components/LanguagePicker',
    component: LanguagePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            action: 'language changed',
        },
    },
}

export const Default = {
    render: () => {
        const { i18n } = useTranslation()
        return (
            <LanguagePicker
                defaultLanguage={i18n.language}
                languages={Object.values(t_LANGUAGES)}
                onChange={(selectedLanguage) => {
                    i18n.changeLanguage(selectedLanguage)
                }}
            />
        )
    },
}
