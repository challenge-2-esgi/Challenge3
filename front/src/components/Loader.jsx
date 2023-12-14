import classNames from 'classnames'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const SIZE_CLASSES = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-4',
    large: 'h-16 w-16 border-4',
}

const Loader = ({ className = '', size = 'medium', color = 'primary' }) => {
    return (
        <div
            className={twMerge(
                'flex items-center justify-center bg-white',
                className
            )}
        >
            <div
                className={classNames(
                    'animate-spin rounded-full border-solid  border-t-transparent',
                    SIZE_CLASSES[size],
                    'border-' + color
                )}
            ></div>
        </div>
    )
}

Loader.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.string,
    className: PropTypes.string,
}

export default Loader
