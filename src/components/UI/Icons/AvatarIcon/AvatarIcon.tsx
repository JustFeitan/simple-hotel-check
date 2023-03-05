import {FC, ReactNode} from 'react';
import './AvatarIcon.scss';
interface HotelIcon {
    height?: number;
    width?: number;
    children: JSX.Element | ReactNode
}
const AvatarIcon: FC<HotelIcon> = ({height, width, children}) => {
    const styles = {
        width: width ?? 64 + 'px',
        height: height ?? 64 + 'px',
    }
    return (
        <div className='avatar-icon' style={styles}>
            {children}
        </div>

    );
};

export default AvatarIcon;

