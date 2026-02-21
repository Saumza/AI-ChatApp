import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
    apiVersion: "v1alpha"
})


// 
const messageStream = async function* (model, contents, systemPrompt) {

    let payload = {}

    if (systemPrompt) {
        payload.systemInstruction = {
            role: "system",
            parts: [{ text: systemPrompt }]
        }
        // console.log(payload);
    }

    payload.contents = contents
    // console.log(payload);

    const response = await ai.models.generateContentStream({
        model,
        systemInstruction: payload.systemInstruction,
        contents: payload.contents
    })

    for await (const chunk of response) {
        if (chunk.text) {
            yield chunk.text
        }
    }
}


const generateTitle = async function* (model, contents) {
    const response = await ai.models.generateContentStream({
        model,
        contents: {
            role: "user",
            parts: [{ text: contents }]
        }
    })

    for await (const chunk of response) {
        if (chunk.text) {
            yield chunk.text
        }
    }
}

export { messageStream, generateTitle }