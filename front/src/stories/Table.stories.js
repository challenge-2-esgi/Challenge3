import Table from '@/components/Table'

export default {
    title: 'Components/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

const columnsIds = {
    id: 'id',
    name: 'name',
    age: 'age',
}
const columns = [
    { id: columnsIds.id, header: 'ID', accessorKey: 'id' },
    { id: columnsIds.name, header: 'Name', accessorKey: 'name' },
    { id: columnsIds.age, header: 'Age', accessorKey: 'age' },
]
const columnsWithActions = [
    ...columns,
    {
        id: 'actions',
        header: '',
        cell: () => (
            <div className="text-white">
                <button className="mr-3 rounded bg-primary p-2">view</button>
                <button className="mr-3 rounded bg-primary p-2">edit</button>
                <button className="mr-3 rounded bg-primary p-2">delete</button>
            </div>
        ),
    },
]

const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Bob Smith', age: 22 },
]

const largeData = Array.from({ length: 17 }, (_, i) => ({
    id: i,
    name: 'John Doe',
    age: 25,
}))

export const Default = {
    args: {
        columns,
        data: data,
    },
}

export const WithPagination = {
    args: {
        columns,
        data: largeData,
    },
}

export const WithLoading = {
    args: {
        columns,
        data: [],
        loading: true,
    },
}

export const WithPageSize = {
    args: {
        columns,
        data: largeData,
        pageSize: 5,
    },
}

export const WithActions = {
    args: {
        columns: columnsWithActions,
        data: largeData,
    },
}

export const WithHiddenIDColumn = {
    args: {
        columns,
        data,
        columnVisibility: {
            [columnsIds.id]: false,
        },
    },
}
