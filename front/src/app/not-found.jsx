'use client'

import Arrow from '@/app/assets/arrow.svg'
import Button from '@/components/Button'
import Container from '@/components/Container'
import route from '@/constants/route'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
    const { t } = useTranslation()

    return (
        <div className="flex h-screen w-screen justify-center bg-whiten p-60">
            <Container className="max-h-fit w-3/5 items-center justify-center text-center text-black">
                <div className="flex max-w-[410px] flex-col">
                    <h1 className="text-7xl font-bold">404</h1>
                    <h2 className="mb-3 mt-7 text-2xl font-bold">
                        {t('page.not_found.title')}
                    </h2>
                    <p className="font-medium text-body">
                        {t('page.not_found.description')}
                    </p>
                    <Button className="mt-7 self-center" size="large">
                        <Link
                            className="flex flex-row items-center gap-2 text-white"
                            href={route.HOME}
                        >
                            <Arrow className="fill-white" />
                            {t('page.not_found.button_label')}
                        </Link>
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default NotFoundPage
