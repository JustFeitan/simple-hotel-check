import { IFavoriteHotel } from "./IFavoriteHotel";

export interface IFavoriteHotelsRequest extends Pick<IFavoriteHotel, "checkOutDate" | "checkInDate" | "hotelId"> {}
