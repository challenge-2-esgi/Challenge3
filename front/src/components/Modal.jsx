'use client'

const Modal = ({ children }) => {
    return (
        <div className="z-999999 fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
            {children}
        </div>
    )
}

export default Modal
