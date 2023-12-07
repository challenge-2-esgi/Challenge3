'use client'

import Image from "next/image";

const ListConversation = ({children}) => {
    return (<div className="hidden h-full flex-col xl:flex xl:w-1/4">
        <div className="sticky border-b border-stroke px-6 py-7.5">
            <h3 className="text-lg font-medium text-black 2xl:text-xl">
                Active Conversations
                <span className="rounded-md border-[.5px] border-stroke bg-gray-2 py-0.5 px-2 text-base font-medium text-black 2xl:ml-4">
                    7
                </span>
            </h3>
        </div>
        <div className="flex max-h-full flex-col overflow-auto p-5">
            <form className="sticky mb-7">
                <input type="text" className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary" placeholder="Search..."/>
                <button className="absolute top-1/2 right-4 -translate-y-1/2">
                    <Image width={1} height={1} src='/icons/search.svg' alt='search' className="h-4 w-4"/>
                </button>
            </form>
            <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                {children}
            </div>
        </div>
    </div>);
}

export default ListConversation;