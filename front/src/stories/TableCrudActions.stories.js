import TableCrudActions from '@/components/TableCrudActions'

export default {
    title: 'Components/TableCrudActions',
    component: TableCrudActions,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onView: {
            action: 'view item',
        },
        onEdit: {
            action: 'edit item',
        },
        onDelete: {
            action: 'delete item',
        },
    },
}

const Template = {
    render: ({ canView, canEdit, canDelete }) => {
        return (
            <TableCrudActions
                canView={canView}
                canEdit={canEdit}
                canDelete={canDelete}
            />
        )
    },
}

export const Default = {
    args: {},
}

export const CanNotView = {
    ...Template,
    args: {
        canView: false,
    },
}

export const CanNotEdit = {
    ...Template,
    args: {
        canEdit: false,
    },
}

export const CanNotDelete = {
    ...Template,
    args: {
        canDelete: false,
    },
}
