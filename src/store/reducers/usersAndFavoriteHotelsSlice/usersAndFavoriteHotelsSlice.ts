import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFavoriteHotel } from "../../../models/hotels";

interface FavoriteHotelsState {
    usersFavoriteHotels: IFavoriteHotel[];
    isLoading: boolean;
    error: string;
}

const initialState: FavoriteHotelsState = {
    usersFavoriteHotels: [],
    isLoading: false,
    error: "",
};

export const usersFavoriteHotelsSlice = createSlice({
    name: "userFavorite/hotels",
    initialState,
    reducers: {
        addUsersFavoriteHotels: (state, action: PayloadAction<IFavoriteHotel>) => {
            state.usersFavoriteHotels.push(action.payload);
            state.isLoading = false;
            state.error = "";
        },
        setUsersFavoriteHotels: (state, action: PayloadAction<IFavoriteHotel[]>) => {
            state.usersFavoriteHotels = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        removeUsersFavoriteHotel: (state, action: PayloadAction<IFavoriteHotel[]>) => {
            state.usersFavoriteHotels = action.payload;
            state.isLoading = false;
            state.error = "";
        },

        setUsersFavoriteHotelsLoading: (state) => {
            state.isLoading = true;
        },
        setUsersFavoriteHotelsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        addUsersFavoriteHotelMutation: (state, action: PayloadAction<IFavoriteHotel>) => {},
        removeUsersFavoriteHotelMutation: (state, action: PayloadAction<number>) => {},
    },
});
