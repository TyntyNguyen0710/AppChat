import {configureStore} from "@reduxjs/toolkit";
import socketReducer from "./slice/SocketSlice";
import authReducer from "./slice/AuthSlice";
import chatReducer from "./slice/ChatSlice";

export const store = configureStore({
    reducer:{
        socket:socketReducer,
        auth:authReducer,
        chat:chatReducer,
    }
})