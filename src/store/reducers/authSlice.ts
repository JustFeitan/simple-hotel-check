import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";

interface initialState {
    user: IUser | null;
    isLoading: boolean;
    error: string
}

const initialState: initialState = {
    user: null,
    isLoading: false,
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        setUserLoading: (state, action: PayloadAction<IUser>) => {
            state.isLoading = true;
        },
        setUserError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

    }
})
