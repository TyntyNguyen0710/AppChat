import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name: "auth",
    initialState: {
        user: "",
        pendingUser: "",
        code: "",
        isLogin: false,
        error: "",
        success: "",
        restoring: localStorage.getItem("session") !== null,
    },
    reducers: {
        setPendingUser: (state, action) => {
            state.pendingUser = action.payload
        },
        loginSuccess: (state, action) => {
            state.user = state.pendingUser
            state.code = action.payload
            state.isLogin = true
            state.restoring = false
            state.error = ""
        },
        logout: (state) => {
            state.user = ""
            state.pendingUser = ""
            state.code = ""
            state.isLogin = false
            state.restoring = false
        },
        setError: (state, action) => {
            state.error = action.payload
            state.success = ""
        },
        setSuccess: (state, action) => {
            state.success = action.payload
            state.error = ""
        },
        clearMessage: (state) => {
            state.error = ""
            state.success = ""
        }
    }
})

export const {setPendingUser, loginSuccess, logout, setError, setSuccess, clearMessage}=authSlice.actions;
export default authSlice.reducer;