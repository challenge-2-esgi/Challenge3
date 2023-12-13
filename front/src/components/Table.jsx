'use client'

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
import Container from './Container'
import Loader from './Loader'
import Pagination from './Pagination'
import { useTranslation } from 'react-i18next'

// TODO: add sort

const Table = ({
    columns,
    data,
    columnVisibility,
    loading = false,
    pageSize = 10,
}) => {
    const { t } = useTranslation();
    
    const table = useReactTable({
        columns,
        data,
        state: {
            columnVisibility: columnVisibility,
        },
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <>
            {data.length === 0 ? (
                <Container className="text-center text-black">
                    <p>{t('page.not_found.no_data')}</p>
                </Container>
            ) : (
                <Container className="items-end">
                    <table className="w-full table-auto">
                        <TableHead headerGroups={table.getHeaderGroups()} />
                        {loading ? null : (
                            <TableBody rows={table.getRowModel().rows} />
                        )}
                    </table>
                    {loading ? (
                        <Loader
                            className="mt-9 self-center"
                            size="medium"
                            color="black"
                        />
                    ) : table.getPageCount() === 0 ? null : (
                        <Pagination
                            className="mt-4"
                            currentPage={table.getState().pagination.pageIndex}
                            numberOfPages={table.getPageCount()}
                            onPrevious={() => {
                                if (!table.getCanNextPage()) {
                                    return
                                }
                                table.nextPage()
                            }}
                            onNext={() => {
                                if (!table.getCanPreviousPage()) {
                                    return
                                }
                                table.previousPage()
                            }}
                            onSelect={(page) => {
                                table.setPageIndex(page)
                            }}
                        />
                    )}
                </Container>
            )}
        </>
    )
}

const TableHead = ({ headerGroups }) => {
    return (
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-2 text-left">
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            className="px-4 py-4 font-bold text-black"
                        >
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    )
}

const TableBody = ({ rows }) => {
    return (
        <tbody>
            {rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className="border-b border-[#eee] px-4 py-5"
                        >
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            header: PropTypes.string,
            accessorKey: PropTypes.string,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    columnVisibility: PropTypes.objectOf(PropTypes.bool),
    loading: PropTypes.bool,
    pageSize: PropTypes.number,
}

export default Table
