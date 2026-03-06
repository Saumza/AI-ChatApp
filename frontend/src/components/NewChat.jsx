import { useChatStream } from '@/hooks/useChatStream'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addChat } from '@/stores/slices/chatSlice'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonDefault } from './Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { Send, Square } from "lucide-react";
import { InputField } from './Input'

function NewChat() {
    const { startStreaming, stopStreaming, isStreaming } = useChatStream()
    const dispatch = useDispatch()

    const [input, setInput] = useState("")
    const { register, resetField, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            model: "gemma-3-27b-it"
        }
    })

    const content = watch("content") || "";

    const textareaRef = useRef(null);
    const { ref: registerRef, ...rest } = register("content", { required: true });

    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to calculate correctly
            textareaRef.current.style.height = "56px";
            // Set to scrollHeight
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
        }
    }, [content]);

    const submitHandler = async (data) => {
        dispatch(addChat({
            _id: nanoid(),
            conversationId,
            content: data.content,
            role: "user"
        }))
        await startStreaming({ ...data, conversationId })

        reset({ content: "", model: data.model });
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="relative flex items-end rounded-[28px] border border-zinc-800 focus-within:border-zinc-700 transition-all p-2">

                        {/* THE AUTO-EXPANDING TEXTAREA */}
                        <textarea
                            {...rest}
                            ref={(e) => {
                                registerRef(e);
                                textareaRef.current = e;
                            }}
                            rows={1}
                            placeholder="Ask anything"
                            className="w-full min-h-12 max-h-50 pl-4 pr-40 p-4 bg-transparent placeholder:text-zinc-500 resize-none focus:outline-none overflow-y-auto custom-scrollbar font-giest"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    e.currentTarget.form?.requestSubmit();
                                }
                            }}
                        />

                        {/* BUTTON CONTAINER - ABSOLUTE RIGHT */}
                        <div className="absolute right-3 bottom-3 flex items-center gap-2">
                            {!isStreaming && (
                                <Select onValueChange={(val) => setValue("model", val)} defaultValue="gemma-3-27b-it">
                                    <SelectTrigger className="h-8 w-28 rounded-full border-zinc-700  text-[11px] focus:ring-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className=" border-zinc-700 ">
                                        <SelectItem value="gemma-3-27b-it">gemma-3-27b-it</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}

                            <ButtonDefault
                                type={isStreaming ? "button" : "submit"}
                                onClick={isStreaming ? () => { stopStreaming() } : undefined}
                                disabled={!isStreaming && content.trim().length === 0}
                                className="h-10 w-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-md transition-transform active:scale-95"
                            >
                                {isStreaming ? <Square className="h-4 w-4 fill-current" /> : <Send className="h-4 w-4" />}
                            </ButtonDefault>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewChat