import SidebarItems from './SidebarItems'

const HomeLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarItems />
            <main>{children}</main>
        </div>
    )
}

export default HomeLayout
