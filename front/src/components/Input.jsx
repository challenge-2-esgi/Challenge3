import classNames from 'classnames'
import PropTypes from 'prop-types'

const Input = ({
    type = 'text',
    helperText = '',
    error = false,
    icon = null,
    iconPosition = 'left',
    ...props
}) => {
    const { className, ...p } = props

    const iconPositionClasses = {
        left: icon ? 'left-0' : '',
        right: icon ? 'right-0' : '',
    }[iconPosition]

    const paddingClasses = {
        left: icon ? 'pl-12' : 'pl-6',
        right: icon ? 'pl-6' : 'pl-6',
    }[iconPosition]

    const errorClasses = {
        input: 'border-red-500 text-red-900 placeholder-red-700 focus:border-red-500',
        helperText: 'text-red-600',
    }

    return (
        <div className="relative">
            <div className="relative">
                <input
                    className={classNames(
                        'border-stroke w-full rounded-lg border bg-transparent py-4 pr-10 outline-none focus:border-primary focus-visible:shadow-none',
                        error && errorClasses.input,
                        paddingClasses,
                        className
                    )}
                    type={type}
                    {...p}
                />
                {icon ? (
                    <div
                        className={classNames(
                            'pointer-events-none absolute inset-y-0 flex items-center p-3.5',
                            iconPositionClasses
                        )}
                    >
                        {icon}
                    </div>
                ) : null}
            </div>
            {helperText ? (
                <p
                    className={classNames(
                        'mt-2 text-sm text-gray-500',
                        error && errorClasses.helperText
                    )}
                >
                    {helperText}
                </p>
            ) : null}
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.bool,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
}

export default Input
