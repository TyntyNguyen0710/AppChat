import {createSlice} from "@reduxjs/toolkit";

const chatSlice= createSlice({
    name: "chat",
    initialState: {
        room: "",
        members: [],
        messages: [],
        onlineStatus: {},
        page: 1,
    },
    reducers: {
        setRoom: (state, action) =>{
            state.room= action.payload
        },
        addMessage: (state, action) =>{
            state.messages.push(action.payload)
        }
    }
});

export const {setRoom, addMessage}= chatSlice.actions;
export default chatSlice.reducer;