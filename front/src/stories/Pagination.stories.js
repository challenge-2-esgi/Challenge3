import Pagination from '@/components/Pagination'
import { useState } from 'react'

export default {
    title: 'Components/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

const Template = {
    render: ({ currentPage, numberOfPages, maxPages }) => {
        const [page, setPage] = useState(currentPage)

        return (
            <Pagination
                currentPage={page}
                numberOfPages={numberOfPages}
                maxPages={maxPages}
                onNext={() => {
                    setPage((prev) => prev + 1)
                }}
                onPrevious={() => {
                    setPage((prev) => prev - 1)
                }}
                onSelect={(selectedPage) => {
                    setPage(selectedPage)
                }}
            />
        )
    },
}

export const NoDots = {
    ...Template,
    args: {
        currentPage: 1,
        numberOfPages: 5,
        maxPages: 5,
    },
}

export const DotsOnLeft = {
    ...Template,
    args: {
        currentPage: 8,
        numberOfPages: 10,
        maxPages: 5,
    },
}

export const DotsOnRight = {
    ...Template,
    args: {
        currentPage: 2,
        numberOfPages: 10,
        maxPages: 5,
    },
}

export const DotsOnLeftAndRight = {
    ...Template,
    args: {
        currentPage: 6,
        numberOfPages: 15,
        maxPages: 5,
    },
}
