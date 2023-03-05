import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IHotel} from "../../../models/hotels/IHotel";
import {FindHotelsRequest} from "../../../models/hotels/FindHotelsRequest";

interface FindHotelsState {
    hotels: IHotel[];
    requestHotelsData: FindHotelsRequest | null;
    isLoading: boolean;
    error: string
}

const initialState: FindHotelsState = {
    hotels: [],
    requestHotelsData: null,
    isLoading: false,
    error: '',
}

export const findHotelsSlice = createSlice({
    name: 'hotels',
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
            state.requestHotelsData = action.payload;
        }
    }
})


