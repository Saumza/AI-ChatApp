import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    userStatus: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload
            state.userStatus = true
        },
        logout: (state, action) => {
            state.userData = null
            state.userStatus = false
        }
    }
})


export const { login, logout } = authSlice.actions

export const authReducer = authSlice.reducer