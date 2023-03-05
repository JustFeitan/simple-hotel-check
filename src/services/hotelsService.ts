import {FindHotelsRequest} from "../models/hotels/FindHotelsRequest";

export const BASE_URL = 'http://engine.hotellook.com/api/v2/cache.json';

export const hotelsService = {
    getHotelsByLocationAndDates: async ({location, checkOutDate, checkInDate}: FindHotelsRequest) => {
        return await fetch(BASE_URL + `?location=${location}&currency=rub&checkIn=${checkInDate}&checkOut=${checkOutDate}&limit=10`)
            .then(res => res.json())
    }
}
