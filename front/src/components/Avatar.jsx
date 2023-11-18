import PropTypes from 'prop-types'

import AvatarIcon from '@/app/assets/avatar.svg'
import classNames from 'classnames'

const Avatar = ({ fullname, role, image = null, className = '' }) => {
    return (
        <div className={classNames('flex items-center gap-4', className)}>
            <div className="text-right">
                <span className="block text-sm font-medium text-black">
                    {fullname}
                </span>
                <span className="block text-xs">{role}</span>
            </div>
            {!image ? (
                <span className="[&>svg]:h-12 [&>svg]:w-12 [&>svg]:fill-graydark">
                    <AvatarIcon />
                </span>
            ) : (
                <img
                    className="aspect-square h-12 w-12 rounded-full"
                    src={image}
                    alt="User"
                />
            )}
        </div>
    )
}

Avatar.propTypes = {
    fullname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string,
    className: PropTypes.string,
}

export default Avatar
