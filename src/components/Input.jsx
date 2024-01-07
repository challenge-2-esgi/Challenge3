import classNames from 'classnames'
import PropTypes from 'prop-types'

const Input = ({
    containerClasses = '',
    label = '',
    type = 'text',
    helperText = '',
    error = false,
    icon = null,
    iconPosition = 'left',
    ...props
}) => {
    // register : useForm props
    const { className, register, disabled, ...p } = props

    const iconPositionClasses = {
        left: icon ? 'left-0' : '',
        right: icon ? 'right-0' : '',
    }[iconPosition]

    const paddingClasses = {
        left: icon ? 'pl-12' : 'pl-6',
        right: icon ? 'pl-6' : 'pl-6',
    }[iconPosition]

    const errorClasses = {
        label: 'text-danger',
        input: 'border-danger text-danger placeholder-danger focus:border-danger',
        helperText: 'text-danger',
    }

    const disabledClasses = disabled
        ? '!bg-gray placeholder-body text-body'
        : ''

    return (
        <div className={classNames(containerClasses)}>
            {label ? (
                <label
                    className={classNames(
                        'mb-2.5 block font-medium',
                        error && errorClasses.label
                    )}
                >
                    {label}
                </label>
            ) : null}
            <div className="relative">
                <div className="relative">
                    <input
                        className={classNames(
                            'w-full rounded-lg border border-stroke bg-transparent py-4 pr-10 outline-none focus:border-primary focus-visible:shadow-none',
                            error && errorClasses.input,
                            paddingClasses,
                            disabledClasses,
                            className
                        )}
                        type={type}
                        disabled={disabled}
                        {...register}
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
                            'text-gray-500 mt-2 text-sm',
                            error && errorClasses.helperText
                        )}
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>
        </div>
    )
}

Input.propTypes = {
    containerClasses: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.bool,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
}

export default Input
