'use client'

import { Deliverer, User } from '@/api'
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
import DelivererForm from '../../DelivererForm'
import Separator from '@/components/Separator'

const ViewDelivererPage = ({ params }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { data, isLoading: fetchingUser } = Deliverer.useDeliverer(params.id)

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
                    <div>
                        <label className='text-lg font-bold'>Prénom</label>
                        <p>{data.user.firstname}</p>
                    </div>
                    <div>
                        <label className='text-lg font-bold'>Nom</label>
                        <p>{data.user.lastname}</p>
                    </div>
                    <div>
                        <label className='text-lg font-bold'>Status</label>
                        <p>{data.isActive ? "En ligne" : "Hors ligne"}</p>
                    </div>
                    <div>
                        <label className='text-lg font-bold'>Phone</label>
                        <p>{data.phone}</p>
                    </div>
                </Container>
            )}
        </Fragment>
    )
}

export default withRoleGuard([role.admin], ViewDelivererPage)
