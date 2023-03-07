import axios from "axios";

import { FindHotelsRequest, IFavoriteHotelsRequest } from "../models/hotels";

export const BASE_URL = "https://engine.hotellook.com/api/v2/cache.json";

export const hotelsService = {
    getHotelsByLocationAndDates: async (
        { location, checkOutDate, checkInDate, page, limit }: FindHotelsRequest,
        signal: AbortSignal
    ) => {
        return await axios.get(
            BASE_URL + `?location=${location}&currency=rub&checkIn=${checkInDate}&checkOut=${checkOutDate}`,
            {
                params: {
                    limit: limit || 10,
                },
                signal,
            }
        );
    },
    getHotelsByIdAndDates: async (
        { hotelId, checkOutDate, checkInDate }: IFavoriteHotelsRequest,
        signal?: AbortSignal
    ) => {
        return await axios.get(BASE_URL, {
            params: {
                currency: "rub",
                checkOut: checkOutDate,
                checkIn: checkInDate,
                hotelId: hotelId,
                limit: 10,
            },
            signal,
        });
    },
};
