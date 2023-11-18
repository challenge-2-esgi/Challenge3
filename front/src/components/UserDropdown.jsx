'use client'

import Avatar from './Avatar'
import Dropdown from './Dropdown'

import LogoutIcon from '@/app/assets/logout.svg'
import SettingsIcon from '@/app/assets/settings.svg'
import route from '@/constants/route'
import useStore from '@/store'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const MENU_ITEM_TYPE = {
    link: 'link',
    action: 'action',
}

const UserDropdown = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const logoutAction = useStore((state) => state.logout)
    // TODO: get user from store

    const menu = [
        {
            icon: <SettingsIcon />,
            label: t('header.menu.account'),
            action: () => {
                router.push(route.DASHBOARD)
            },
            type: MENU_ITEM_TYPE.link,
        },
        {
            icon: <LogoutIcon />,
            label: t('header.menu.logout'),
            action: () => {
                logoutAction()
            },
            type: MENU_ITEM_TYPE.action,
        },
    ]
    const itemClasses =
        'flex items-center gap-3.5 text-sm font-medium text-body duration-300 ease-in-out hover:text-primary [&>svg]:fill-current'

    return (
        <div>
            <Dropdown
                buttonClasses="!bg-transparent !text-black !hover:bg-whiter px-2"
                menuClasses="left-auto right-0 min-w-[14rem]"
                itemContainerClasses="hover:bg-white"
                className="relative left-auto right-0 min-w-[14rem]"
                label={
                    <Avatar
                        className="mr-3"
                        fullname="John Doe"
                        role="Web Developper"
                    />
                }
                renderItem={(item) => {
                    if (!Object.values(MENU_ITEM_TYPE).includes(item.type)) {
                        return null
                    }

                    return {
                        [MENU_ITEM_TYPE.link]: (
                            <div className={itemClasses}>
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        ),
                        [MENU_ITEM_TYPE.action]: (
                            <button
                                className={classNames(
                                    'mt-2 w-full border-t border-stroke pt-4',
                                    itemClasses
                                )}
                                onClick={item.action}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ),
                    }[item.type]
                }}
                items={menu}
                onChange={(item) => {
                    if (!Object.values(MENU_ITEM_TYPE).includes(item.type)) {
                        return
                    }

                    item.action()
                }}
            />
        </div>
    )
}

export default UserDropdown
