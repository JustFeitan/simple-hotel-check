import { FC } from "react";

import { FindHotelsRequest } from "../../../../../models/hotels/FindHotelsRequest";
import { IHotel } from "../../../../../models/hotels/IHotel";
import AvatarIcon from "../../../Icons/AvatarIcon/AvatarIcon";
import HotelIcon from "../../../Icons/HotelIcon";
import FavoriteHotelListItem from "../FavoriteHotelListItem/FavoriteHotelListItem";
import "./HotelListItem.scss";

interface HotelsListItemProps {
    hotel: IHotel;
}

const HotelsListItem: FC<HotelsListItemProps> = ({ hotel }) => {
    return (
        <div className="hotel-item">
            <div className="hotel-item__left">
                <div className="hotel-item__left__icon">
                    <AvatarIcon>
                        <HotelIcon />
                    </AvatarIcon>
                </div>
            </div>
            <FavoriteHotelListItem hotel={hotel} />
        </div>
    );
};

export default HotelsListItem;
