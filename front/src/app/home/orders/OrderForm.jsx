import Button from '@/components/Button'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { itemOperation } from '@/constants'
import { t_NAMESPACES } from '@/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const fields = {
    sku: 'sku',
}

const OrderForm = ({ operation, values, onSubmit, loading = true }) => {
    const { t } = useTranslation()
    const validationSchema = z.object({
        [fields.sku]: z
            .string()
            .trim()
            .min(
                1,
                t('order_form.input.firstname.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        ...{
            [itemOperation.add]: {},
            [itemOperation.edit]: {
                defaultValues: Object.keys(fields).reduce(
                    (prev, key) => ({ ...prev, [fields[key]]: values[key] }),
                    {}
                ),
            },
        }[operation],
        resolver: zodResolver(validationSchema),
    })

    const submit = (data) => {
        onSubmit({ ...data })
    }

    return (
        <form className="text-black" onSubmit={handleSubmit(submit)}>
            <Input
                containerClasses="mb-6"
                label={t('order.sku', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.sku)}
                placeholder={t('order_form.input.sku', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.sku] ? true : false}
                helperText={errors[fields.sku]?.message ?? ''}
            />
            <Button type="submit" size="large" disabled={loading}>
                {loading ? (
                    <Loader className="bg-transparent" color="white" />
                ) : (
                    {
                        [itemOperation.add]: t('order_form.button.add', {
                            ns: t_NAMESPACES.FORM,
                        }),
                        [itemOperation.edit]: t('order_form.button.edit', {
                            ns: t_NAMESPACES.FORM,
                        }),
                    }[operation]
                )}
            </Button>
        </form>
    )
}

export default OrderForm
