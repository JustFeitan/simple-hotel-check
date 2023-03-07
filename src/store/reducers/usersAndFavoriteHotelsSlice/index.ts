import { RootState } from "../../store";
import { usersFavoriteHotelsSlice } from "./usersAndFavoriteHotelsSlice";

export const usersFavoriteHotelsReducer = usersFavoriteHotelsSlice.reducer;
export const usersFavoriteHotelsActions = usersFavoriteHotelsSlice.actions;
export const usersFavoriteHotelsStateSelector = (state: RootState) => state.usersFavoriteHotelsReducer;
export const usersFavoriteHotelsSelector = (state: RootState) => state.usersFavoriteHotelsReducer.usersFavoriteHotels;
