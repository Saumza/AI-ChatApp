import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonDefault } from './Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InputField } from './Input'
import { useForm } from 'react-hook-form'
import { authService } from '@/services/authentication'
import { login } from '@/stores/slices/authSlice'
import { Field, FieldLabel, FieldContent, FieldError } from './ui/field'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Link, useNavigate } from 'react-router'
import { Spinner } from './ui/spinner'


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const loginMutation = useMutation({
        mutationFn: (data) => authService.login(data),
        onSuccess: (response) => {
            dispatch(login(response.data.data)),
                navigate("/chat")  // NAVIGATION IS LEFT
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const submitHandler = async (data) => {
        loginMutation.mutate(data)
    }

    if (loginMutation.isError) {
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
            <Card className="w-full max-w-md backdrop-blur-xl bg-background/50 border-border/40 shadow-xl animate-fadeIn p-5">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-[1.7rem] font-giest">
                        Yooo, welcome back!!!
                    </CardTitle>
                    <CardTitle className="text-[0.9rem] font-giest font-medium">
                        First Time Here?
                        <Link
                            to="/SignUp"
                            className='ml-1 hover:underline underline-offset-2'
                        >
                            <span className='font-bold'>
                                SignUp for free!
                            </span>
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submitHandler)} className="my-7">
                        <Field data-invalid={!!errors.email} className="mb-5">
                            <FieldContent>
                                <InputField
                                    placeholder="Email"
                                    type="text"
                                    {...register("email", { required: "Email is Required", validate: (value) => value.includes("@") || "Enter a valid email" })}
                                    classname="h-10 font-giest text-sm"
                                />
                            </FieldContent>
                            <FieldError className="ml-1">{errors.email?.message}</FieldError>
                        </Field>
                        <Field data-invalid={!!errors.password} className="mb-4">
                            <FieldContent>
                                <InputField
                                    placeholder="Password"
                                    type="password"
                                    {...register("password", { required: "Password is Required" })}
                                    classname="h-10 font-giest text-sm"
                                />
                            </FieldContent>
                            <span className='flex '>
                                <FieldError className="ml-1">{errors.password?.message}</FieldError>
                                <Link
                                    to="/forgotPassword"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline font-giest">
                                    Forgot your password?
                                </Link>
                            </span>
                        </Field>
                        <CardFooter className="flex flex-col justify-center p-0">
                            <ButtonDefault
                                disabled={loginMutation.isPending}
                                type='submit'
                                children={loginMutation.isPending ? <Spinner data-icon="inline-start" className="size-6" /> : "Submit"}
                                className="w-full h-12 rounded-xl font-giest text-[1rem]">
                            </ButtonDefault>
                            {/* <div className="flex items-center w-full text-muted-foreground text-sm">
                                <span className="flex-1 border-t border-border"></span>
                                <span className="px-3">or</span>
                                <span className="flex-1 border-t border-border"></span>
                            </div>
                            <ButtonDefault children="Submit" className="w-full mb-5" onClick={GoogleLoginHandler}>
                            </ButtonDefault> */}
                        </CardFooter>
                    </form>
                </CardContent>

            </Card>
        </div >
    )
}

export default Login