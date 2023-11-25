'use client'

import { User } from '@/api'
import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import { itemOperation, role } from '@/constants'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import UserForm from '../../UserForm'
import { t_NAMESPACES } from '@/i18n'
import withRoleGuard from '@/HOC/withRoleGuard'

const EditUserPage = ({ params }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading: fetchingUser } = User.useUser(params.id)
    const { mutate: updateUser, isPending: updatingUser } = User.useUpdate(
        params.id,
        () => {
            toast.success(
                t('user_form.submit.editing_success_message', {
                    ns: t_NAMESPACES.FORM,
                })
            )
        },
        () => {
            toast.error(
                t('user_form.submit.error_message', { ns: t_NAMESPACES.FORM })
            )
        }
    )

    return (
        <Fragment>
            <BackIcon
                onClick={() => {
                    router.back()
                }}
            />
            {fetchingUser ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <Container className="mt-6 !p-16">
                    <UserForm
                        values={data}
                        operation={itemOperation.edit}
                        loading={updatingUser}
                        onSubmit={updateUser}
                    />
                </Container>
            )}
        </Fragment>
    )
}

export default withRoleGuard([role.admin], EditUserPage)
