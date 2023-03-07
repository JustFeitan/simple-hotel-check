import { IHotelLocation } from "./IHotelLocation";

export interface IHotel {
    hotelId: number;
    hotelName: string;
    location: IHotelLocation;
    locationId: number;
    priceAvg: number;
    priceFrom: number;
    pricePercentile: number[];
    stars: number;
}
