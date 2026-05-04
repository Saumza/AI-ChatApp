import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    conversations: [],
    activeConversationId: null,
    newConversationId: null
}


const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversation: (state, action) => {
            if (action.payload.length > 0) {
                state.conversations = action.payload
            }
        },
        addOrUpdateConversation: (state, action) => {
            const index = state.conversations.findIndex((conversation) => conversation._id === action.payload._id)
            if (index !== -1) {
                if (action.payload.title) {
                    state.conversations[index].title += action.payload.title
                }
                if (action.payload.updatedAt) {
                    state.conversations[index].updatedAt = action.payload.updatedAt
                }
            }
            else {
                state.conversations.unshift(action.payload)
            }
        },
        deleteConversation: (state, action) => {
            state.conversations = state.conversations.filter((conversation) => conversation._id !== action.payload)
        },
        activeConversation: (state, action) => {
            state.activeConversationId = action.payload
        },
        newConversation: (state, action) => {
            state.newConversationId = action.payload
        },
        sortedConversation: (state) => {
            state.conversations = [...state.conversations].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        },
        updateConversation: (state, action) => {
            const index = state.conversations.findIndex((conversation) => conversation._id === action.payload._id)
            if (index !== -1) {
                state.conversations[index].title = action.payload.title
            }
            else {
                state.conversations.push(action.payload)
            }
        }
    }
})


export const { activeConversation, addOrUpdateConversation, deleteConversation, setConversation, sortedConversation, updateConversation, newConversation } = conversationSlice.actions
export const conversationReducer = conversationSlice.reducer