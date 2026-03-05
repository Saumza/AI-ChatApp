import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        addChat: (state, action) => {
            state.chats.push(action.payload)
        },
        updateChat: (state, action) => {
            const index = state.chats.findIndex((chat) => chat._id === action.payload._id)
            if (index !== -1) {
                state.chats[index].content += action.payload.content
            }
        },
        finishChat: (state, action) => {
            const index = state.chats.findIndex((chat) => chat._id === action.payload._id)
            if (index !== -1) {
                state.chats[index].isStreaming = false;
            }
        }
    }
})

export const { setChats, addChat, updateChat, finishChat } = chatSlice.actions
export const chatReducer = chatSlice.reducer