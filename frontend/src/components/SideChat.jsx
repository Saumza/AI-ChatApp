import React, { useEffect, useRef, useState } from 'react'
import { SidebarInset, SidebarProvider } from './ui/Sidebar'
import { ScrollArea } from './ui/scroll-area'
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
import { addChat } from '@/stores/slices/chatSlice'
import { nanoid } from '@reduxjs/toolkit'



function SidePage() {

  const messages = useSelector((state) => state.chat.chats)
  const conversationId = useSelector((state) => state.conversation.activeConversationId)
  const [chats, setChats] = useState([])
  const bottomRef = useRef(null)
  const { startStreaming, stopStreaming, isStreaming } = useChatStream()
  const dispatch = useDispatch()

  const [input, setInput] = useState("")
  const { register, resetField, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      model: "gemma-3-27b-it"
    }
  })

  useEffect(() => {
    // if (messages) {
    //   setChats(messages)
    // }
    // conversation.getChats(conversationId).then((chat) => {
    //   if (chat) {
    //     setChats(chat.data)
    //   }
    // }).catch((error) => {
    //   console.log(error);
    // })
    setChats([
      {
        _id: "6999f67eee6c68b8f614e4cd",
        conversationId: "6999f67eee6c68b8f614e4cc",
        content: "How big is the brahmaputra river and is there any significance of the river in india",
        role: "user",
      },
      {
        _id: "6999f69fee6c68b8f614e4d0",
        conversationId: "6999f67eee6c68b8f614e4cc",
        content: "## The Brahmaputra River: Size and Significance in India\n\nThe Brahmaputra River is a colossal waterway, and its size is truly impressive. Here's a breakdown, followed by its significance in India:\n\n**Size & Key Stats:**\n\n* **Length:** Approximately 3,848 km (2,391 miles). This makes it one of the longest rivers in the world.  It's often considered to be around the same length as the Yangtze River, though precise measurements vary.\n* **Origin:** Originates in the Chemayungdung Glacier, near Mount Kailash in the Tibetan Himalayas.  Here it's known as the Yarlung Tsangpo.\n* **Drainage Basin:**  A massive 1,980,000 sq km (765,000 sq miles). This is larger than France!\n* **Average Discharge:**  Around 19,800 cubic meters per second (700,000 cu ft/s). This is *huge* – one of the highest in the world.  During the monsoon season, discharge can increase dramatically, making it one of the most voluminous rivers.\n* **Width:** Varies greatly. In some places, it's only 8-10 km wide, but during the monsoon, it can swell to 30 km (19 miles) or more.  Majuli Island, the world's largest river island, is formed *within* the Brahmaputra.\n* **Depth:**  Average depth is around 30 meters (98 feet), but can reach over 100 meters (328 feet) in certain areas.\n* **Course:** Flows through Tibet (China), India, and Bangladesh, where it joins the Ganges to form the world's largest delta.  In India, it flows through Arunachal Pradesh and Assam.\n\n\n\n**Significance of the Brahmaputra in India:**\n\nThe Brahmaputra is profoundly significant to India, impacting its geography, economy, culture, and even politics. Here's a detailed look:\n\n**1. Economic Importance:**\n\n* **Agriculture:** The river's fertile alluvial soil is crucial for agriculture in Assam and Arunachal Pradesh.  Rice cultivation is particularly prominent.  The annual floods, while destructive, also deposit fresh silt, replenishing the soil's fertility.\n* **Irrigation:**  The Brahmaputra provides water for irrigation, supporting agricultural production.  However, irrigation infrastructure is still developing.\n* **Hydroelectric Power:**  Several hydroelectric projects have been built or are planned on the Brahmaputra and its tributaries, aiming to generate clean energy.  (e.g., Ranganadi Hydro Electric Project).  This is a contentious issue due to environmental concerns.\n* **Transportation:** The river is a vital transportation route, especially in Assam, where roads are limited.  Ferries and small boats are used extensively for moving goods and people.  National Waterway 2 (NW-2) is a major initiative to improve navigability.\n* **Fisheries:** The river supports a rich fishery, providing a source of livelihood and food for many communities.\n* **Tourism:** River cruises and adventure tourism are growing in popularity, attracting visitors to experience the river's beauty and biodiversity.\n\n**2. Cultural & Religious Significance:**\n\n* **Lohit River & Mythology:** The Lohit River, a major tributary of the Brahmaputra, is considered sacred by many indigenous communities in Arunachal Pradesh.  It's linked to various myths and legends.\n* **Assamese Culture:** The Brahmaputra is deeply woven into the fabric of Assamese culture. It's often referred to as \"Luit\" (meaning 'the river that flows with a murmur') in Assamese poetry and folklore.  It features prominently in songs, stories, and festivals.\n* **Religious Rituals:**  The river is used for religious ceremonies and bathing rituals by many communities.\n* **Majuli Island:** Majuli, the largest river island in the world, is a hub of Neo-Vaishnavite culture, with numerous *satras* (monasteries) preserving ancient traditions.\n\n**3. Ecological Importance:**\n\n* **Biodiversity Hotspot:** The Brahmaputra basin is a biodiversity hotspot, home to a wide range of flora and fauna, including:\n    * **Ganges River Dolphin:**  Found in the river.\n    * **One-Horned Rhinoceros:**  Kaziranga National Park, a UNESCO World Heritage Site, is located on the banks of the Brahmaputra and is famous for its rhino population.\n    * **Elephants, Tigers, and numerous bird species.**\n    * **Unique wetland ecosystems.**\n* **Wetlands:** The Brahmaputra creates extensive wetlands, which are vital for supporting biodiversity and providing ecosystem services.  Deepor Beel is a Ramsar site (wetland of international importance) in Assam.\n\n**4. Challenges & Concerns:**\n\n* **Flooding:**  The Brahmaputra is notorious for its devastating floods, particularly during the monsoon season. These floods cause widespread damage to infrastructure, crops, and property, and displace millions of people.  Climate change is exacerbating the frequency and intensity of these floods.\n* **Erosion:**  Riverbank erosion is a major problem, particularly in Assam, leading to land loss and displacement of communities.\n* **Sedimentation:**  Excessive sedimentation reduces the river's carrying capacity and contributes to flooding.\n* **Dam Construction (Upstream):**  China's dam construction on the Yarlung Tsangpo (the Brahmaputra's Tibetan name) raises concerns about water flow and potential impacts on downstream areas in India and Bangladesh.  There are fears of water scarcity and increased flooding.\n* **Pollution:**  Industrial and agricultural runoff, as well as untreated sewage, contribute to water pollution.\n\n\n\n\nIn conclusion, the Brahmaputra is a river of immense scale and significance for India. It's a lifeline for millions, a source of cultural identity, and a vital part of the country's ecological heritage. However, it also presents significant challenges that require careful management and sustainable development strategies.  \n\n\n\nYou can find more information from these sources:\n\n* **National Geographic:** [https://education.nationalgeographic.org/resource/resource-library-brahmaputra-river/](https://education.nationalgeographic.org/resource/resource-library-brahmaputra-river/)\n* **India Today:** [https://www.indiatodayin.com/environment/story/brahmaputra-river-facts-history-importance-1964999-2023-06-05](https://www.indiatodayin.com/environment/story/brahmaputra-river-facts-history-importance-1964999-2023-06-05)\n* **Wikipedia:** [https://en.wikipedia.org/wiki/Brahmaputra_River](https://en.wikipedia.org/wiki/Brahmaputra_River)\n\n\n\n",
        role: "model",
      },

      {
        _id: "6999f67eee6c68b8f614e4cd",
        conversationId: "6999f67eee6c68b8f614e4cc",
        content: "How big is the brahmaputra river and is there any significance of the river in india",
        role: "user",
      },
      {
        _id: "6999f69fee6c68b8f614e4d0",
        conversationId: "6999f67eee6c68b8f614e4cc",
        content: "## The Brahmaputra River: Size and Significance in India\n\nThe Brahmaputra River is a colossal waterway, and its size is truly impressive. Here's a breakdown, followed by its significance in India:\n\n**Size & Key Stats:**\n\n* **Length:** Approximately 3,848 km (2,391 miles). This makes it one of the longest rivers in the world.  It's often considered to be around the same length as the Yangtze River, though precise measurements vary.\n* **Origin:** Originates in the Chemayungdung Glacier, near Mount Kailash in the Tibetan Himalayas.  Here it's known as the Yarlung Tsangpo.\n* **Drainage Basin:**  A massive 1,980,000 sq km (765,000 sq miles). This is larger than France!\n* **Average Discharge:**  Around 19,800 cubic meters per second (700,000 cu ft/s). This is *huge* – one of the highest in the world.  During the monsoon season, discharge can increase dramatically, making it one of the most voluminous rivers.\n* **Width:** Varies greatly. In some places, it's only 8-10 km wide, but during the monsoon, it can swell to 30 km (19 miles) or more.  Majuli Island, the world's largest river island, is formed *within* the Brahmaputra.\n* **Depth:**  Average depth is around 30 meters (98 feet), but can reach over 100 meters (328 feet) in certain areas.\n* **Course:** Flows through Tibet (China), India, and Bangladesh, where it joins the Ganges to form the world's largest delta.  In India, it flows through Arunachal Pradesh and Assam.\n\n\n\n**Significance of the Brahmaputra in India:**\n\nThe Brahmaputra is profoundly significant to India, impacting its geography, economy, culture, and even politics. Here's a detailed look:\n\n**1. Economic Importance:**\n\n* **Agriculture:** The river's fertile alluvial soil is crucial for agriculture in Assam and Arunachal Pradesh.  Rice cultivation is particularly prominent.  The annual floods, while destructive, also deposit fresh silt, replenishing the soil's fertility.\n* **Irrigation:**  The Brahmaputra provides water for irrigation, supporting agricultural production.  However, irrigation infrastructure is still developing.\n* **Hydroelectric Power:**  Several hydroelectric projects have been built or are planned on the Brahmaputra and its tributaries, aiming to generate clean energy.  (e.g., Ranganadi Hydro Electric Project).  This is a contentious issue due to environmental concerns.\n* **Transportation:** The river is a vital transportation route, especially in Assam, where roads are limited.  Ferries and small boats are used extensively for moving goods and people.  National Waterway 2 (NW-2) is a major initiative to improve navigability.\n* **Fisheries:** The river supports a rich fishery, providing a source of livelihood and food for many communities.\n* **Tourism:** River cruises and adventure tourism are growing in popularity, attracting visitors to experience the river's beauty and biodiversity.\n\n**2. Cultural & Religious Significance:**\n\n* **Lohit River & Mythology:** The Lohit River, a major tributary of the Brahmaputra, is considered sacred by many indigenous communities in Arunachal Pradesh.  It's linked to various myths and legends.\n* **Assamese Culture:** The Brahmaputra is deeply woven into the fabric of Assamese culture. It's often referred to as \"Luit\" (meaning 'the river that flows with a murmur') in Assamese poetry and folklore.  It features prominently in songs, stories, and festivals.\n* **Religious Rituals:**  The river is used for religious ceremonies and bathing rituals by many communities.\n* **Majuli Island:** Majuli, the largest river island in the world, is a hub of Neo-Vaishnavite culture, with numerous *satras* (monasteries) preserving ancient traditions.\n\n**3. Ecological Importance:**\n\n* **Biodiversity Hotspot:** The Brahmaputra basin is a biodiversity hotspot, home to a wide range of flora and fauna, including:\n    * **Ganges River Dolphin:**  Found in the river.\n    * **One-Horned Rhinoceros:**  Kaziranga National Park, a UNESCO World Heritage Site, is located on the banks of the Brahmaputra and is famous for its rhino population.\n    * **Elephants, Tigers, and numerous bird species.**\n    * **Unique wetland ecosystems.**\n* **Wetlands:** The Brahmaputra creates extensive wetlands, which are vital for supporting biodiversity and providing ecosystem services.  Deepor Beel is a Ramsar site (wetland of international importance) in Assam.\n\n**4. Challenges & Concerns:**\n\n* **Flooding:**  The Brahmaputra is notorious for its devastating floods, particularly during the monsoon season. These floods cause widespread damage to infrastructure, crops, and property, and displace millions of people.  Climate change is exacerbating the frequency and intensity of these floods.\n* **Erosion:**  Riverbank erosion is a major problem, particularly in Assam, leading to land loss and displacement of communities.\n* **Sedimentation:**  Excessive sedimentation reduces the river's carrying capacity and contributes to flooding.\n* **Dam Construction (Upstream):**  China's dam construction on the Yarlung Tsangpo (the Brahmaputra's Tibetan name) raises concerns about water flow and potential impacts on downstream areas in India and Bangladesh.  There are fears of water scarcity and increased flooding.\n* **Pollution:**  Industrial and agricultural runoff, as well as untreated sewage, contribute to water pollution.\n\n\n\n\nIn conclusion, the Brahmaputra is a river of immense scale and significance for India. It's a lifeline for millions, a source of cultural identity, and a vital part of the country's ecological heritage. However, it also presents significant challenges that require careful management and sustainable development strategies.  \n\n\n\nYou can find more information from these sources:\n\n* **National Geographic:** [https://education.nationalgeographic.org/resource/resource-library-brahmaputra-river/](https://education.nationalgeographic.org/resource/resource-library-brahmaputra-river/)\n* **India Today:** [https://www.indiatodayin.com/environment/story/brahmaputra-river-facts-history-importance-1964999-2023-06-05](https://www.indiatodayin.com/environment/story/brahmaputra-river-facts-history-importance-1964999-2023-06-05)\n* **Wikipedia:** [https://en.wikipedia.org/wiki/Brahmaputra_River](https://en.wikipedia.org/wiki/Brahmaputra_River)\n\n\n\n",
        role: "model",
      },


    ])
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-4 py-8 space-y-10">
          {chats.map((chat) => (
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
                className="w-full min-h-12 max-h-50 pl-4 pr-40 py-3 rounded-full border-zinc-800 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 transition-all resize-none overflow-y-auto custom-scrollbar focus:outline-none outline-1"
                {...register("content", { required: true })}
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
                    <SelectTrigger className="h-9 w-28 rounded-full border-gray-200 bg-gray-100 text-gray-700 text-xs focus:ring-0 focus:ring-offset-0 hover:bg-gray-200 transition-colors">
                      <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 text-gray-700 shadow-xl">
                      <SelectItem value="gemma-3-27b-it" className="focus:bg-gray-100">gemma-3-27b-it</SelectItem>
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