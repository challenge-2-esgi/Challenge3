import Dropdown from '@/components/Dropdown'

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            action: 'item selected',
        },
    },
}

export const Default = {
    args: {
        label: <h1>Dropdown button</h1>,
        items: ['Profile', 'Account'],
        renderItem: (item) => <h1>{item}</h1>,
    },
}
