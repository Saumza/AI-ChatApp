import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    conversations: [],
    activeConversationId: null
}


const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        addOrUpdateConversation: (state, action) => {
            const index = state.conversations.findIndex((conversation) => conversation._id === action.payload._id)
            if (index !== -1) {
                state.conversations[index] = action.payload
            }
            else {
                state.conversations.push(action.payload)
            }
        },
        deleteConversation: (state, action) => {
            state.conversations = state.conversations.filter((conversation) => conversation._id !== action.payload._id)
        },
        activeConversation: (state, action) => {
            state.activeConversationId = action.payload
        }
    }
})


export const { activeConversation, addOrUpdateConversation, deleteConversation, setConversations } = conversationSlice.actions
export const conversationReducer = conversationSlice.reducer