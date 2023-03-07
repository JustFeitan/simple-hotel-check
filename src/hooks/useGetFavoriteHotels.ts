import { useMemo } from "react";

import { IFavoriteHotel } from "../models/hotels/IFavoriteHotel";
import { findHotelsSelector } from "../store/reducers/hotelsSlice";
import { useAppSelector } from "./redux/useAppSelector";

export const useGetFavoriteHotelsEntities = (favoriteHotels: IFavoriteHotel[]) => {
    const hotels = useAppSelector(findHotelsSelector);
    return useMemo(() => {
        return hotels.filter((hotel) =>
            favoriteHotels.some((favoriteHotel) => favoriteHotel.hotelId === hotel.hotelId)
        );
    }, [favoriteHotels]);
};
