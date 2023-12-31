import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Pill = ({ title, color, outlined = false }) => {
    const bgClasses = `text-white bg-${color}`
    const outlinedClasses = `border border-${color} text-${color}`

    return (
        <span
            className={twMerge(
                'inline-flex cursor-default items-center rounded-full px-3 py-1 text-sm font-semibold',
                outlined ? outlinedClasses : bgClasses
            )}
        >
            {title}
        </span>
    )
}

Pill.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    outlined: PropTypes.bool,
}

export default Pill
