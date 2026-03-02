import React, { useState } from 'react'
import { ButtonDefault } from './Button'
import { InputField } from './Input'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { authService } from '@/services/authentication'
import { login } from '@/stores/slices/authSlice'
import { Field, FieldLabel, FieldContent, FieldError } from './ui/field'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Link, useNavigate } from 'react-router'
import { Spinner } from './ui/spinner'

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const forgotPasswordHandler = useMutation({
        mutationFn: async (data) => {
            try {
                return await authService.resetPassword({ ...data });
            } catch (err) {
                throw err;
            }
        },
        onSuccess: (response) => {
            dispatch(login(response.data)),
                navigate("/")  // NAVIGATION IS LEFT
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const submitHandler = async (data) => {
        forgotPasswordHandler.mutate(data)
    }

    if (forgotPasswordHandler.isError) {
        return (
            <div className='w-full min-h-screen bg-black text-white font-giest p-4'>
                {error}
            </div>
        );
    }
    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 bg-background bg-cover overflow-hidden" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/cf/78/fe/cf78fe788b403ff3d41784153b10d20d.jpg')" }}>
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
                <div className="absolute top-1/3 left-1/2 w-125 h-125 -translate-x-1/2 bg-primary/20 rounded-full blur-[180px] opacity-40" />
            </div>
            <Card className="w-full max-w-md backdrop-blur-xl bg-background/50 border-border/40 shadow-xl animate-fadeIn p-5 gap-1">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-[1.8rem] font-giest">
                        Forgot Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submitHandler)} className="my-7">
                        <Field data-invalid={!!errors.email} className="mb-5">
                            <FieldContent>
                                <InputField
                                    placeholder="Email Address"
                                    type="text"
                                    {...register("email", { required: "Email is Required", validate: (value) => value.includes("@") || "Enter a valid email" })}
                                    classname="h-10 font-giest text-sm"
                                />
                            </FieldContent>
                            <FieldError className="ml-1 font-giest">{errors.email?.message}</FieldError>
                        </Field>
                        <CardFooter className="flex flex-col justify-center p-0 mt-8">
                            <ButtonDefault type='submit' disabled={forgotPasswordHandler.isPending} children={forgotPasswordHandler.isPending ? <Spinner data-icon="inline-start" className="size-6" /> : "Change Password"} className="w-full h-12 rounded-xl font-giest text-[1rem] mb-3.5">
                            </ButtonDefault>
                            {/* <div className="flex items-center w-full text-sm justify-center my-3">
                                    <span className=" font-giest">or sign up with</span>
                                </div>
                                <ButtonDefault children="Sign in with Google" className="w-full h-12 rounded-xl font-giest text-[.9rem]" >
                                </ButtonDefault> */}
                            <CardTitle className="text-[0.9rem] font-giest font-medium">
                                <Link
                                    to="/login"
                                    className='ml-1 hover:underline underline-offset-2'
                                >
                                    <span className='font-bold'>
                                        Log in Here!
                                    </span>
                                </Link>
                            </CardTitle>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword