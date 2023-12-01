'use client'

import { Rating } from "@/api"
import BackIcon from "@/components/BackIcon"
import Loader from "@/components/Loader"
import { useRouter } from "next/navigation"
import { Fragment } from "react"
import RatingForm from "../../RatingForm"
import { itemOperation } from "@/constants"
import toast from "react-hot-toast"
import { t_NAMESPACES } from "@/i18n"
import Container from "@/components/Container"



const EditRatingPage = ({ params }) => {

    const router = useRouter()

    const { data,isLoading: fetchingRating } = Rating.useRating(params.id)

    const { mutate: updateRating, isPending: updatingRating } = Rating.useUpdate(
        params.id,
        () => {
            toast.success(
                t('rating_form.submit.editing_success_message', {
                    ns: t_NAMESPACES.FORM,
                })
            )
        },
        () => {
            toast.error(
                t('rating_form.submit.error_message', { ns: t_NAMESPACES.FORM })
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
            {fetchingRating ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <Container className="mt-6 !p-16">
                    <RatingForm
                        values={data}
                        operation={itemOperation.edit}
                        loading={updatingRating}
                        onSubmit={updateRating}
                    />
                </Container>
            )}
        </Fragment>
    )
}

export default EditRatingPage