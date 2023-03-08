import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFavoriteHotelsRequest, IHotel } from "../../../models/hotels";

interface FavoriteHotelsState {
    usersFavoriteHotels: IHotel[];
    isLoading: boolean;
    error: string;
}

const initialState: FavoriteHotelsState = {
    usersFavoriteHotels: [],
    isLoading: false,
    error: "",
};

export const usersFavoriteHotelsSlice = createSlice({
    name: "favorite/hotels",
    initialState,
    reducers: {
        addFavoriteHotels: (state, action: PayloadAction<IHotel>) => {
            state.usersFavoriteHotels.push(action.payload);
            state.isLoading = false;
            state.error = "";
        },
        setFavoriteHotels: (state, action: PayloadAction<IHotel[]>) => {
            state.usersFavoriteHotels = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        removeFavoriteHotel: (state, action: PayloadAction<IHotel[]>) => {
            state.usersFavoriteHotels = action.payload;
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

        addFavoriteHotelMutation: (state, action: PayloadAction<IHotel>) => {},
        removeFavoriteHotelMutation: (state, action: PayloadAction<number>) => {},
        updateFavoriteHotelsMutation: (state, action: PayloadAction<Omit<IFavoriteHotelsRequest, "hotelId">>) => {},
    },
});
