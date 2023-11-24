'use client'

import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Order } from '@/api'
import Button from '@/components/Button'
import ConfirmDialog from '@/components/ConfirmDialog'
import Pill from '@/components/Pill'
import Table from '@/components/Table'
import TableCrudActions from '@/components/TableCrudActions'
import route from '@/constants/route'
import { t_NAMESPACES } from '@/i18n'
import { buildEditOrderRoute } from '@/utils/route'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const OrdersPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { isLoading, data, error } = Order.useOrders()

    const columns = [
        {
            id: 'id',
            header: '',
            accessorKey: 'id',
        },
        {
            id: 'status',
            header: t('order.status', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'status',
        },
        {
            id: 'sku',
            header: t('order.sku', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'sku',
        },
        {
            id: 'recieverEmail',
            header: t('order.recieverEmail', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'recieverEmail',
        },
        {
            id: 'recieverPhone',
            header: t('order.recieverPhone', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'recieverPhone',
        },
        {
            id: 'isDelivered',
            header: t('order.isDelivered', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'isDelivered',
        },
        {
            id: 'pickupTime',
            header: t('order.pickupTime', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'pickupTime',
        },
        {
            id: 'actions',
            header: null,
            accessorKey: 'id',
            cell: ({ row }) => {
                const [showModal, setShowModal] = useState(false)
                const { mutate: deleteOrder, isPending } = Order.useDelete(
                    row.getValue('id'),
                    () => {
                        toast.error(t('page.orders.delete_error_message'))
                    }
                )

                return (
                    <Fragment>
                        <TableCrudActions
                            canView={false}
                            canEdit={false}
                            canDelete={false}
                            onEdit={() => {
                                router.push(
                                    buildEditOrderRoute(row.getValue('id'))
                                )
                            }}
                            onDelete={() => {
                                setShowModal(true)
                            }}
                        />
                        {showModal ? (
                            <ConfirmDialog
                                message={t(
                                    'page.orders.confirm_dialog.message'
                                )}
                                cancelLabel={t(
                                    'page.orders.confirm_dialog.cancel'
                                )}
                                confirmLabel={t(
                                    'page.orders.confirm_dialog.confirm'
                                )}
                                loading={isPending}
                                onCancel={() => {
                                    setShowModal(false)
                                }}
                                onConfirm={() => {
                                    deleteOrder()
                                    if (!isPending) {
                                        setShowModal(false)
                                    }
                                }}
                            />
                        ) : null}
                    </Fragment>
                )
            },
        },
    ]

    if (error) {
        /**
         * TODO
         * add translation
         * create component for error message
         */
        return (
            <main className="m-auto flex h-60 items-center justify-center text-base">
                <p>
                    <strong>Uh oh, something went wrong Sorry!</strong> <br />
                    There was a problem with your request
                </p>
            </main>
        )
    }

    return (
        <Fragment>
            <h2 className="mb-6 cursor-default text-2xl font-semibold text-black">
                {t('page.orders.title')}
            </h2>
            {/* <Link href={route.ORDERS + route.ITEM_ADD}>
                <Button className="mb-4 mt-4" size="medium">
                    {t('page.orders.button.add')}
                </Button>
            </Link> */}
            <Table
                columns={columns}
                data={data ?? []}
                columnVisibility={{ id: false }}
                loading={isLoading}
                pageSize={5}
            />
        </Fragment>
    )
}

export default OrdersPage
