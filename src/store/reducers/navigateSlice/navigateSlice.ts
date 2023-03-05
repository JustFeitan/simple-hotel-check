import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppStore} from "../../store";

interface initialNavigationState {
    redirectTo: string | null;
}

const initialState: initialNavigationState = {
    redirectTo: ''
}
export const navigateSlice = createSlice({
    name: 'navigate',
    initialState,
    reducers: {
        redirect: (state, action: PayloadAction<string>) => {
            state.redirectTo = action.payload;
        },
        clearRedirect: (state) => {
            state.redirectTo = null
        }
    }
})
