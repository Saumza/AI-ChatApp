import NewChat from '@/components/NewChat'
import SidebarComponent from '@/components/sidebar/SidebarComponent'
import SidePage from '@/components/SideChat'
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function ChatPage() {
    const conversationId = useSelector((state) => state.conversation.activeConversationId)
    const navigate = useNavigate()

    useEffect(() => {
        if (conversationId) {
            navigate(`/c/${conversationId}`)
        }
    }, [conversationId])

    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <SidebarComponent />
                <SidebarInset className="flex flex-col flex-1">
                    {conversationId
                        ? < SidePage />
                        : <NewChat />
                    }
                </SidebarInset>

            </div>
        </SidebarProvider>
    )
}

export default ChatPage