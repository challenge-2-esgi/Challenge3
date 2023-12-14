import Loader from '@/components/Loader'

export default {
    title: 'Components/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export const Small = {
    args: {
        size: 'small',
    },
}

export const Medium = {
    args: {
        size: 'medium',
    },
}

export const Large = {
    args: {
        size: 'large',
    },
}

export const MediumWithColor = {
    args: {
        size: 'medium',
        color: 'danger',
    },
}
