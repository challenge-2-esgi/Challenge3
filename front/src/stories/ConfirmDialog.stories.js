import ConfirmDialog from '@/components/ConfirmDialog'

export default {
    title: 'Components/ConfirmDialog',
    component: ConfirmDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onConfirm: {
            action: 'confirm',
        },
        onCancel: {
            action: 'cancel',
        },
    },
}

const Template = {
    render: ({ message, confirmLabel, cancelLabel, loading }) => {
        return (
            <ConfirmDialog
                message={message}
                confirmLabel={confirmLabel}
                cancelLabel={cancelLabel}
                loading={loading}
                onConfirm={() => {}}
                onCancel={() => {}}
            />
        )
    },
}

export const Default = {
    ...Template,
    args: {
        message: 'Are you sure you want to delete this item?',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
    },
}

export const WithLoading = {
    ...Template,
    args: {
        message: 'Are you sure you want to delete this item?',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        loading: true,
    },
}
