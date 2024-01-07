'use client'

import { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Chevron from '@/app/assets/chevron.svg'

const DOTS = '...'

const Pagination = ({
    currentPage,
    numberOfPages,
    onSelect,
    onNext,
    onPrevious,
    maxPages = 5,
    className = '',
}) => {
    const pages = useMemo(() => {
        // page index is zero indexed

        if (numberOfPages < maxPages || numberOfPages - maxPages <= 1) {
            return range(0, numberOfPages - 1)
        }

        // dots on the right
        if (currentPage <= maxPages - 1) {
            return [...range(0, maxPages - 1), DOTS, numberOfPages - 1]
        }

        // dots on the left
        if (
            currentPage === numberOfPages ||
            currentPage >= numberOfPages - maxPages
        ) {
            return [
                0,
                DOTS,
                ...range(numberOfPages - maxPages, numberOfPages - 1),
            ]
        }

        // dots on the left and right
        return [
            0,
            DOTS,
            ...range(currentPage - 1, currentPage + 1),
            DOTS,
            numberOfPages - 1,
        ]
    }, [currentPage, numberOfPages])

    return (
        <ul
            className={classNames(
                'flex flex-wrap items-center gap-x-1',
                className
            )}
        >
            {numberOfPages <= maxPages ? null : (
                <li>
                    <IteratorIcon
                        classname="mr-2 [&>svg]:rotate-180"
                        onClick={onPrevious}
                    />
                </li>
            )}
            {pages.map((page, i) => (
                <li key={i}>
                    <Page
                        current={currentPage}
                        index={page}
                        onSelect={onSelect}
                    />
                </li>
            ))}
            {numberOfPages <= maxPages ? null : (
                <li>
                    <IteratorIcon classname="ml-2" onClick={onNext} />
                </li>
            )}
        </ul>
    )
}

const Page = ({ index, current, onSelect }) => {
    const pageClasses =
        'flex cursor-pointer items-center justify-center rounded px-3 py-1.5 text-body font-medium hover:bg-primary hover:text-white'
    const activePageClasses = 'bg-primary text-white'
    const dotsClasses = 'cursor-default font-medium text-body'

    if (index === DOTS) {
        return <span className={dotsClasses}>{index}</span>
    }

    return (
        <span
            className={classNames(
                pageClasses,
                current === index ? activePageClasses : ''
            )}
            onClick={() => {
                onSelect(index)
            }}
        >
            {index + 1}
        </span>
    )
}

const IteratorIcon = ({ classname: className, onClick }) => {
    const pageClasses =
        'flex cursor-pointer items-center justify-center rounded px-3 py-1.5 text-body font-medium hover:bg-primary hover:text-white'
    const chevronClasses =
        'h-8 w-8 [&>svg]:h-4 [&>svg]:w-2 [&>svg]:fill-current'

    return (
        <span
            className={classNames(pageClasses, chevronClasses, className)}
            onClick={onClick}
        >
            <Chevron />
        </span>
    )
}

function range(start, stop, step = 1) {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    )
}

Pagination.propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    maxPages: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
}

export default Pagination
