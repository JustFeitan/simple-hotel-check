import { differenceInDays } from "date-fns";
import { FC, useMemo } from "react";

import { formatDateWithFnsFormat } from "../../../../../helpers/dateHelpers/formatDateWithFnsFormat";
import { formatPrice } from "../../../../../helpers/formatPrice";
import { useNounForNumber } from "../../../../../hooks";
import { useActions, useAppSelector, useHeartActiveStatus } from "../../../../../hooks/redux";
import { IHotel } from "../../../../../models/hotels";
import { findHotelsRequestedDataSelector } from "../../../../../store/reducers/hotelsSlice";
import { usersFavoriteHotelsActions } from "../../../../../store/reducers/usersAndFavoriteHotelsSlice";
import HeartIcon from "../../../Icons/HeartIcon";
import StarRating from "../../../StarRating/StarRating";
import "./FavoriteHotelListItem.scss";

interface HotelsListItemProps {
    hotel: IHotel;
}

const FavoriteHotelsListItem: FC<HotelsListItemProps> = ({ hotel }) => {
    const requestedHotelsData = useAppSelector(findHotelsRequestedDataSelector);
    const { addFavoriteHotelMutation, removeFavoriteHotelMutation } = useActions(usersFavoriteHotelsActions);
    const heartActive = useHeartActiveStatus(hotel);
    const daysOfStay = useMemo(() => {
        if (!requestedHotelsData?.checkInDate || !requestedHotelsData?.checkOutDate) return;
        return differenceInDays(
            new Date(requestedHotelsData!.checkOutDate),
            new Date(requestedHotelsData!.checkInDate)
        );
    }, [requestedHotelsData?.checkInDate, requestedHotelsData?.checkOutDate]);

    const daysNoun = useNounForNumber(daysOfStay ?? 0, "день", "дня", "дней");

    const handleFavoriteBtnClick = () => {
        if (heartActive) {
            removeFavoriteHotelMutation(hotel.hotelId);
        } else {
            const newFavoriteHotel: IHotel = {
                ...hotel,
            };
            addFavoriteHotelMutation(newFavoriteHotel);
        }
    };

    return (
        <div className="favorite-hotel-item">
            <div className="favorite-hotel-item__left">
                <div className="favorite-hotel-item__left__bio">
                    <span className="favorite-hotel-item__left__bio__name">{hotel.hotelName}</span>
                    {requestedHotelsData && (
                        <span className="favorite-hotel-item__left__bio__dates">
                            {formatDateWithFnsFormat(requestedHotelsData.checkInDate, "d MMMM yyyy")}
                            <span>&mdash;</span>
                            {daysOfStay} {daysNoun}
                        </span>
                    )}

                    <div className="favorite-hotel-item__left__bio__rating">
                        <StarRating starsCount={5} rating={hotel.stars} />
                    </div>
                </div>
            </div>

            <div className="favorite-hotel-item__right">
                <div
                    className={
                        heartActive
                            ? `favorite-hotel-item__right__to-favorite-btn favorite-hotel-item__right__to-favorite-btn--active`
                            : "favorite-hotel-item__right__to-favorite-btn"
                    }
                >
                    <HeartIcon onClick={handleFavoriteBtnClick} />
                </div>
                <div className="favorite-hotel-item__right__price">
                    <p>Price:</p> <span>{formatPrice(hotel.priceAvg)} &#x20bd;</span>
                </div>
            </div>
        </div>
    );
};

export default FavoriteHotelsListItem;
