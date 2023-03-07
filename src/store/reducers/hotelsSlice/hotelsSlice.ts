import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FindHotelsRequest, IHotel } from "../../../models/hotels";

interface FindHotelsState {
    hotels: IHotel[];
    requestedHotelsData: FindHotelsRequest | null;
    isLoading: boolean;
    error: string;
}

const initialState: FindHotelsState = {
    hotels: [],
    requestedHotelsData: null,
    isLoading: false,
    error: "",
};

export const findHotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        setHotels: (state, action: PayloadAction<IHotel[]>) => {
            state.hotels = action.payload;
            state.isLoading = false;
        },
        setHotelsLoading: (state) => {
            state.isLoading = true;
        },
        setHotelsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        getHotelsByLocationAndDates: (state, action: PayloadAction<FindHotelsRequest>) => {
            state.requestedHotelsData = action.payload;
        },
    },
});
