import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AdminSliceState, AdminState} from "../utils/types.ts";

const initialState: AdminSliceState = {
    admin: null,
    token: localStorage.getItem("admin-token"),
    isAuthenticated: !!localStorage.getItem("admin-token"),
};

type AdminSlicePayloadState = Omit<AdminSliceState, "isAuthenticated">;

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<AdminSlicePayloadState>) => {
            state.admin = action.payload.admin;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("admin-token", action.payload.token ?? '');
        },
        logout: (state) => {
            state.admin = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("admin-token");
        },
        signup: (state, action: PayloadAction<AdminSlicePayloadState>) => {
            state.admin = action.payload.admin;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("admin-token", action.payload.token ?? '');
        },
        setAdmin: (state, action: PayloadAction<AdminState>) => {
            state.admin = action.payload;
        },
    },
});

export const {login, logout, signup, setAdmin} = adminSlice.actions;
export default adminSlice.reducer;
