import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarInset, SidebarMenuAction, SidebarTrigger, SidebarHeader, SidebarFooter } from '../ui/Sidebar'
import { conversation } from '../../services/conversation'
import { activeConversation, sortedConversation } from '@/stores/slices/conversationSlice'
import NewChatDark from '../icon/NewChatDark'
import NewChatLight from '../icon/NewChatLight'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { ChevronsUpDown, Edit, Edit2Icon, LogOutIcon, MoreHorizontal, Pencil, Settings, Sparkles, Trash } from "lucide-react";
import { deleteConversation, addOrUpdateConversation } from '@/stores/slices/conversationSlice'
import { RenameModal } from '../RenameModal'
import { logout } from '@/stores/slices/authSlice'
import { authService } from '@/services/authentication'
import UpdateDetailsModal from '../UpdateDetailsModal'
import { useMutation } from '@tanstack/react-query'


function SidebarComponent() {

    const conversationData = useSelector((state) => state.conversation.conversations)
    const userData = useSelector((state) => state.auth.userData)
    const activeConversationId = useSelector((state) => state.conversation.activeConversationId)
    const [conversations, setConversations] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openRenameModal, setOpenRenameModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");


    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [detailsError, setDetailsError] = useState()

    useEffect(() => {
        // if (conversationData) {
        //     setConversations(conversationData)
        // }
        // conversation.list().then((conversation) => {
        //     if (conversation) {
        //         setConversations(conversation.data)
        //     }
        // }).catch(
        //     (error) => console.log(error)
        // )
        setConversations([{
            _id: "6999f67eee6c68b8f614e4cc",
            systemPrompt: "You are a helpful and knowledgeable AI assistant. Provide clear, accur…",
            title: "Brahmaputra size & significance."
        },
        {
            _id: "6999f67eee6c68b8f614e4cc",
            systemPrompt: "You are a helpful and knowledgeable AI assistant. Provide clear, accur…",
            title: "Brahmaputra size & significance."
        },
        {
            _id: "6999f67eee6c68b8f614e4cc",
            systemPrompt: "You are a helpful and knowledgeable AI assistant. Provide clear, accur…",
            title: "Brahmaputra size & significance."
        },
        {
            _id: "6999f67eee6c68b8f614e4cc",
            systemPrompt: "You are a helpful and knowledgeable AI assistant. Provide clear, accur…",
            title: "Brahmaputra size & significance."
        }])
    }, [])


    const deleteHandler = async (conversationId) => {
        try {
            const response = await conversation.delete(conversationId)
            console.log(response);
            if (response) {
                dispatch(deleteConversation(activeConversationId))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renameHandler = async (conversation) => {
        setOpenRenameModal(true)
        dispatch(activeConversation(conversation._id))
        setSelectedTitle(conversation.title)
    }


    const updateHandler = useMutation({
        mutationFn: (formdata) => {
            return authService.updateDetails(formdata)
        },
        onSuccess: (response) => {
            dispatch(login(response.data))
            onOpenChange(false)
        },
        onError: (error) => {
            setDetailsError(error.message)
        }
    })

    const updateSubmitHandler = async (data) => {

        const formdata = new FormData()

        formdata.append("name", data.name)
        formdata.append("usename", data.username)

        if (data.avatar) {
            formdata.append("avatar", data.avatar[0])
        }

        updateHandler.mutate(formdata)

    }


    const logoutHandler = async () => {
        try {
            const response = await authService.logout()
            if (response.data) {
                dispatch(logout())
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (updateHandler.isError) {
        return (
            <div className='w-full min-h-screen bg-black text-white font-giest p-4'>
                {detailsError}
            </div>
        );
    }

    return (
        <>

            <div className="md:hidden fixed top-3 left-3 z-50">
                <SidebarTrigger className="bg-background border shadow-sm hover:bg-accent" />
            </div>
            <Sidebar
                collapsible="icon"
                className="md:static md:block"
            >
                <SidebarHeader className="hidden md:flex items-end">
                    {/* DESKTOP COLLAPSE BUTTON */}
                    <SidebarTrigger className="hover:bg-accent transition-colors" />
                </SidebarHeader>

                <SidebarMenu className="p-3">
                    {/* NEW CHAT */}
                    <SidebarMenuItem key="/">
                        <SidebarMenuButton
                            asChild
                            className="w-full h-11 rounded-xl transition-all duration-200 hover:bg-accent/80 active:scale-95 group"
                        >
                            <Link to="/" className="flex items-center gap-3 px-3">
                                <div className="flex items-center justify-center transition-transform">
                                    <div className="block dark:hidden"><NewChatLight /></div>
                                    <div className="hidden dark:block"><NewChatDark /></div>
                                </div>
                                <span className="group-data-[collapsible=icon]:hidden font-giest font-semibold text-[0.95rem]">
                                    New Chat
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <div className="group-data-[collapsible=icon]:hidden my-2 px-3">
                        <p className="text-[.875rem] font-giest uppercase tracking-widest text-muted-foreground/60">Chats</p>
                    </div>


                    {/* CONVERSATIONS */}
                    {conversations.map((conversation) => (
                        <SidebarMenuItem key={conversation._id} className="relative">
                            <SidebarMenuButton asChild>
                                <Link
                                    to={`/c/${conversation._id}`}
                                    className="flex items-center gap-2"
                                    onClick={() => dispatch(activeConversation(conversation._id))}
                                >
                                    <span className="group-data-[collapsible=icon]:hidden font-giest font-medium text-[.9]">
                                        {conversation.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>

                            {/* DROPDOWN */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction
                                        showOnHover
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    side="right"
                                    className="w-48 rounded-md shadow-lg"
                                >
                                    <DropdownMenuItem onClick={() => deleteHandler(conversation._id)}>
                                        <Trash className="w-4 h-4 mr-2" />
                                        <span className='font-giest text-[.875rem]'>
                                            Delete
                                        </span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => renameHandler(conversation)}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        <span className='font-giest text-[.875rem]'>
                                            Rename
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                <RenameModal
                                    open={openRenameModal}
                                    onOpenChange={setOpenRenameModal}
                                    title={selectedTitle}
                                    conversationId={selectedId}
                                />
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarFooter className="mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className="flex items-center gap-3 p-2 cursor-pointer rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                <img src="https://i.pinimg.com/736x/9d/3a/61/9d3a61e9a5c55ea8d0ae413ce0986753.jpg" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                                    <span className="text-sm font-medium font-giest">saumyajeet</span>
                                    <span className="text-xs text-muted-foreground font-giest">
                                        s@gmail.com
                                    </span>
                                </div>
                                <ChevronsUpDown className="size-4 ml-auto group-data-[collapsible=icon]:hidden" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end"
                            side="right"
                            className="w-fit rounded-xl p-0 overflow-hidden">
                            <div className="flex items-center gap-3 p-3 border-b">
                                <img
                                    src="https://i.pinimg.com/736x/9d/3a/61/9d3a61e9a5c55ea8d0ae413ce0986753.jpg"
                                    className="w-10 h-10 rounded-full object-cover"
                                    alt="avatar"
                                />

                                <div>
                                    <p className="font-medium font-giest text-[0.9rem]">saumyajeet</p>
                                    <p className="text-xs font-giest text-muted-foreground">s@gmail.com</p>
                                </div>
                            </div>
                            <DropdownMenuItem className="px-4 py-2 gap-0" onClick={() => setOpenUpdateModal(true)}>
                                <Edit2Icon className="size-4 mr-3" />
                                <span className='text-sm font-giest'>
                                    Edit Profile
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-2 gap-0" onClick={() => logoutHandler()}>
                                <LogOutIcon className="size-4 mr-3" />
                                <span className='text-sm font-giest'>
                                    Log Out
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        <UpdateDetailsModal
                            open={openUpdateModal}
                            onOpenChange={setOpenUpdateModal}
                            updateSubmitHandler={updateSubmitHandler}
                            updateHandler={updateHandler}
                        />
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>
        </ >
    )
}

export default SidebarComponent