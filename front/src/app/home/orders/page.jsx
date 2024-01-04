'use client'

import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Order } from '@/api'
import ConfirmDialog from '@/components/ConfirmDialog'
import Table from '@/components/Table'
import TableCrudActions from '@/components/TableCrudActions'
import { t_NAMESPACES } from '@/i18n'
import { buildEditOrderRoute } from '@/utils/route'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { mapStatusToLabel } from '../../../utils/translateHelper'
import ErrorRequest from '@/components/ErrorRequest'

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
            cell: ({ row }) =>
                mapStatusToLabel(row.getValue('status'), t, t_NAMESPACES.MODEL),
        },
        {
            id: 'sku',
            header: t('order.sku', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'sku',
        },
        {
            id: 'receiverEmail',
            header: t('order.reciever_email', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'receiverEmail',
        },
        {
            id: 'receiverPhone',
            header: t('order.reciever_phone', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'receiverPhone',
        },
        {
            id: 'isDelivered',
            header: t('order.is_delivered', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'isDelivered',
            cell: ({ row }) => {
                const isDelivered = row.getValue('isDelivered')
                return isDelivered ? t('yes') : t('no')
            },
        },
        {
            id: 'pickupTime',
            header: t('order.pickup_time', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'pickupTime',
            cell: ({ row }) => {
                const pickupTime = row.getValue('pickupTime')
                return pickupTime ? new Date(pickupTime).toLocaleString() : ''
            },
        },
        {
            id: 'deliverTime',
            header: t('order.deliver_time', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'deliverTime',
            cell: ({ row }) => {
                const deliveryTime = row.getValue('deliverTime')
                return deliveryTime
                    ? new Date(deliveryTime).toLocaleString()
                    : ''
            },
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
                        toast.success(t('page.orders.delete_success_message'))
                    },
                    () => {
                        toast.error(t('page.orders.delete_error_message'))
                    }
                )

                return (
                    <Fragment>
                        <TableCrudActions
                            canView={false}
                            canEdit={true}
                            canDelete={true}
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
        return (
           <ErrorRequest />
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
