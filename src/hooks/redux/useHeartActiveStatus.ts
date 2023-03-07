import { useMemo } from "react";

import { IHotel } from "../../models/hotels/IHotel";
import { usersFavoriteHotelsSelector } from "../../store/reducers/usersAndFavoriteHotelsSlice";
import { useAppSelector } from "./useAppSelector";

export const useHeartActiveStatus = (hotel: IHotel) => {
    const usersFavoriteHotel = useAppSelector(usersFavoriteHotelsSelector);
    return useMemo(() => {
        const foundHotel = usersFavoriteHotel.find((favoriteHotel) => hotel.hotelId === favoriteHotel.hotelId);
        return !!foundHotel;
    }, [usersFavoriteHotel.length]);
};
