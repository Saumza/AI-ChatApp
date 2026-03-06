import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'

function AuthLogin({ children, authentication = true }) {
    const [loader, setLoader] = useState(true)
    const userStatus = useSelector((state) => state.auth.userStatus)
    const navigate = useNavigate()

    // the below scenario is only for when user is not loggedIn
    useEffect(() => {
        if (authentication && !userStatus) {
            navigate("/home")
        }

        if (!authentication && userStatus) {
            navigate("/chat")
        }
        setLoader(false)
    }, [authentication, userStatus])



    return (
        loader ?
            <div className="w-screen h-screen flex items-center justify-center gap-4 [--radius:1.2rem] font-giest">
                < Badge variant='outline' className="text-[1rem] px-4 py-2 h-fit rounded-lg flex items-center gap-2" >
                    <Spinner data-icon="inline-start" className="size-6" />
                    checking Status
                </Badge >
            </div >
            :
            <>
                {children}
            </>

    )
}

export default AuthLogin