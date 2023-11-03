import Button from '@/components/Button'

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export const Large = {
    args: {
        size: 'large',
        children: ['Label'],
    },
}

export const Medium = {
    args: {
        size: 'medium',
        children: ['Label'],
    },
}

export const Small = {
    args: {
        size: 'small',
        children: ['Label'],
    },
}

export const Outlined = {
    args: {
        size: 'large',
        outlined: true,
        children: ['Label'],
    },
}

export const Disabled = {
    args: {
        size: 'large',
        disabled: true,
        children: ['Label'],
    },
}
