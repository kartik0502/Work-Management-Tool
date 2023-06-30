import { createSlice } from "@reduxjs/toolkit";

const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
        buttonloading : false
    },
    reducers: {
        SetLoading: (state, action) => {
            state.loading = action.payload
        },
        SetButtonLoading: (state, action) => {
            state.buttonloading = action.payload
        }
    }
});

export const { SetLoading, SetButtonLoading} = loadersSlice.actions;
export default loadersSlice.reducer;