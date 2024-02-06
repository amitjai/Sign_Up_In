import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({

    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        getUser: (state, payload) => {
            return state.user = payload.action;
        },
    }
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;