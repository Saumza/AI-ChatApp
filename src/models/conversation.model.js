import mongoose from "mongoose"

const conversation = new mongoose.Schema({
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
})