import {configureStore} from "@reduxjs/toolkit";
import socketReducer from "./slice/SocketSlice";
import authReducer from "./slice/AuthSlice";
import conversationReducer from "./slice/ConversationSlice";

export const store = configureStore({
    reducer:{
        socket:socketReducer,
        auth:authReducer,
        conversation:conversationReducer
    }
})