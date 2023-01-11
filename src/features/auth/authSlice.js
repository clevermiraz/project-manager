const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: ''
    },

    reducers: {
        signin: (state, action) => {
            state.user = action?.payload?.user;
            state.accessToken = action?.payload?.accessToken;
        },
        logout: (state) => {
            state.user = {};
            state.accessToken = '';
            localStorage.clear();
        }
    }
});

export default authSlice.reducer;
export const { signin, logout } = authSlice.actions;
