import Svg from '@/app/assets/circle-chevron.svg'

const BackIcon = ({ onClick }) => {
    return (
        <Svg
            className="h-10 w-10 rotate-90 cursor-pointer fill-black hover:fill-body"
            onClick={onClick}
        />
    )
}

export default BackIcon
