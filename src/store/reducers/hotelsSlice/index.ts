import { RootState } from "../../store";
import { findHotelsSlice } from "./hotelsSlice";

export const findHotelsReducer = findHotelsSlice.reducer;
export const findHotelsActions = findHotelsSlice.actions;
export const findHotelsStateSelector = (state: RootState) => state.findHotelsReducer;
export const findHotelsSelector = (state: RootState) => state.findHotelsReducer.hotels;
export const findHotelsRequestedDataSelector = (state: RootState) => state.findHotelsReducer.requestedHotelsData;
