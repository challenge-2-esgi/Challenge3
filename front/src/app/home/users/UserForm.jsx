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
    password: 'password',
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
        [fields.password]: z
            .string()
            .trim()
            .min(
                1,
                t('user_form.input.password.required', {
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
                containerClasses="mb-6"
                label={t('user.password', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.password)}
                error={errors[fields.password] ? true : false}
                helperText={errors[fields.password]?.message ?? ''}
                type="password"
                placeholder={t('user_form.input.password', {
                    ns: t_NAMESPACES.FORM,
                })}
                icon={
                    <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.5">
                            <path
                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                fill=""
                            />
                            <path
                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                fill=""
                            />
                        </g>
                    </svg>
                }
                iconPosition="right"
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
