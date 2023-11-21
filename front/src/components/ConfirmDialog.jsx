import PropTypes from 'prop-types'
import Modal from './Modal'
import Button from './Button'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useRef, useState } from 'react'
import Loader from './Loader'

const ConfirmDialog = ({
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    loading = false,
}) => {
    const [show, setShow] = useState(true)
    const modalRef = useRef()
    useOnClickOutside(modalRef, () => {
        if (loading) {
            return
        }

        setShow(false)
        onCancel()
    })

    if (!show) {
        return null
    }

    return (
        <Modal>
            <div
                className="w-full max-w-[35rem] rounded-lg bg-white px-8 py-12 text-center"
                ref={modalRef}
            >
                <p className="mb-10 text-body">{message}</p>
                <div className="mx-3 flex gap-x-4">
                    <Button
                        className="w-full bg-gray text-black"
                        size="large"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        className="w-full bg-danger"
                        size="large"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader className="bg-transparent" color="white" />
                        ) : (
                            confirmLabel
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

ConfirmDialog.propTypes = {
    message: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}

export default ConfirmDialog
