'use client'

const FooterMessage = () => {
    return (
        <div className="sticky bottom-0 border-t border-stroke bg-white py-5 px-6">
            <form className="flex items-center justify-between space-x-4.5">
                <div className="relative w-full">
                    <input type="text" placeholder="Type something here" className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary"/>
                    <div className="absolute right-5 top-1/2 inline-flex -translate-y-1/2 items-center justify-end space-x-4">
                        <button className="hover:text-primary">
                            <img src="/icons/attachment.svg" alt="attachment" className="h-4 w-4"/>
                        </button>
                        <button className="hover:text-primary">
                            <img src="/icons/emoji.svg" alt="emoji" className="h-4 w-4"/>
                        </button>
                    </div>
                </div>
                <button className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90">
                    <img src="/icons/send.svg" alt="send" className="h-4 w-4"/>
                </button>
            </form>
        </div>
    );
}

export default FooterMessage;