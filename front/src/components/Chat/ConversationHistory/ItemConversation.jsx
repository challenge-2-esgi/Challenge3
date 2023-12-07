'use client'

import Image from "next/image";

const ItemConversation = ({avatar, name, lastMessage, isActive}) => {

    let classDefault = "flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2";
    let classActive = "flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2";

    return (
        <div className={isActive ? classActive : classDefault}>
            <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                <Image width={44} height={44} src={avatar} alt="profile" className="h-full w-full object-cover object-center"/>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
            </div>
            <div className="w-full">
                <h5 className="text-sm font-medium text-black"> { name }</h5>
                <p className="text-sm"> { lastMessage }</p>
            </div>
        </div>
    );
}

export default ItemConversation;
