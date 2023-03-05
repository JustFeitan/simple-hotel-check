import {RootState} from "../../store";
import {findHotelsSlice} from "./hotelsSlice";

export const findHotelsReducer = findHotelsSlice.reducer
export const findHotelsActions = findHotelsSlice.actions
export const findHotelsSelector = (state: RootState) => state.findHotelsReducer;
export const hotelsSelector = (state: RootState) => state.findHotelsReducer.hotels;
export const requestHotelsDataSelector = (state: RootState) => state.findHotelsReducer.requestHotelsData;
