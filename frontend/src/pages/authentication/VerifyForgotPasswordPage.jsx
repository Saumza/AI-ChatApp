import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useNavigate, useParams } from 'react-router'
import { authService } from '@/services/authentication'
import { Spinner } from '../../components/ui/spinner'
import { Badge } from '@/components/ui/badge'

function VerifyForgotPasswordPage() {

    const { verificationToken } = useParams()
    const navigate = useNavigate()
    const { isError, isSuccess, error } = useQuery({
        queryKey: ["verify_email", verificationToken],
        queryFn: () => authService.verificationPasswordToken(verificationToken)
    })

    useEffect(() => {
        if (isSuccess) {
            navigate(`/passwordChange/${verificationToken}`)  // Navigation is Left
        }

    }, [isSuccess])

    if (isError) {
        return (
            <div className='w-full min-h-screen bg-black text-white font-giest p-4'>
                {error?.message}
            </div>
        )
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center gap-4 [--radius:1.2rem] font-giest">
            <Badge variant='outline' className="text-[1rem] px-4 py-2 h-fit rounded-lg flex items-center gap-2">
                <Spinner data-icon="inline-start" className="size-6" />
                Processing
            </Badge>
        </div >
    )
}

export default VerifyForgotPasswordPage