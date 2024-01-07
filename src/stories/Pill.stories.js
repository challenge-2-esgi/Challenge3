import Pill from '@/components/Pill'

export default {
    title: 'Components/Pill',
    component: Pill,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export const Default = {
    args: {
        title: 'Info',
        color: 'info',
    },
}

export const Outlined = {
    args: {
        title: 'Danger',
        color: 'danger',
        outlined: true,
    },
}
