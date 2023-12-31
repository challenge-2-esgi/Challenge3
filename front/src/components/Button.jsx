import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const SIZE_CLASSES = {
    small: 'text-xs px-4 py-2',
    medium: 'text-sm px-6 py-2.5',
    large: 'text-base px-7 py-3',
}

const Button = ({
    children,
    type = 'button',
    disabled = false,
    outlined = false,
    size = 'small',
    ...props
}) => {
    const { className, ...p } = props

    return (
        <button
            className={twMerge(
                'flex flex-row items-center justify-center rounded-lg px-7 py-3 text-base font-medium text-white hover:bg-opacity-90 focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                outlined
                    ? 'hover:bg-neutral-500 border border-primary text-primary hover:bg-opacity-10'
                    : 'bg-primary',
                SIZE_CLASSES[size],
                className
            )}
            type={type}
            disabled={disabled}
            {...p}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
    outlined: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default Button
