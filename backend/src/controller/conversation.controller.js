import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Chat } from "../models/chat.model.js"



const getAllConversations = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    if (!isValidObjectId(userId)) {
        throw new APIError(401, "Not Valid Object")
    }

    const conversation = await Conversation.find({ userId }).sort({ createdAt: -1 })

    if (conversation.length === 0) {
        return res.status(200).json(new APIResponse(200, {}, "No Conversations Available"))
    }

    return res.status(200).json(new APIResponse(200, conversation, "Conversations Fetched Successfully"))

})


const updateConversation = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    const { title } = req.body
    const { conversationId } = req.params

    if (!conversationId || !title) {
        throw new APIError(401, "Required Credentials Not Provided")
    }

    const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
            $set: {
                title,
            }
        },
        { new: true }
    )

    if (!conversation) {
        throw new APIError(500, "Internal Server Error")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, conversation.title, "Title Updated Successfully")
        )
})


const deleteConversation = asyncHandler(async (req, res) => {
    const { conversationId } = req.params

    if (!conversationId) {
        throw new APIError(404, "Required Credentials Not Provided")
    }

    const conversation = await Conversation.findByIdAndDelete(conversationId)
    if (!conversation) {
        throw new APIError(409, "Conversation could get deleted")
    }

    const chat = await Chat.deleteMany({
        conversationId
    })

    if (!chat) {
        throw new APIError(409, "Chats could get deleted")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "OK")
        )
})

const getAllChats = asyncHandler(async (req, res) => {
    const { conversationId } = req.params
    if (!conversationId) {
        throw new APIError(404, "Required Credentials Not Provided")
    }

    const chats = await Chat.find({
        conversationId
    })

    if (chats.length === 0) {
        return res.status(200).json(new APIResponse(200, {}, "No History"))
    }

    return res
        .status(200)
        .json(new APIResponse(200, chats, "History Fetched Successfully"))
})


export { getAllConversations, updateConversation, deleteConversation, getAllChats }