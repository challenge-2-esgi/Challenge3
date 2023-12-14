'use client'


import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Rating } from '@/api'
import ConfirmDialog from '@/components/ConfirmDialog'
import Table from '@/components/Table'
import TableCrudActions from '@/components/TableCrudActions'
import { t_NAMESPACES } from '@/i18n'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ErrorRequest from '@/components/ErrorRequest'

import withRoleGuard from '@/HOC/withRoleGuard'
import { role } from '@/constants'
import { buildEditRatingRoute } from '@/utils/route'


const RatingsPage = () => {

    const router = useRouter()
    const { t } = useTranslation()

    const { isLoading, data, error } = Rating.useRatings()

    const columns = [
        {
            id: 'id',
            header: '',
            accessorKey: 'id',
        },
        {
            id: 'clientId',
            header: t('rating.clientName', { ns: t_NAMESPACES.MODEL }),
            accessorFn: (data) => {
               return data.client.firstname + ' ' + data.client.lastname
            },
        },
        {
            id: 'delivererId',
            header: t('rating.delivererName', { ns: t_NAMESPACES.MODEL }),
            accessorFn: (data) => {
                if (data.deliverer)
                    return data.deliverer.user.firstname + ' ' + data.deliverer.user.lastname
                return t('rating.no_deliverer', { ns: t_NAMESPACES.MODEL })
             },
        },
        {
            id: 'rating',
            header: t('rating.rating', { ns: t_NAMESPACES.MODEL }) + '(/5)',
            accessorKey: 'rating',
        },
        {
            id: 'actions',
            header: null,
            accessorKey: 'id',
            cell: ({ row }) => {
               const [showModal, setShowModal] = useState(false)
               const {mutate: deleteRating, isPending} = Rating.useDelete(
                     row.getValue('id'),
                     () => {
                            toast.success(t('page.ratings.delete_success_message'))
                            router.reload()
                     },
                    () => {
                        toast.error(t('page.ratings.delete_error_message'))
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
                                buildEditRatingRoute(row.getValue('id'))
                            )
                        }}
                        onDelete={() => {
                            setShowModal(true)
                        }}
                        />
                        {showModal ? (
                            <ConfirmDialog
                                message={t(
                                    'page.ratings.confirm_dialog.message'
                                )}
                                cancelLabel={t(
                                    'page.ratings.confirm_dialog.cancel'
                                )}
                                confirmLabel={t(
                                    'page.ratings.confirm_dialog.confirm'
                                )}
                                loading={isPending}
                                onCancel={() => {
                                    setShowModal(false)
                                }}
                                onConfirm={() => {
                                    deleteRating()
                                    if (!isPending) {
                                        setShowModal(false)
                                    }
                                }}
                            />
                        ) : null}
                </Fragment>
                )
            },
        }
    ]

    if (error) {
        <ErrorRequest />
    }

    return (
        <Fragment>
        <h2 className="mb-6 cursor-default text-2xl font-semibold text-black">
            {t('page.ratings.title')}
        </h2>

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

export default withRoleGuard([role.admin], RatingsPage)