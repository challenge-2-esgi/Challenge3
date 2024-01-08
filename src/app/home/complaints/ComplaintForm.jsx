import { Deliverer, User } from '@/api'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { COMPLAINT_STATUS, itemOperation, role } from '@/constants'
import { t_NAMESPACES } from '@/i18n'
import { capitalize, formatDate } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const fields = {
    subject: 'subject',
    content: 'content',
    status: 'status',
    createdAt: 'createdAt',
    user: 'user',
    order: 'order',
}

const ComplaintForm = ({ operation, values, onSubmit, loading = true }) => {
    const { t } = useTranslation()

    const validationSchema = z.object({
        [fields.subject]: z
            .string()
            .trim()
            .min(
                1,
                t('deliverer_form.input.phone.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
        [fields.content]: z
            .string()
            .trim()
            .min(
                1,
                t('deliverer_form.input.phone.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
        [fields.status]: z
            .string()
            .trim()
            .min(
                1,
                t('deliverer_form.input.phone.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
        [fields.createdAt]: z
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
        [fields.order]: z
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
                    (prev, key) => ({
                        ...prev,
                        [fields[key]]:
                            key === fields.createdAt
                                ? formatDate(values[key])
                                : key === fields.user
                                ? values[key].firstname +
                                  ' ' +
                                  values[key].lastname
                                : key === fields.order
                                ? values[key].sku
                                : values[key],
                    }),
                    {}
                ),
            },
        }[operation],
        resolver: zodResolver(validationSchema),
    })

    const submit = (data) => {
        onSubmit({ status: data.status })
    }

    return (
        <form className="text-black" onSubmit={handleSubmit(submit)}>
            <Input
                containerClasses="mb-6"
                label={t('complaint.subject', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.subject)}
                placeholder={t('complaint_form.input.subject', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.subject] ? true : false}
                helperText={errors[fields.subject]?.message ?? ''}
                disabled={true}
            />
            <div className="mb-6">
                <label className="mb-3 block font-medium text-black">
                    {t('complaint.content', { ns: t_NAMESPACES.MODEL })}
                </label>
                <textarea
                    {...register(fields.content)}
                    rows={4}
                    placeholder={t('complaint_form.input.content', {
                        ns: t_NAMESPACES.FORM,
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke px-5 py-3 font-normal text-body outline-none transition disabled:bg-whiter"
                    disabled={true}
                ></textarea>
            </div>
            <Input
                containerClasses="mb-6"
                label={t('complaint.createdAt', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.createdAt)}
                placeholder={t('complaint_form.input.createdAt', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.createdAt] ? true : false}
                helperText={errors[fields.createdAt]?.message ?? ''}
                disabled={true}
            />
            <Input
                containerClasses="mb-6"
                label={t('complaint.createdBy', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.user)}
                placeholder={t('complaint_form.input.createdBy', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.user] ? true : false}
                helperText={errors[fields.user]?.message ?? ''}
                disabled={true}
            />
            <Input
                containerClasses="mb-6"
                label={t('complaint.sku', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.order)}
                placeholder={t('complaint_form.input.order', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.order] ? true : false}
                helperText={errors[fields.order]?.message ?? ''}
                disabled={true}
            />
            <div className="mb-6">
                <label className="mb-3 block font-medium text-black">
                    {t('complaint.status.status', { ns: t_NAMESPACES.MODEL })}
                </label>
                <select {...register('status')}>
                    <option value={COMPLAINT_STATUS.pending}>
                        {t('complaint.status.pending', {
                            ns: t_NAMESPACES.MODEL,
                        })}
                    </option>
                    <option value={COMPLAINT_STATUS.processing}>
                        {t('complaint.status.processing', {
                            ns: t_NAMESPACES.MODEL,
                        })}
                    </option>
                    <option value={COMPLAINT_STATUS.closed}>
                        {t('complaint.status.closed', {
                            ns: t_NAMESPACES.MODEL,
                        })}
                    </option>
                </select>
            </div>
            <Button type="submit" size="large" disabled={loading}>
                {loading ? (
                    <Loader className="bg-transparent" color="white" />
                ) : (
                    {
                        [itemOperation.add]: t('complaint_form.button.add', {
                            ns: t_NAMESPACES.FORM,
                        }),
                        [itemOperation.edit]: t('complaint_form.button.edit', {
                            ns: t_NAMESPACES.FORM,
                        }),
                    }[operation]
                )}
            </Button>
        </form>
    )
}

export default ComplaintForm
