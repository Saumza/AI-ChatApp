import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { conversationReducer } from "./slices/conversationSlice";
import { chatReducer } from "./slices/chatSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        conversation: conversationReducer,
        chat: chatReducer
    }
})