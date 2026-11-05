import {configureStore} from "@reduxjs/toolkit";
import socketReducer from "./slice/SocketSlice";

export const store = configureStore({
    reducer:{
        socket:socketReducer,
    }
})
