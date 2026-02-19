import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
    apiVersion: v1
})


// 
const messageStream = async (model, contents, systemPrompt) => {

    let payload = {}

    if (systemPrompt) {
        payload.systemInstruction = {
            role: "system",
            parts: [{ text: systemPrompt }]
        }
    }

    payload.contents = contents

    const response = await ai.models.generateContentStream({
        model,
        payload
    })

    for await (const chunk of response) {
        if (chunk.text) {
            yield chunk.text
        }
    }
}


const generateTitle = async (model, contents) => {
    const response = await ai.models.generateContent({
        model,
        contents
    })

    if (response.text) {
        return response.text
    }
}

export { messageStream, generateTitle }