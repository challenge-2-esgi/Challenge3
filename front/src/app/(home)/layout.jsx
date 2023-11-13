import SidebarItems from './SidebarItems'
import UserLoader from './UserLoader'

const HomeLayout = ({ children }) => {
    return (
        <UserLoader>
            <div className="flex h-screen overflow-hidden">
                <SidebarItems />
                <main>{children}</main>
            </div>
        </UserLoader>
    )
}

export default HomeLayout
