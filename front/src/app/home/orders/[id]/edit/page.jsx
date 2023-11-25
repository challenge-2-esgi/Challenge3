'use client'

import { Order } from '@/api'
import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import { itemOperation } from '@/constants'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import OrderForm from '../../OrderForm'
import { t_NAMESPACES } from '@/i18n'

const EditOrderPage = ({ params }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading: fetchingOrder } = Order.useOrder(params.id)
    const { mutate: updateOrder, isPending: updatingOrder } = Order.useUpdate(
        params.id,
        () => {
            toast.success(
                t('order_form.submit.editing_success_message', {
                    ns: t_NAMESPACES.FORM,
                })
            )
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
            {fetchingOrder ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <Container className="mt-6 !p-16">
                    <OrderForm
                        values={data}
                        operation={itemOperation.edit}
                        loading={updatingOrder}
                        onSubmit={updateOrder}
                    />
                </Container>
            )}
        </Fragment>
    )
}

export default EditOrderPage
