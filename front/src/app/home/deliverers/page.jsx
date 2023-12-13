'use client'

import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Deliverer } from '@/api'
import ConfirmDialog from '@/components/ConfirmDialog'
import Table from '@/components/Table'
import TableCrudActions from '@/components/TableCrudActions'
import { role } from '@/constants'
import { t_NAMESPACES } from '@/i18n'
import { buildEditDelivererRoute, buildViewDelivererRoute } from '@/utils/route'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import withRoleGuard from '@/HOC/withRoleGuard'

const DeliverersPage = () => {
    const router = useRouter()

    const { t } = useTranslation()

    const { isLoading, data, error, refetch } = Deliverer.useDeliverers()

    const columns = [
        {
            id: 'id',
            header: '',
            accessorKey: 'id',
        },
        {
            id: 'firstname',
            header: t('deliverer.firstname', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'user.firstname',
        },
        {
            id: 'lastname',
            header: t('deliverer.lastname', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'user.lastname',
        },
        {
            id: 'phone',
            header: t('deliverer.phone', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'phone',
        },
        {
            id: 'status',
            header: t('deliverer.status.status', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'isActive',
            cell: ({ row }) => {
                const isActive = row.getValue('status')
                const title = isActive
                    ? t('deliverer.status.online', {
                          ns: t_NAMESPACES.MODEL,
                      })
                    : t('deliverer.status.offline', {
                          ns: t_NAMESPACES.MODEL,
                      })
                return <>{title}</>
            },
        },
        {
            id: 'actions',
            header: null,
            accessorKey: 'id',
            cell: ({ row }) => {
                const [showModal, setShowModal] = useState(false)
                const { mutate: deleteDeliverer, isPending } =
                    Deliverer.useDelete(
                        row.getValue('id'),
                        () => {
                            toast.success(
                                t('page.deliverers.delete_success_message')
                            )
                            refetch()
                        },
                        () => {
                            toast.error(
                                t('page.deliverers.delete_error_message')
                            )
                        }
                    )

                return (
                    <Fragment>
                        <TableCrudActions
                            canView={false}
                            onView={() => {
                                router.push(
                                    buildViewDelivererRoute(row.getValue('id'))
                                )
                            }}
                            canEdit={false}
                            onEdit={() => {
                                router.push(
                                    buildEditDelivererRoute(row.getValue('id'))
                                )
                            }}
                            onDelete={() => {
                                setShowModal(true)
                            }}
                        />
                        {showModal ? (
                            <ConfirmDialog
                                message={t(
                                    'page.deliverers.confirm_dialog.message'
                                )}
                                cancelLabel={t(
                                    'page.deliverers.confirm_dialog.cancel'
                                )}
                                confirmLabel={t(
                                    'page.deliverers.confirm_dialog.confirm'
                                )}
                                loading={isPending}
                                onCancel={() => {
                                    setShowModal(false)
                                }}
                                onConfirm={() => {
                                    deleteDeliverer()
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
                {t('page.deliverers.title')}
            </h2>
            {/* <Link href={route.DELIVERERS + route.ITEM_ADD}>
                <Button className="mb-4 mt-4" size="medium">
                    {t('page.deliverers.button.add')}
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

export default withRoleGuard([role.admin], DeliverersPage)
