import NewChat from '@/components/NewChat'
import SidebarComponent from '@/components/sidebar/SidebarComponent'
import SidePage from '@/components/SideChat'
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function HomePage() {
    const navigate = useNavigate()
    return (
        <div>HomePage</div>
    )
}

export default HomePage