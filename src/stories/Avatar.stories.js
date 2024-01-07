import Avatar from '@/components/Avatar'

export default {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export const NoImage = {
    args: {
        fullname: 'John Doe',
        role: 'UX Designer',
    },
}

export const WithImage = {
    args: {
        fullname: 'John Doe',
        role: 'UX Designer',
        image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Rascal',
    },
}
