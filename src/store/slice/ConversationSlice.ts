import {createSlice} from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name: "conversation",
    initialState: {
        list: [] as any[]
    },
    reducers: {
        setConversations: (state, action) => {
            state.list = action.payload
        },
        clearConversations: (state) => {
            state.list = []
        }
    }
})
export const {setConversations, clearConversations}=conversationSlice.actions;
export default conversationSlice.reducer;