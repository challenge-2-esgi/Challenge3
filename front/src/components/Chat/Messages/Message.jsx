'use client'

const Message = ({name, message, time, isMe}) => {
        return (
            <div>
                {isMe ? (
                    <div className="ml-auto max-w-125">
                        <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary py-3 px-5">
                            <p className="text-white">{message}</p>
                        </div>
                        <p className="text-right text-xs">{time}</p>
                    </div>
                ) : (
                    <div className="max-w-125">
                        <p className="mb-2.5 text-sm font-medium">{name}</p>
                        <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5">
                            <p>{message}</p>
                        </div>
                        <p className="text-xs">{time}</p>
                    </div>
                
                )}
            </div>
        );
    }

export default Message;