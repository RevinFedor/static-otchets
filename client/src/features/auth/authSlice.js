import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => {
            const user = action.payload;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        logOut: (state, action) => {
            localStorage.removeItem('user');
            state.user = null;
        },
    },
});

//! функции
export const { setCredentials, logOut } = authSlice.actions;

//! получить текущий токен

export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
