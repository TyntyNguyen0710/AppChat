import {createSlice} from "@reduxjs/toolkit";

const chatSlice= createSlice({
    name: "chat",
    initialState: {
        current: null as any,
        room: "",
        members: [],
        messages: [],
        onlineStatus: {},
        page: 1,
        error: "",
        notice: "",
        success: ""
    },
    reducers: {
        setCurrent: (state, action) =>{
    const item = action.payload
    if(item && state.current && item.name === state.current.name && item.type === state.current.type){
        return
    }
    state.current= item
    state.messages= []
    state.members= []
    state.page= 1
    state.error= ""
},
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
        },
        setNotice: (state, action) =>{
            state.notice= action.payload
        }
    }
});

export const {setCurrent, setRoom, setMembers, setMessages, setOnlineStatus, addMember, addMessage, setSuccess, setError, setNotice}= chatSlice.actions;
export default chatSlice.reducer;