import PropTypes from 'prop-types'

import Pencil from '@/app/assets/pencil.svg'
import Trash from '@/app/assets/trash.svg'
import Eye from '@/app/assets/eye.svg'

const TableCrudActions = ({
    canView = true,
    canEdit = true,
    canDelete = true,
    onView = () => {},
    onEdit = () => {},
    onDelete = () => {},
}) => {
    return (
        <div className="flex flex-row justify-start gap-x-4">
            {canView ? (
                <Eye
                    className="h-6 w-6 cursor-pointer fill-primary"
                    onClick={onView}
                />
            ) : null}
            {canEdit ? (
                <Pencil
                    className="h-6 w-6 cursor-pointer fill-primary"
                    onClick={onEdit}
                />
            ) : null}
            {canDelete ? (
                <Trash
                    className="h-6 w-6 cursor-pointer fill-danger"
                    onClick={onDelete}
                />
            ) : null}
        </div>
    )
}

TableCrudActions.propTypes = {
    canView: PropTypes.bool,
    canEdit: PropTypes.bool,
    canDelete: PropTypes.bool,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}

export default TableCrudActions
