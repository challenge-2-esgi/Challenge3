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
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    role: 'role',
}

const UserForm = ({ operation, values, onSubmit, loading = true }) => {
    const { t } = useTranslation()

    const validationSchema = z.object({
        [fields.firstname]: z
            .string()
            .trim()
            .min(
                1,
                t('user_form.input.firstname.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
        [fields.lastname]: z
            .string()
            .trim()
            .min(
                1,
                t('user_form.input.lastname.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            ),
        [fields.email]: z
            .string()
            .trim()
            .min(
                1,
                t('login_form.input.email.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            )
            .email(
                t('login_form.input.email.not_valid', {
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
                defaultValues: { [fields.role]: role.support },
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
        onSubmit({ ...data, role: defaultValues[fields.role] })
    }

    return (
        <form className="text-black" onSubmit={handleSubmit(submit)}>
            <Input
                containerClasses="mb-6"
                label={t('user.lastname', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.lastname)}
                placeholder={t('user_form.input.lastname', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.lastname] ? true : false}
                helperText={errors[fields.lastname]?.message ?? ''}
            />
            <Input
                containerClasses="mb-6"
                label={t('user.firstname', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.firstname)}
                placeholder={t('user_form.input.firstname', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.firstname] ? true : false}
                helperText={errors[fields.firstname]?.message ?? ''}
            />
            <Input
                containerClasses="mb-6"
                label={t('user.email', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.email)}
                placeholder={t('user_form.input.email', {
                    ns: t_NAMESPACES.FORM,
                })}
                type="email"
                error={errors[fields.email] ? true : false}
                helperText={errors[fields.email]?.message ?? ''}
            />
            <Input
                containerClasses="mb-8"
                label={t('user.role', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.role)}
                disabled
            />
            <Button type="submit" size="large" disabled={loading}>
                {loading ? (
                    <Loader className="bg-transparent" color="white" />
                ) : (
                    {
                        [itemOperation.add]: t('user_form.button.add', {
                            ns: t_NAMESPACES.FORM,
                        }),
                        [itemOperation.edit]: t('user_form.button.edit', {
                            ns: t_NAMESPACES.FORM,
                        }),
                    }[operation]
                )}
            </Button>
        </form>
    )
}

export default UserForm
