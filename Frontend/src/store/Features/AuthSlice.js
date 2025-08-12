import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "AuthData",
    initialState: {
        Name : undefined , 
        Email: undefined,
        ProfilePic: undefined,
        Token : undefined // it will be encrypted
    },
    reducers: {
        setAuthData: (state, action) => {
            state.Name = action.payload.Name;
            state.Email = action.payload.Email;
            state.ProfilePic = action.payload.ProfilePic;
            state.Token = action.payload.Token;
        },
    },
});

export const { setAuthData } = AuthSlice.actions;
export default AuthSlice.reducer;
