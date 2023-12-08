import { Deliverer, User } from '@/api'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { itemOperation, role } from '@/constants'
import { t_NAMESPACES } from '@/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const fields = {
    phone: 'phone',
    user: 'user',
}

const DelivererForm = ({ operation, values, onSubmit, loading = true }) => {
    const { t } = useTranslation()
    const { isLoading, data, error } = User.useUsers()
    const log = data?.filter((user) => user.role !== role.admin && user.role !== role.support)
    console.log('log', log)

    const validationSchema = z.object({
        [fields.phone]: z
            .string()
            .trim()
            .min(
                1,
                t('deliverer_form.input.phone.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
        [fields.user]: z
            .string()
            .trim()
            .min(
                1,
                t('deliverer_form.input.phone.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
    })

    const {
        register,
        handleSubmit,
        formState: { defaultValues, errors },
    } = useForm({
        ...{
            [itemOperation.add]: {
                defaultValues: {},
            },
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
                label={t('deliverer.phone', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.phone)}
                placeholder={t('deliverer_form.input.phone', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.phone] ? true : false}
                helperText={errors[fields.phone]?.message ?? ''}
            />
            <select></select>
            <Input
                containerClasses="mb-6"
                type="select"
                label={t('deliverer.phone', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.phone)}
                placeholder={t('deliverer_form.input.user', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.phone] ? true : false}
                helperText={errors[fields.phone]?.message ?? ''}
            ></Input>

            <Button type="submit" size="large" disabled={loading}>
                {loading ? (
                    <Loader className="bg-transparent" color="white" />
                ) : (
                    {
                        [itemOperation.add]: t('deliverer_form.button.add', {
                            ns: t_NAMESPACES.FORM,
                        }),
                        [itemOperation.edit]: t('deliverer_form.button.edit', {
                            ns: t_NAMESPACES.FORM,
                        }),
                    }[operation]
                )}
            </Button>
        </form>
    )
}

export default DelivererForm
