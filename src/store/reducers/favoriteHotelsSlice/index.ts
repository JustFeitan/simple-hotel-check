import { RootState } from "../../store";
import { favoriteHotelsSlice } from "./favoriteHotelsSlice";

export const favoriteHotelsReducer = favoriteHotelsSlice.reducer;
export const favoriteHotelsActions = favoriteHotelsSlice.actions;
export const favoriteHotelsStateSelector = (state: RootState) => state.favoriteHotelsReducer;
export const favoriteHotelsSelector = (state: RootState) => state.favoriteHotelsReducer.favoriteHotels;
