import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../../models/IUser";

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    error: string;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        setUserLoading: (state) => {
            state.isLoading = true;
        },
        setUserError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        login: (state, action: PayloadAction<IUser>) => {},
        logout: (state) => {},
    },
});
