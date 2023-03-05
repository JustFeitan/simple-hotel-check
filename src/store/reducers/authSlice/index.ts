import {RootState} from "../../store";
import {authSlice} from "./authSlice";

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authSelector = (state: RootState) => state.authReducer;
export const userSelector = (state: RootState) => state.authReducer.user;
