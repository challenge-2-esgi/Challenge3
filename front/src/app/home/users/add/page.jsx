'use client'

import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import { itemOperation, role } from '@/constants'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import UserForm from '../UserForm'
import { User } from '@/api'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { t_NAMESPACES } from '@/i18n'
import withRoleGuard from '@/HOC/withRoleGuard'

const AddUserPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { mutate: addUser, isPending } = User.useAdd(
        () => {
            toast.success('user_form.submit.adding_success_message', {
                ns: t_NAMESPACES.FORM,
            })
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
            <Container className="mt-6 !p-16">
                <UserForm
                    values={{}}
                    operation={itemOperation.add}
                    onSubmit={addUser}
                    loading={isPending}
                />
            </Container>
        </Fragment>
    )
}

export default withRoleGuard([role.admin], AddUserPage)
