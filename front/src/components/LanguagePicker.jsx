import PropTypes from 'prop-types'
import Dropdown from './Dropdown'
import Language from './Language'

const LanguagePicker = ({ defaultLanguage, languages, onChange }) => {
    return (
        <div className="absolute right-8">
            <Dropdown
                buttonClasses="!bg-white !text-black !hover:bg-whiter"
                iconClasses="!hidden"
                label={<Language code={defaultLanguage} />}
                items={languages}
                renderItem={(language) => <Language code={language} />}
                onChange={(language) => {
                    onChange(language)
                }}
            />
        </div>
    )
}

LanguagePicker.propTypes = {
    defaultLanguage: PropTypes.string.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default LanguagePicker
