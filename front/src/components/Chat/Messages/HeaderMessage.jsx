'use client'

import Image from "next/image";

const HeaderMessage = ({avatar, name}) => {
    return (
        <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5">
                <div className="flex items-center">
                    <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                        <Image width={52} height={52} src={avatar} alt="avatar" className="h-full w-full object-cover object-center"/>
                    </div>
                <div>
                    <h5 className="font-medium text-black">{name}</h5>
                    <p className="text-sm">Reply to message</p>
                </div>
            </div>
            <div>
                <div className="relative">
                    <button>
                    <img src="/icons/vertical-dots.svg" alt="vertical-dots" className="h-4 w-4"/>
                    </button>
                    <div className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default hidden">
                        <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray">
                            <img src="/icons/edit.svg" alt="edit" className="h-4 w-4"/>
                            Edit
                        </button>
                        <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray">
                            <img src="/icons/delete.svg" alt="delete" className="h-4 w-4"/>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderMessage;