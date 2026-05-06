import React, { useEffect, useRef, useState } from 'react'
import { SidebarInset, SidebarProvider } from './ui/sidebar.jsx'
import { ScrollArea } from './ui/scroll-area.jsx'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { conversation } from '@/services/conversation'
import { ChatInput } from './ChatInput'
import { useChatStream } from '@/hooks/useChatStream'
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { useForm } from 'react-hook-form'
import { ButtonDefault } from './Button'
import { addChat, setAllChats, } from '@/stores/slices/chatSlice'
import { nanoid } from '@reduxjs/toolkit'



function SidePage() {

  const messages = useSelector((state) => state.chat.chats)
  const conversationId = useSelector((state) => state.conversation.activeConversationId)
  const [chats, setChats] = useState([])
  const bottomRef = useRef(null)
  const { startStreaming, stopStreaming, isStreaming } = useChatStream()
  const dispatch = useDispatch()

  const [input, setInput] = useState("")
  const { register, resetField, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      model: "gemini-2.5-flash-lite"
    }
  })

  useEffect(() => {
    conversation.getChats(conversationId).then((chat) => {
      if (chat) {
        dispatch(setAllChats(chat.data.data))
      }
    }).catch((error) => {
      console.log(error);
    })

    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversationId])

  console.log(messages);

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
    console.log(data);

    resetField("content")

    dispatch(addChat({
      _id: nanoid(),
      conversationId,
      content: data.content,
      role: "user"
    }))
    await startStreaming({ ...data, conversationId })
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-4 py-8 space-y-10">
          {messages.map((chat) => (
            <div
              key={chat._id}
              className={`flex w-full ${chat.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`w-full ${chat.role === "user"
                  ? "max-w-[80%] rounded-2xl px-4 py-2 bg-muted text-foreground ml-auto"
                  : "max-w-full bg-transparent border-none" // Assistant: No border/background
                  }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // 1. Fixing the Code Blocks
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return inline ? (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      ) : (
                        <div className="my-4 rounded-lg overflow-hidden border border-border">
                          {/* Optional: Add a simple header here for the language */}
                          <div className="bg-zinc-800 text-zinc-400 text-xs px-4 py-1.5 font-mono">
                            {match ? match[1] : 'code'}
                          </div>
                          <pre className="bg-zinc-950 p-4 overflow-x-auto">
                            <code className="text-zinc-50 text-sm font-mono leading-relaxed">
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    // 2. Making links blue and hoverable
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-6 mb-4 tracking-tight">
                        {children}
                      </h1>
                    ),

                    // h2: Slightly smaller, often used for sections
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold mt-5 mb-3  pb-1 font-giest">
                        {children}
                      </h2>
                    ),

                    // h3: For sub-sections
                    h3: ({ children }) => (
                      <h3 className="text-xl font-medium mt-4 mb-2 ">
                        {children}
                      </h3>
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-blue-500 hover:underline cursor-pointer transition-colors font-giest"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                    // 3. Ensuring paragraphs in assistant messages have proper spacing
                    p: ({ children }) => <p className="mb-4 last:mb-0 leading-7 font-giest">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2 font-giest">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2 font-giest">{children}</ol>,
                  }}
                >
                  {chat.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className='mt-2'>
        <div className="w-full max-w-3xl mx-auto px-4 pb-8">
          {/* Container with relative positioning to host the button inside */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="relative flex items-center group">
              <textarea
                {...rest}
                ref={(e) => {
                  registerRef(e);
                  textareaRef.current = e;
                }}
                rows={1}
                placeholder="Ask anything"
                className="w-full min-h-12 max-h-50 pl-4 pr-40 py-4 rounded-full border-zinc-800 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 transition-all resize-none overflow-y-auto custom-scrollbar focus:outline-none outline-1 font-giest"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">

                {!isStreaming && (
                  <Select {...register("model", { required: true })}>
                    <SelectTrigger className="h-9 w-28 rounded-full border-gray-200 bg-gray-100 text-gray-700 text-xs focus:ring-0 focus:ring-offset-0 hover:bg-gray-200 transition-colors font-giest">
                      <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-700 shadow-xl font-giest">
                      <SelectItem value="gemini-2.5-flash-lite" className="focus:bg-gray-100">gemini-2.5-flash-lite</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <ButtonDefault
                  type={isStreaming ? "button" : "submit"}
                  onClick={isStreaming ? () => { stopStreaming() } : undefined}
                  disabled={!isStreaming && content.trim().length === 0}
                  children={isStreaming ? <Square className="h-4 w-4 fill-current" /> : <Send className="h-4 w-4" />}
                  className="h-10 w-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-md transition-transform active:scale-95"
                />
              </div>
            </div>
          </form>
          <p className="text-[11px] text-center mt-3 text-zinc-500">
            AI may produce inaccurate information about people, places, or facts.
          </p>
        </div>
      </div >
    </div >

  )
}

export default SidePage