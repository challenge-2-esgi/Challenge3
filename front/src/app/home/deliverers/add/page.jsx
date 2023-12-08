'use client'

import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import { itemOperation, role } from '@/constants'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import DelivererForm from '../DelivererForm'
import { Deliverer, User } from '@/api'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { t_NAMESPACES } from '@/i18n'
import withRoleGuard from '@/HOC/withRoleGuard'

const AddDelivererPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { mutate: addDeliverer, isPending } = Deliverer.useAdd(
        () => {
            toast.success('deliverer_form.submit.adding_success_message', {
                ns: t_NAMESPACES.FORM,
            })
        },
        () => {
            toast.error(
                t('deliverer_form.submit.error_message', { ns: t_NAMESPACES.FORM })
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
                <DelivererForm
                    values={{}}
                    operation={itemOperation.add}
                    onSubmit={addDeliverer}
                    loading={isPending}
                />
            </Container>
        </Fragment>
    )
}

export default withRoleGuard([role.admin], AddDelivererPage)
