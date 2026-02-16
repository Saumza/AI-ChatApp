import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    systemPrompt: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Conversation = new mongoose.model("Conversation", conversationSchema)