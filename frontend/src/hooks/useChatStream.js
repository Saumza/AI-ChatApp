import { Chat } from "@/services/chat"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { activeConversation, addOrUpdateConversation } from "@/stores/slices/conversationSlice"
import { data } from "react-router"
import { addChat, updateChat } from "@/stores/slices/chatSlice"

export function useChatStream() {
    const dispatch = useDispatch()
    const [isStreaming, setIsStreaming] = useState(false)
    const controllerRef = useRef(null)
    const userData = useSelector((state) => state.auth.userData)
    const conversationId = useSelector((state) => state.conversation.activeConversationId)


    async function startStreaming({ content, model, conversationId }) {
        const controller = new AbortController()
        controllerRef.current = controller

        const temporaryTitleId = nanoid()
        const temporaryContentId = nanoid()
        const decoder = new TextDecoder()

        const url = Chat.url()

        let buffer = ""   // this buffer is being set for partial chunks

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    content,
                    model,
                    conversationId: conversationId || null
                }),
                headers: { "Content-Type": "application/json" },
                signal: controller.signal,
            })

            setIsStreaming(true)

            const chat_Doc = {
                _id: temporaryContentId,
                conversationId,
                content: "",
                role: "model"
            }
            dispatch(addChat(chat_Doc))

            for await (const text of response.body) {
                // 1. Translate bytes to text
                buffer += decoder.decode(text, { stream: true })

                // 2. Break the text into separate "Events" (\n\n is the separator)
                const messages = buffer.split("\n\n")

                // setting the partial chunks even if there is no chunk then it will be set as empty
                buffer = messages.pop()
                let event = ""
                let data = ""
                // iteration over the message array
                for (const line of messages) {

                    const parts = message.split("\n")

                    if (line.trim() === "") {
                        dispatch(updateChat({
                            _id: temporaryContentId,
                            content: "\n",
                        }))
                        continue
                    }

                    for (const part of parts) {
                        if (part.startsWith("event:")) {
                            event = part.replace("event:", "").trim()
                        }

                        if (part.startsWith("data:")) {
                            data = part.replace("data:", "")
                        }
                    }

                    if (event === "title") {
                        const conversationDoc = {
                            _id: temporaryTitleId,
                            userId: userData._id,
                            title: data
                        }
                        dispatch(addOrUpdateConversation(conversationDoc))
                    }

                    else if (event === "reply") {
                        const chatDoc = {
                            _id: temporaryContentId,
                            content: data,
                        }
                        chatDoc.content = (data === "") ? "\n" : data // handles the para space gap
                        dispatch(updateChat(chatDoc))
                    }

                    else if (event === "conversation") {
                        dispatch(activeConversation(data))
                    }
                }
            }
            setIsStreaming(false)
        } catch (error) {
            console.log("Logging Error...", error);
        }
        finally {
            controllerRef.current = null
            setIsStreaming = false;
        }
    }

    const stopStreaming = () => {
        if (controllerRef.current) {
            controllerRef.current.abort()
            controllerRef.current = null
            isStreaming(false)
        }
    }

    return { startStreaming, stopStreaming, isStreaming }

}