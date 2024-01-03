'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import { COMPLAINT_STATUS, role } from '@/constants'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Complaint } from '@/api'
import { t_NAMESPACES } from '@/i18n'
import { Fragment, useState } from 'react'
import Table from '@/components/Table'
import TableCrudActions from '@/components/TableCrudActions'
import { buildEditComplaintRoute } from '@/utils/route'

const ComplaintsPage = () => {
    const router = useRouter()

    const { t } = useTranslation()

    const { isLoading, data, error, refetch } = Complaint.useComplaints()

    const columns = [
        {
            id: 'id',
            header: '',
            accessorKey: 'id',
        },
        {
            id: 'subject',
            header: t('complaint.subject', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'subject',
        },
        {
            id: 'content',
            header: t('complaint.content', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'content',
            cell: ({ row }) => {
                const content = row.getValue('content').slice(0, 50) + '...'
                return <>{content}</>
            },
        },
        {
            id: 'status',
            header: t('deliverer.status.status', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.getValue('status')
                const title =
                    status === COMPLAINT_STATUS.pending
                        ? t('complaint.status.pending', {
                              ns: t_NAMESPACES.MODEL,
                          })
                        : status === COMPLAINT_STATUS.processing
                        ? t('complaint.status.processing', {
                              ns: t_NAMESPACES.MODEL,
                          })
                        : t('complaint.status.closed', {
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
                const { mutate: deleteComplaint, isPending } =
                    Complaint.useDelete(
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
                            canEdit={true}
                            onEdit={() => {
                                router.push(
                                    buildEditComplaintRoute(row.getValue('id'))
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

export default withRoleGuard([role.admin, role.support], ComplaintsPage)
