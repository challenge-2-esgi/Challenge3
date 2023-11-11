'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import PropTypes from 'prop-types'

const Sidebar = ({ items }) => {
    const segment = useSelectedLayoutSegment()

    const itemsWithActive = items.map((item) => ({
        ...item,
        active: `/${segment}` === item.path,
    }))

    return (
        <aside className="flex h-screen w-72 flex-col overflow-y-hidden bg-black">
            <nav className="no-scrollbar mt-5 flex flex-col overflow-y-auto px-4 py-4">
                <ul className="mb-6 flex flex-col gap-1.5">
                    {itemsWithActive.map((item, index) => (
                        <li key={index}>
                            <Link
                                className={classNames(
                                    'relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark [&>svg]:h-5 [&>svg]:w-5',
                                    item.active ? 'bg-graydark' : ''
                                )}
                                href={item.path}
                            >
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

Sidebar.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            path: PropTypes.string,
            icon: PropTypes.element,
        })
    ).isRequired,
}

export default Sidebar
