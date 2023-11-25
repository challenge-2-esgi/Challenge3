'use client'

import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import { itemOperation } from '@/constants'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import OrderForm from '../OrderForm'
import { Order } from '@/api'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { t_NAMESPACES } from '@/i18n'

const AddOrderPage = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { mutate: addOrder, isPending } = Order.useAdd(
        () => {
            toast.success('order_form.submit.adding_success_message', {
                ns: t_NAMESPACES.FORM,
            })
        },
        () => {
            toast.error(
                t('order_form.submit.error_message', { ns: t_NAMESPACES.FORM })
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
                <OrderForm
                    values={{}}
                    operation={itemOperation.add}
                    onSubmit={addOrder}
                    loading={isPending}
                />
            </Container>
        </Fragment>
    )
}

export default AddOrderPage
