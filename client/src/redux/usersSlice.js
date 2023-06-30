import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        users: []
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload
        },
        SetUsers: (state, action) => {
            state.users = action.payload
        }
    }
});

export const {SetUser, SetUsers} = usersSlice.actions;
export default usersSlice.reducer;