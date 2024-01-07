'use client'

import { Complaint, Deliverer, User } from '@/api'
import BackIcon from '@/components/BackIcon'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import { itemOperation, role } from '@/constants'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { t_NAMESPACES } from '@/i18n'
import withRoleGuard from '@/HOC/withRoleGuard'
import ComplaintForm from '../../ComplaintForm'

const EditComplaintPage = ({ params }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading: fetchingUser } = Complaint.useComplaint(params.id)
    const { mutate: updateComplaint, isPending: updatingComplaint } =
        Complaint.useUpdate(
            params.id,
            () => {
                toast.success(
                    t('complaint_form.submit.editing_success_message', {
                        ns: t_NAMESPACES.FORM,
                    })
                )
            },
            () => {
                toast.error(
                    t('complaint_form.submit.error_message', {
                        ns: t_NAMESPACES.FORM,
                    })
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
            {fetchingUser ? (
                <Loader className="mt-9 h-28 !bg-transparent" size="medium" />
            ) : (
                <Container className="mt-6 !p-16">
                    <ComplaintForm
                        values={data}
                        operation={itemOperation.edit}
                        loading={updatingComplaint}
                        onSubmit={updateComplaint}
                    />
                </Container>
            )}
        </Fragment>
    )
}

export default withRoleGuard([role.admin, role.support], EditComplaintPage)
