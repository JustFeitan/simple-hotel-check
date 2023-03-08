import { IFavoriteHotel } from "./IFavoriteHotel";

export interface IFavoriteHotelsRequest extends Pick<IFavoriteHotel, "hotelId"> {
    checkOutDate: string;
    checkInDate: string;
}
