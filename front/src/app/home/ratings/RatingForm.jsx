import Button from "@/components/Button";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { itemOperation } from "@/constants";
import { t_NAMESPACES } from "@/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const fields = {
    rating: 'rating',
}

const RatingForm = ({ operation, values, onSubmit, loading = true }) => {

    const  { t } = useTranslation()
    const validationSchema = z.object({
        [fields.rating]: z
            .string()
            .trim()
            .min(
                1,
                t('rating_form.input.rating.required', {
                    ns: t_NAMESPACES.VALIDATION,
                })
            )
            .regex(/^[0-5]$/, t('rating_form.input.rating.not_valid', {
                ns: t_NAMESPACES.VALIDATION,
            }))
            
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
                type="number"
                min="0"
                max="5"
                containerClasses="mb-6"
                label={t('rating.rating', { ns: t_NAMESPACES.MODEL })}
                register={register(fields.rating)}
                placeholder={t('rating_form.input.rating', {
                    ns: t_NAMESPACES.FORM,
                })}
                error={errors[fields.rating] ? true : false}
                helperText={errors[fields.rating]?.message ?? ''}
            />

            <Button type="submit" size="large" disabled={loading}>
                {loading ? (
                    <Loader className="bg-transparent" color="white" />
                ) : (
                    {
                        [itemOperation.add]: t('rating_form.button.add', {
                            ns: t_NAMESPACES.FORM,
                        }),
                        [itemOperation.edit]: t('rating_form.button.edit', {
                            ns: t_NAMESPACES.FORM,
                        }),
                    }[operation]
                )}
            </Button>
        </form>
    )
}

export default RatingForm;