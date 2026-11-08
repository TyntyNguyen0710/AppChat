import {createSlice} from "@reduxjs/toolkit";

const chatSlice= createSlice({
    name: "chat",
    initialState: {
        room: "",
        members: [],
        messages: [],
        onlineStatus: {},
        page: 1,
        error: "",
        success: ""
    },
    reducers: {
        setRoom: (state, action) =>{
            state.room= action.payload
        },
        setMembers: (state, action) =>{
            state.members= action.payload
        },
        setMessages: (state, action) =>{
            state.messages= action.payload
        },
         setOnlineStatus: (state, action) =>{
            state.onlineStatus= action.payload
        },
        addMember: (state, action) =>{
            state.members.push(action.payload)
        },
        addMessage: (state, action) =>{
            state.messages.push(action.payload)
        },
        setSuccess: (state, action) =>{
            state.success= action.payload
        },
        setError: (state, action) =>{
            state.error= action.payload
        }
    }
});

export const {setRoom, setMembers, setMessages, setOnlineStatus, addMember, addMessage, setSuccess, setError}= chatSlice.actions;
export default chatSlice.reducer;