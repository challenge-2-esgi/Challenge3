'use client'

import withRoleGuard from '@/HOC/withRoleGuard'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import { role } from '@/constants'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TrackingView from './TrackingView'
import { Deliverer, Order } from '@/api'
import { set } from 'react-hook-form'

const filters = {
    all: 'ALL',
    delivering: 'DELIVERING',
    waiting: 'WAITING',
}

const FleetPage = () => {
    const { t } = useTranslation()
    const [filter, setFilter] = useState(filters.all)
    const { isLoading, data } = Order.useOrders("status=DELIVERING&status=WAITING_FOR_PICK_UP")
    const {isLoading: isLoadingDeliverers, data: dataDeliverers} = Deliverer.useDeliverers()
    const [deliverers, setDeliverers] = useState([])

    useEffect(() => {

        if (!isLoading && !isLoadingDeliverers) {
            setDeliverers([])
            data.forEach((order) => {
                if (order.deliverer) {
                    const deliverer = dataDeliverers.find((d) => d.delivererId === order.deliverer.id)
                    
                    if (filter == filters.all) {
                        setDeliverers(deliverers => [...deliverers, deliverer])
                    } else if (filter == filters.delivering && order.status == "DELIVERING") {
                        setDeliverers(deliverers => [...deliverers, deliverer])
                    } else if (filter == filters.waiting && order.status == "WAITING_FOR_PICK_UP") {
                        setDeliverers(deliverers => [...deliverers, deliverer])
                    }
                }
            })
        }

    }, [data, isLoading, filter, isLoadingDeliverers, dataDeliverers])

    return (
        <Container className="h-full">
            <div className="mt-4 flex flex-row gap-x-6 pl-11">
                <Button
                    outlined={filter !== filters.all}
                    onClick={() => {
                        setFilter(filters.all)
                    }}
                >
                    {t('page.fleet.filters.all')}
                </Button>
                <Button
                    outlined={filter !== filters.delivering}
                    onClick={() => {
                        setFilter(filters.delivering)
                    }}
                >
                    {t('page.fleet.filters.delivering')}
                </Button>
                <Button
                    outlined={filter !== filters.waiting}
                    onClick={() => {
                        setFilter(filters.waiting)
                    }}
                >
                    {t('page.fleet.filters.waiting')}
                </Button>
            </div>
            <div className="h-full w-full px-11 py-8">
                {isLoading ? (
                    <Loader className="h-full" size="large" />
                ) : (
                <TrackingView deliverers={deliverers} />
                )}
            </div>
        </Container>
    )
}

export default withRoleGuard([role.admin], FleetPage)
