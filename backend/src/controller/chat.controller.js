import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Chat } from "../models/chat.model.js";
import { Conversation } from "../models/conversation.model.js";
import { apiProviders } from "../api/index.js";
import mongoose from "mongoose";


export const apiProvidersFinder = (model) => {
    if (model.includes("gemini") || model.includes("gemma") || model.includes("nano banana") || model.includes("imagen") || model.includes("veo")) {
        return "google"
    }
}


const selectedPrompt = (content) => {
    if (content.includes("code") || content.includes("programming") || content.includes("developer") || content.includes("debug") || content.includes("script") || content.includes("algorithm")) {
        return "coding"
    }
    else if (content.includes("solve") || content.includes("equation") || content.includes("math") || content.includes("calculate") || content.includes("geometry") || content.includes("statistics")) {
        return "math"
    }
    else if (content.includes("write") || content.includes("improve") || content.includes("edit") || content.includes("paragraph") || content.includes("rewrite") || content.includes("essay")) {
        return "writer"
    }
    else if (content.includes("solve") || content.includes("equation") || content.includes("math") || content.includes("cakculate") || content.includes("geometry") || content.includes("statistics")) {
        return "study"
    }
    else if (content.includes("story") || content.includes("poem") || content.includes("creative") || content.includes("fantasy") || content.includes("plot") || content.includes("character")) {
        return "creative"
    }
    else if (content.includes("summarize") || content.includes("tldr") || content.includes("shorten") || content.includes("brief") || content.includes("condense")) {
        return "summary"
    }
    else if (content.includes("translate") || content.includes("convert") || content.includes("convert language")) {
        return "translation"
    }
    else if (content.includes("json") || content.includes("structure") || content.includes("structured output") || content.includes("cakculate") || content.includes("geometry") || content.includes("statistics")) {
        return "json"
    }
    else {
        return "default"
    }
}

const Prompts = {
    default: "You are a helpful and knowledgeable AI assistant. Provide clear, accurate, and concise answers. Always think step-by-step and avoid unnecessary complexity. Strictly no empty lines in the end.",
    coding: "You are a senior software engineer. Provide optimized, clean, and production-ready code. Always explain the logic briefly before giving the code. Strictly no empty lines in the end.",
    math: "You are a strict math tutor. Provide step-by-step solutions and clear reasoning. Do not skip intermediate steps. Strictly no empty lines in the end.",
    writer: "You are a professional writer. Return well-structured, concise, and polished writing. Use proper tone based on the context. Strictly no empty lines in the end.",
    study: "You are an expert teacher. Explain topics as if teaching to a beginner. Use analogies, bullet points, and simple language. Strictly no empty lines in the end.",
    creative: "You are a creative storyteller. Write vivid and engaging narratives with strong emotions and imagery. Strictly no empty lines in the end.",
    summary: "You are a summarization assistant. Reduce long content into clear, short summaries without losing important meaning. Strictly no empty lines in the end.",
    translation: "You are a professional translator. Translate the text accurately while keeping the original tone and intent. Strictly no empty lines in the end.",
    json: "You are a structured output generator. Always return responses strictly in valid JSON format without explanations. You are a function-calling assistant. Respond ONLY with JSON following the exact schema provided. Strictly no empty lines in the end."
}

const convertToContent = (history) => {

    const contents = history.map((message) => ({
        role: message.role,
        parts: [{ text: message.content }]
    }))

    return contents

}


const chat = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    const { model, content } = req.body

    const { conversationId } = req.params


    const provider = apiProvidersFinder(model)
    const api = apiProviders[provider]

    if (!conversationId) {

        const mode = selectedPrompt(content)
        const systemPrompt = Prompts[mode]

        const conversation = new Conversation({
            userId: mongoose.Types.ObjectId(userId),
            model,
            systemPrompt
        })

        await Chat.create({
            conversationId: conversation._id,
            content,
            role: "user"
        })

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        let buffer = ""
        const title = await api.generateTitle(
            model,
            `Just Summarize the extact topic of the whole content in 2-3 words ${content}. No need for extra details. Strictly 2-3 words, not more than that. No newlines`
        )

        for await (const text of title) {
            buffer += text
            res.write(`event: title\ndata:${text}\n\n`)
        }


        conversation.title = buffer
        await conversation.save({ validateBeforeSave: false })
        console.log("Reached Saving Conversation");

        const contents = [{
            role: "user",
            parts: [{ text: content }]
        }]

        let replyBuffer = ""
        const reply = await api.messageStream(
            model,
            contents,
            systemPrompt,
        )

        console.log("Reached generate reply stream");

        for await (const text of reply) {
            // if (!text || text.trim() === "") continue;
            replyBuffer += text
            res.write(`event: reply\ndata:${text}\n\n`)
        }
        console.log(replyBuffer);

        await Chat.create({
            conversationId: conversation._id,
            content: replyBuffer,
            role: "model"
        })
        
        res.status(200)
        res.end()
        return
    }

    const history = await Chat.find({
        conversationId,
    })

    console.log(history);


    const contents = convertToContent(history)

    contents.push({
        role: "user",
        parts: [{ text: content }]
    })

    await Chat.create({
        conversationId,
        content,
        role: "user"
    })

    let buffer = ""
    const reply = await api.messageStream(
        model,
        contents
    )

    for await (const text of reply) {
        buffer += text
        res.write(`event: reply\ndata:${text}\n\n`)
    }

    await Chat.create({
        conversationId,
        content: buffer,
        role: "model"
    })

    res.status(200)
    res.end()
    return

})

export { chat }