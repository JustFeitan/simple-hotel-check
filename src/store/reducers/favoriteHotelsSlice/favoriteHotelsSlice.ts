import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFavoriteHotelsRequest, IHotel } from "../../../models/hotels";

interface FavoriteHotelsState {
    favoriteHotels: IHotel[];
    isLoading: boolean;
    error: string;
}

const initialState: FavoriteHotelsState = {
    favoriteHotels: [],
    isLoading: false,
    error: "",
};

export const favoriteHotelsSlice = createSlice({
    name: "favorite/hotels",
    initialState,
    reducers: {
        setFavoriteHotels: (state, action: PayloadAction<IHotel[]>) => {
            state.favoriteHotels = action.payload;
            state.isLoading = false;
            state.error = "";
        },

        setFavoriteHotelsLoading: (state) => {
            state.isLoading = true;
        },
        setFavoriteHotelsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateFavoriteHotelsMutation1: (state, action: PayloadAction<Omit<IFavoriteHotelsRequest, "hotelId">>) => {},
    },
});
