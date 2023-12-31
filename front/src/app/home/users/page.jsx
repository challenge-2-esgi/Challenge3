'use client'

import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@/api'
import Button from '@/components/Button'
import ConfirmDialog from '@/components/ConfirmDialog'
import Pill from '@/components/Pill'
import Table from '@/components/Table'
import TableCrudActions from '@/components/TableCrudActions'
import { role } from '@/constants'
import route from '@/constants/route'
import { t_NAMESPACES } from '@/i18n'
import { buildEditUserRoute } from '@/utils/route'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import withRoleGuard from '@/HOC/withRoleGuard'
import ErrorRequest from '@/components/ErrorRequest'
import useStore from '@/store'

const UsersPage = () => {
    const router = useRouter()

    const { t } = useTranslation()

    const { isLoading, data, error } = User.useUsers()
    const loggedInUser = useStore((state) => state.loggedinUser)

    const users =
        data == null ? [] : data.filter((e) => e.id !== loggedInUser.id)

    const columns = [
        {
            id: 'id',
            header: '',
            accessorKey: 'id',
        },
        {
            id: 'firstname',
            header: t('user.firstname', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'firstname',
        },
        {
            id: 'lastname',
            header: t('user.lastname', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'lastname',
        },
        {
            id: 'email',
            header: t('user.email', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'email',
        },
        {
            id: 'role',
            header: t('user.role', { ns: t_NAMESPACES.MODEL }),
            accessorKey: 'role',
            cell: ({ cell }) => {
                const title =
                    cell.getValue() === role.deliverer
                        ? t('user.role_title.deliverer', {
                              ns: t_NAMESPACES.MODEL,
                          }).toLowerCase()
                        : cell.getValue().toLowerCase()
                return <Pill title={title} color="primary" />
            },
        },
        {
            id: 'actions',
            header: null,
            accessorKey: 'id',
            cell: ({ row }) => {
                const [showModal, setShowModal] = useState(false)
                const { mutate: deleteUser, isPending } = User.useDelete(
                    row.getValue('id'),
                    () => {
                        toast.error(t('page.users.delete_error_message'))
                    }
                )

                return (
                    <Fragment>
                        <TableCrudActions
                            canView={false}
                            canEdit={
                                row.getValue('role') === role.admin ||
                                row.getValue('role') === role.support
                            }
                            onEdit={() => {
                                router.push(
                                    buildEditUserRoute(row.getValue('id'))
                                )
                            }}
                            onDelete={() => {
                                setShowModal(true)
                            }}
                        />
                        {showModal ? (
                            <ConfirmDialog
                                message={t('page.users.confirm_dialog.message')}
                                cancelLabel={t(
                                    'page.users.confirm_dialog.cancel'
                                )}
                                confirmLabel={t(
                                    'page.users.confirm_dialog.confirm'
                                )}
                                loading={isPending}
                                onCancel={() => {
                                    setShowModal(false)
                                }}
                                onConfirm={() => {
                                    deleteUser()
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
        return <ErrorRequest />
    }

    return (
        <Fragment>
            <h2 className="mb-6 cursor-default text-2xl font-semibold text-black">
                {t('page.users.title')}
            </h2>
            <Link href={route.USERS + route.ITEM_ADD}>
                <Button className="mb-4 mt-4" size="medium">
                    {t('page.users.button.add')}
                </Button>
            </Link>
            <Table
                columns={columns}
                data={users}
                columnVisibility={{ id: false }}
                loading={isLoading}
                pageSize={5}
            />
        </Fragment>
    )
}

export default withRoleGuard([role.admin], UsersPage)
