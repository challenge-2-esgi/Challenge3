import { t_LANGUAGES, t_LANGUAGES_NAMES } from '@/i18n'
import PropTypes from 'prop-types'

import EnFlag from '@/app/assets/en-flag.svg'
import FrFlag from '@/app/assets/fr-flag.svg'

const Language = ({ code }) => {
    return (
        <div className="flex flex-row items-center [&>svg]:mr-3 [&>svg]:h-5 [&>svg]:w-5">
            {
                {
                    [t_LANGUAGES.EN]: <EnFlag />,
                    [t_LANGUAGES.FR]: <FrFlag />,
                }[code]
            }
            <span className="text-base">{t_LANGUAGES_NAMES[code]}</span>
        </div>
    )
}

Language.propTypes = {
    code: PropTypes.oneOf(Object.values(t_LANGUAGES)),
}

export default Language
