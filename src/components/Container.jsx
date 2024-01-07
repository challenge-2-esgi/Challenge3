import classNames from 'classnames'

const Container = ({ children, className = '' }) => {
    return (
        <div
            className={classNames(
                'flex max-w-full flex-col overflow-x-auto rounded-sm border border-stroke bg-white p-5 shadow-sm',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Container
