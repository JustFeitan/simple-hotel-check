import {FC, useState} from 'react';
import {IHotel} from "../../../../models/hotels/IHotel";
import './HotelsListItem.scss';
import {useAppSelector} from "../../../../hooks/redux/useAppSelector";
import {requestHotelsDataSelector} from "../../../../store/reducers/hotelsSlice";
import HotelIcon from "../../Icons/HotelIcon";
import AvatarIcon from "../../Icons/AvatarIcon/AvatarIcon";
import HeartIcon from "../../Icons/HeartIcon";
import StarRating from "../../StarRating/StarRating";
import {formatDateWithFnsFormat} from "../../../../helpers/dateHelpers/formatDateWithFnsFormat";
import {differenceInDays} from "date-fns";

interface HotelsListItemProps {
    hotel: IHotel;
}

const HotelsListItem: FC<HotelsListItemProps> = ({hotel}) => {
    const [heartActive, setHeartActive] = useState<boolean>(false);
    const requestHotelsData = useAppSelector(requestHotelsDataSelector)
    return (
        <div className='hotel-item'>
            <div className="hotel-item__left">
                <div className="hotel-item__left__icon">
                    <AvatarIcon>
                        <HotelIcon/>
                    </AvatarIcon>
                </div>
                <div className="hotel-item__left__bio">
                <span className="hotel-item__left__bio__name">
                    {hotel.hotelName}
                </span>
                    {
                        requestHotelsData &&
                        <span className="hotel-item__left__bio__dates">
                        {formatDateWithFnsFormat(requestHotelsData.checkInDate, 'dd MMMM yyyy')}
                           <span>&mdash;</span>
                        {differenceInDays(new Date(requestHotelsData.checkOutDate), new Date(requestHotelsData.checkInDate))}
                        </span>

                    }

                    <span className="hotel-item__bio__rating">
                    <StarRating starsCount={5} rating={hotel.stars}/>
                </span>
                </div>
            </div>

            <div className="hotel-item__right">
                <div
                    className={
                        heartActive
                            ? `hotel-item__right__to-favorite-btn hotel-item__right__to-favorite-btn--active`
                            : 'hotel-item__right__to-favorite-btn'
                    }>
                    <HeartIcon onClick={() => setHeartActive(prevState => !prevState)}/>
                </div>
                <div className="hotel-item__right__price">
                    <p>Price:</p> <span>{hotel.priceAvg.toFixed()} &#x20bd;</span>
                </div>
            </div>
        </div>
    );
};

export default HotelsListItem;
